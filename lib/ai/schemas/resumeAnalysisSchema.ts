import z from 'zod';

const detailText = z.string().trim().min(1).max(3_000);

export const ResumeAnalysisSchema = z
  .object({
    overallScore: z.number().finite().min(0).max(100),
    strengths: z.array(detailText).max(50),
    weaknesses: z.array(detailText).max(50),
    atsIssues: z
      .array(
        z
          .object({
            issue: z.string().trim().min(1).max(500),
            severity: z.enum(['low', 'medium', 'high']),
            explanation: detailText,
          })
          .strict()
      )
      .max(50),

    suggestions: z
      .array(
        z
          .object({
            title: z.string().trim().min(1).max(300),
            explanation: detailText,
          })
          .strict()
      )
      .max(50),
  })
  .strict();
