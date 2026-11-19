import { randomUUID } from 'node:crypto';
import { AIMessage } from 'langchain';
import prisma from '@/lib/prisma';
import type { OpenAIChatModelId } from '@langchain/openai';
import { pricingPerMillion } from './pricingPerMillion';

export const AI_MODEL: OpenAIChatModelId = 'gpt-5.4-mini';

export function createAIRequestId() {
  return randomUUID();
}

export async function logAIUsage({
  userId,
  requestId,
  operation,
  response,
  status,
}: {
  userId: string;
  requestId: string;
  operation: string;
  response?: unknown;
  status: 'success' | 'error';
}) {
  const usageMetadata = response instanceof AIMessage ? response.usage_metadata : undefined;
  const inputTokens =
    typeof usageMetadata?.input_tokens === 'number' ? usageMetadata.input_tokens : 0;
  const outputTokens =
    typeof usageMetadata?.output_tokens === 'number' ? usageMetadata.output_tokens : 0;
  const pricing = pricingPerMillion[AI_MODEL];
  const inputCost = pricing ? (inputTokens * pricing.input) / 1_000_000 : 0;
  const outputCost = pricing ? (outputTokens * pricing.output) / 1_000_000 : 0;

  try {
    await prisma.aIUsageLog.create({
      data: {
        userId,
        requestId,
        operation,
        model: AI_MODEL,
        inputTokens,
        outputTokens,
        totalTokens:
          typeof usageMetadata?.total_tokens === 'number'
            ? usageMetadata.total_tokens
            : inputTokens + outputTokens,
        inputCost,
        outputCost,
        totalCost: inputCost + outputCost,
        status,
      },
    });
  } catch {
    // Usage logging must not change the result of a successful analysis.
  }
}
