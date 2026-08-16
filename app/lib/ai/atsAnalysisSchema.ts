import z from 'zod';

export const atsAnalysisSchema = z.object({
  matchedSkills: z.array(z.string()),
  missingSkills: z.array(z.string()),

  experienceMatch: z.object({
    score: z.number(),
    explanation: z.string(),
  }),

  educationMatch: z.object({
    score: z.number(),
    explanation: z.string(),
  }),

  keywords: z.object({
    matched: z.array(z.string()),
    missing: z.array(z.string()),
  }),

  strengths: z.array(z.string()),

  weaknesses: z.array(z.string()),

  recommendations: z.array(
    z.object({
      priority: z.enum(["high", "medium", "low"]),
      title: z.string(),
      description: z.string(),
    })
  ),
});