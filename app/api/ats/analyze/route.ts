import { ChatOpenAI } from '@langchain/openai';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { ResumeSchema } from '@/lib/ai/schemas/resumeSchema';
import { ResumeAnalysisSchema } from '@/lib/ai/schemas/resumeAnalysisSchema';
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
  resumeContentSchema,
} from '@/lib/ai/input-security';
import {
  JOB_COMPARISON_INSTRUCTIONS,
  RESUME_EXTRACTION_INSTRUCTIONS,
  RESUME_REVIEW_INSTRUCTIONS,
  untrustedDocument,
} from '@/lib/ai/prompts';

const inputSchema = z
  .object({
    content: resumeContentSchema,
    jobDescription: jobDescriptionSchema.optional(),
  })
  .strict();

const model = new ChatOpenAI({ model: AI_MODEL, timeout: 45_000 });

export async function POST(request: Request) {
  const originError = await rejectCrossOrigin(request);
  if (originError) return originError;

  const session = await requireApiAuth();
  if (!session) {
    return NextResponse.json(
      { error: 'Sign in to save and analyze your resume.' },
      { status: 401 }
    );
  }

  let input: z.infer<typeof inputSchema>;
  const body = await readJsonBody(request, 45_000);
  if (body.error) return body.error;

  try {
    input = inputSchema.parse(body.data);
  } catch (error) {
    const message =
      error instanceof z.ZodError
        ? (error.issues[0]?.message ?? 'Check the resume text and try again.')
        : 'Check the submitted resume text and try again.';
    return NextResponse.json({ error: message }, { status: 400 });
  }

  input.content = normalizeUntrustedText(input.content);
  if (input.jobDescription) input.jobDescription = normalizeUntrustedText(input.jobDescription);
  const suspiciousInput =
    containsSuspiciousInstructions(input.content) ||
    (input.jobDescription ? containsSuspiciousInstructions(input.jobDescription) : false);

  const requestId = createAIRequestId();
  const callbacks = createLangfuseCallbacks(requestId);
  const creditsUsed =
    calculateCredits('RESUME_ANALYSIS', AI_MODEL) +
    (input.jobDescription ? calculateCredits('JOB_MATCHING', AI_MODEL) : 0);
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

  const usage = [];
  let requestSucceeded = false;
  try {
    const resumeResponse = await model
      .withStructuredOutput(ResumeSchema, {
        includeRaw: true,
      })
      .invoke(
        [
          ['system', RESUME_EXTRACTION_INSTRUCTIONS],
          ['human', untrustedDocument('resume_text', input.content)],
        ],
        { callbacks }
      );
    usage.push({ operation: 'resume_extraction', response: resumeResponse.raw });
    const resumeResult = resumeResponse.parsed;
    if (!resumeResult) throw new Error('Resume extraction returned no structured output.');

    const analysisResponse = await model
      .withStructuredOutput(ResumeAnalysisSchema, { includeRaw: true })
      .invoke(
        [
          ['system', RESUME_REVIEW_INSTRUCTIONS],
          ['human', untrustedDocument('resume_text', input.content)],
        ],
        { callbacks }
      );
    usage.push({ operation: 'resume_review', response: analysisResponse.raw });

    const analyserResult = analysisResponse.parsed;

    if (!analyserResult) {
      throw new Error('Resume review returned no structured output.');
    }

    let jobDescResult = null;
    if (input.jobDescription) {
      const comparisonResponse = await model
        .withStructuredOutput(atsAnalysisSchema, { includeRaw: true })
        .invoke(
          [
            ['system', JOB_COMPARISON_INSTRUCTIONS],
            [
              'human',
              `${untrustedDocument('resume_text', input.content)}\n${untrustedDocument('job_description', input.jobDescription)}`,
            ],
          ],
          { callbacks }
        );
      usage.push({ operation: 'resume_job_comparison', response: comparisonResponse.raw });
      jobDescResult = comparisonResponse.parsed;
      if (!jobDescResult) throw new Error('Job comparison returned no structured output.');
    }

    const analysis = { resumeResult, analyserResult, jobDescResult };
    void suspiciousInput;
    const savedResume = await prisma.resume.create({
      data: {
        title: resumeResult.name?.trim() || 'Untitled resume',
        content: input.content,
        analysis,
        userId: session.user.id,
      },
      select: { id: true, title: true, createdAt: true },
    });

    requestSucceeded = true;
    return NextResponse.json({ success: true, resumeId: savedResume.id, ...analysis });
  } catch {
    return NextResponse.json(
      { error: 'We couldn’t analyze your resume right now. Please try again.' },
      { status: 502 }
    );
  } finally {
    if (!requestSucceeded) await refundCredits(session.user.id, creditsUsed).catch(() => undefined);
    await Promise.all(
      usage.map((entry) =>
        logAIUsage({
          userId: session.user.id,
          requestId,
          ...entry,
          status: requestSucceeded ? 'success' : 'error',
          creditsUsed,
        })
      )
    );
  }
}
