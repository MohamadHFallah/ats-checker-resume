import { OpenAIChatModelId } from "@langchain/openai";

export const pricingPerMillion: Record<OpenAIChatModelId, { input: number; output: number }> = {
  // GPT-5.6 family
  'gpt-5.6-sol': { input: 4, output: 20 },
  'gpt-5.6-terra': { input: 2, output: 12 },
  'gpt-5.6-luna': { input: 0.2, output: 1.2 },

  // GPT-5.4 family
  'gpt-5.4': { input: 2.5, output: 15 },
  'gpt-5.4-mini': { input: 0.75, output: 4.5 },
  'gpt-5.4-nano': { input: 0.2, output: 1.25 },
  'gpt-5.4-mini-2026-03-17': { input: 0.75, output: 4.5 },
  'gpt-5.4-nano-2026-03-17': { input: 0.2, output: 1.25 },

  // GPT-5.3
  'gpt-5.3-chat-latest': { input: 1.75, output: 14 },

  // GPT-5.2 family
  'gpt-5.2': { input: 1.75, output: 14 },
  'gpt-5.2-2025-12-11': { input: 1.75, output: 14 },
  'gpt-5.2-chat-latest': { input: 1.75, output: 14 },
  'gpt-5.2-pro': { input: 21, output: 168 },
  'gpt-5.2-pro-2025-12-11': { input: 21, output: 168 },

  // GPT-5.1 family
  'gpt-5.1': { input: 1.25, output: 10 },
  'gpt-5.1-2025-11-13': { input: 1.25, output: 10 },
  'gpt-5.1-codex': { input: 1.25, output: 10 },
  'gpt-5.1-mini': { input: 0.25, output: 2 },
  'gpt-5.1-chat-latest': { input: 1.25, output: 10 },

  // GPT-5 family
  'gpt-5': { input: 1.25, output: 10 },
  'gpt-5-mini': { input: 0.25, output: 2 },
  'gpt-5-nano': { input: 0.05, output: 0.4 },
  'gpt-5-2025-08-07': { input: 1.25, output: 10 },
  'gpt-5-mini-2025-08-07': { input: 0.25, output: 2 },
  'gpt-5-nano-2025-08-07': { input: 0.05, output: 0.4 },
  'gpt-5-chat-latest': { input: 1.25, output: 10 },

  // GPT-4.1 family
  'gpt-4.1': { input: 2, output: 8 },
  'gpt-4.1-mini': { input: 0.4, output: 1.6 },
  'gpt-4.1-nano': { input: 0.1, output: 0.4 },
  'gpt-4.1-2025-04-14': { input: 2, output: 8 },
  'gpt-4.1-mini-2025-04-14': { input: 0.4, output: 1.6 },
  'gpt-4.1-nano-2025-04-14': { input: 0.1, output: 0.4 },

  // O-series
  'o4-mini': { input: 1.1, output: 4.4 },
  'o4-mini-2025-04-16': { input: 1.1, output: 4.4 },
  'o3': { input: 2, output: 8 },
  'o3-2025-04-16': { input: 2, output: 8 },
  'o3-mini': { input: 1.1, output: 4.4 },
  'o3-mini-2025-01-31': { input: 1.1, output: 4.4 },
  'o1': { input: 15, output: 60 },
  'o1-2024-12-17': { input: 15, output: 60 },
  'o1-preview': { input: 15, output: 60 },
  'o1-preview-2024-09-12': { input: 15, output: 60 },
  'o1-mini': { input: 1.1, output: 4.4 },
  'o1-mini-2024-09-12': { input: 1.1, output: 4.4 },

  // GPT-4o family
  'gpt-4o': { input: 2.5, output: 10 },
  'gpt-4o-2024-11-20': { input: 2.5, output: 10 },
  'gpt-4o-2024-08-06': { input: 2.5, output: 10 },
  'gpt-4o-2024-05-13': { input: 5, output: 15 },
  'gpt-4o-mini': { input: 0.15, output: 0.6 },
  'gpt-4o-mini-2024-07-18': { input: 0.15, output: 0.6 },
  'chatgpt-4o-latest': { input: 5, output: 15 },

  // GPT-4o Audio
  'gpt-4o-audio-preview': { input: 2.5, output: 10 },
  'gpt-4o-audio-preview-2024-10-01': { input: 2.5, output: 10 },
  'gpt-4o-audio-preview-2024-12-17': { input: 2.5, output: 10 },
  'gpt-4o-audio-preview-2025-06-03': { input: 2.5, output: 10 },
  'gpt-4o-mini-audio-preview': { input: 0.15, output: 0.6 },
  'gpt-4o-mini-audio-preview-2024-12-17': { input: 0.15, output: 0.6 },

  // GPT-4o Search
  'gpt-4o-search-preview': { input: 2.5, output: 10 },
  'gpt-4o-mini-search-preview': { input: 0.15, output: 0.6 },
  'gpt-4o-search-preview-2025-03-11': { input: 2.5, output: 10 },
  'gpt-4o-mini-search-preview-2025-03-11': { input: 0.15, output: 0.6 },

  // Codex
  'codex-mini-latest': { input: 1.5, output: 6 },

  // GPT-4 Turbo
  'gpt-4-turbo': { input: 10, output: 30 },
  'gpt-4-turbo-2024-04-09': { input: 10, output: 30 },
  'gpt-4-0125-preview': { input: 10, output: 30 },
  'gpt-4-turbo-preview': { input: 10, output: 30 },
  'gpt-4-1106-preview': { input: 10, output: 30 },
  'gpt-4-vision-preview': { input: 10, output: 30 },

  // GPT-4
  'gpt-4': { input: 30, output: 60 },
  'gpt-4-0314': { input: 30, output: 60 },
  'gpt-4-0613': { input: 30, output: 60 },
  'gpt-4-32k': { input: 60, output: 120 },
  'gpt-4-32k-0314': { input: 60, output: 120 },
  'gpt-4-32k-0613': { input: 60, output: 120 },

  // GPT-3.5 Turbo
  'gpt-3.5-turbo': { input: 0.5, output: 1.5 },
  'gpt-3.5-turbo-16k': { input: 3, output: 4 },
  'gpt-3.5-turbo-0301': { input: 1.5, output: 2 },
  'gpt-3.5-turbo-0613': { input: 1.5, output: 2 },
  'gpt-3.5-turbo-1106': { input: 1, output: 2 },
  'gpt-3.5-turbo-0125': { input: 0.5, output: 1.5 },
  'gpt-3.5-turbo-16k-0613': { input: 3, output: 4 },
};