import z from 'zod';

export const ResumeAnalysisSchema = z.object({
    overallScore: z.number().min(0).max(100),
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    atsIssues: z.array(
        z.object({
            issue: z.string(),
            severity: z.enum([
                "low",
                "medium",
                "high",
            ]),
            explanation: z.string(),
        })
    ),

    suggestions: z.array(
        z.object({
            title: z.string(),
            explanation: z.string(),
        })
    ),
})