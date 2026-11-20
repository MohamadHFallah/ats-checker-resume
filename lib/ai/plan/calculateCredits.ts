import type { OpenAIChatModelId } from '@langchain/openai';

type OperationType = 'RESUME_ANALYSIS' | 'JOB_MATCHING' | 'RESUME_REWRITE';

const OPERATIONS: Record<OperationType, number> = {
  RESUME_ANALYSIS: 2,
  JOB_MATCHING: 1,
  RESUME_REWRITE: 2,
};

const MODEL_MULTIPLIERS: Record<NonNullable<OpenAIChatModelId>, number> = {
  'gpt-5.4-mini': 1,
  'gpt-5.4': 3,
  'gpt-6': 5,
};

export function calculateCredits(
  operation: keyof typeof OPERATIONS,
  model: keyof typeof MODEL_MULTIPLIERS
) {
  return OPERATIONS[operation] * MODEL_MULTIPLIERS[model];
}
