import { CallbackHandler } from '@langfuse/langchain';

export function createLangfuseCallbacks(traceId: string) {
  if (!process.env.LANGFUSE_SECRET_KEY || !process.env.LANGFUSE_PUBLIC_KEY) return undefined;

  return [
    new CallbackHandler({
      sessionId: traceId,
      tags: [traceId],
    }),
  ];
}
