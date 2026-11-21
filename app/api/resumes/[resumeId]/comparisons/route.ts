import { ChatOpenAI } from '@langchain/openai';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { atsAnalysisSchema } from '@/lib/ai/schemas/atsAnalysisSchema';
import { AI_MODEL, createAIRequestId, logAIUsage } from '@/lib/ai/usage-log';
import { calculateCredits } from '@/lib/ai/plan/calculateCredits';
import { createLangfuseCallbacks } from '@/lib/ai/langfuse';
import {
  InsufficientCreditsError,
  reserveCredits,
  refundCredits,
} from '@/lib/ai/plan/reserveCredits';
import { readJsonBody, rejectCrossOrigin, requireApiAuth } from '@/lib/auth/getApiSession';
import {
  containsSuspiciousInstructions,
  jobDescriptionSchema,
  normalizeUntrustedText,
} from '@/lib/ai/input-security';
import { JOB_COMPARISON_INSTRUCTIONS, untrustedDocument } from '@/lib/ai/prompts';

const requestSchema = z
  .object({
    jobDescription: jobDescriptionSchema,
    title: z.string().trim().max(160).optional(),
  })
  .strict();

const model = new ChatOpenAI({ model: AI_MODEL, timeout: 45_000 });

type RouteContext = { params: Promise<{ resumeId: string }> };

export async function POST(request: Request, { params }: RouteContext) {
  const originError = await rejectCrossOrigin(request);
  if (originError) return originError;

  const session = await requireApiAuth();
  if (!session) {
    return NextResponse.json({ error: 'Sign in to compare a job description.' }, { status: 401 });
  }

  const { resumeId } = await params;
  let input: z.infer<typeof requestSchema>;
  const body = await readJsonBody(request, 25_000);
  if (body.error) return body.error;

  try {
    input = requestSchema.parse(body.data);
  } catch (error) {
    const message =
      error instanceof z.ZodError
        ? (error.issues[0]?.message ?? 'Check the job description and try again.')
        : 'Check the submitted job description and try again.';
    return NextResponse.json({ error: message }, { status: 400 });
  }

  input.jobDescription = normalizeUntrustedText(input.jobDescription);
  const suspiciousInput = containsSuspiciousInstructions(input.jobDescription);

  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId: session.user.id },
    select: { id: true, title: true, content: true },
  });
  if (!resume) {
    return NextResponse.json({ error: 'That saved resume could not be found.' }, { status: 404 });
  }

  const requestId = createAIRequestId();
  const callbacks = createLangfuseCallbacks(requestId);
  const creditsUsed = calculateCredits('JOB_MATCHING', AI_MODEL);
  try {
    await reserveCredits(session.user.id, creditsUsed);
  } catch (error) {
    if (error instanceof InsufficientCreditsError) {
      return NextResponse.json(
        { error: 'Insufficient credits. Please change your Plan' },
        { status: 403 }
      );
    }
    return NextResponse.json(
      { error: 'Unable to verify your credits. Please try again.' },
      { status: 500 }
    );
  }

  let usageResponse;
  let requestSucceeded = false;
  try {
    const response = await model
      .withStructuredOutput(atsAnalysisSchema, { includeRaw: true })
      .invoke(
        [
          ['system', JOB_COMPARISON_INSTRUCTIONS],
          [
            'human',
            `${untrustedDocument('resume_text', normalizeUntrustedText(resume.content))}\n${untrustedDocument('job_description', input.jobDescription)}`,
          ],
        ],
        { callbacks }
      );
    usageResponse = response.raw;
    const analysis = response.parsed;
    if (!analysis) throw new Error('Job comparison returned no structured output.');
    void suspiciousInput;

    const title =
      input.title ||
      input.jobDescription
        .split(/\r?\n/)
        .find((line) => line.trim())
        ?.trim()
        .slice(0, 160) ||
      'Job comparison';
    const comparison = await prisma.jobComparison.create({
      data: { title, description: input.jobDescription, analysis, resumeId: resume.id },
      select: { id: true, title: true, createdAt: true, analysis: true },
    });

    requestSucceeded = true;
    return NextResponse.json({ success: true, comparison });
  } catch {
    return NextResponse.json(
      { error: 'We couldn’t compare this job description right now. Please try again.' },
      { status: 502 }
    );
  } finally {
    if (!requestSucceeded) await refundCredits(session.user.id, creditsUsed).catch(() => undefined);
    await logAIUsage({
      userId: session.user.id,
      requestId,
      operation: 'saved_resume_job_comparison',
      response: usageResponse,
      status: requestSucceeded ? 'success' : 'error',
      creditsUsed,
    });
  }
}
