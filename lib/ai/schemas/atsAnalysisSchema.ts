import z from 'zod';

const shortText = z.string().trim().min(1).max(500);
const detailText = z.string().trim().min(1).max(3_000);

export const atsAnalysisSchema = z
  .object({
    matchedSkills: z.array(shortText).max(100),
    missingSkills: z.array(shortText).max(100),

    experienceMatch: z
      .object({
        score: z.number().finite().min(0).max(10),
        explanation: detailText,
      })
      .strict(),

    educationMatch: z
      .object({
        score: z.number().finite().min(0).max(10),
        explanation: detailText,
      })
      .strict(),

    keywords: z
      .object({
        matched: z.array(shortText).max(100),
        missing: z.array(shortText).max(100),
      })
      .strict(),

    strengths: z.array(detailText).max(50),

    weaknesses: z.array(detailText).max(50),

    recommendations: z
      .array(
        z
          .object({
            priority: z.enum(['high', 'medium', 'low']),
            title: z.string(),
            description: detailText,
          })
          .strict()
      )
      .max(50),
  })
  .strict();

if (process.env.NODE_ENV === 'test') {
  const valid = {
    matchedSkills: [],
    missingSkills: [],
    experienceMatch: { score: 8, explanation: 'Relevant evidence.' },
    educationMatch: { score: 7, explanation: 'Education is stated.' },
    keywords: { matched: [], missing: [] },
    strengths: [],
    weaknesses: [],
    recommendations: [],
  };
  if (
    !atsAnalysisSchema.safeParse(valid).success ||
    atsAnalysisSchema.safeParse({ ...valid, extra: 'unexpected' }).success ||
    atsAnalysisSchema.safeParse({
      ...valid,
      experienceMatch: { ...valid.experienceMatch, score: 11 },
    }).success
  ) {
    throw new Error('ATS analysis schema self-check failed.');
  }
}
