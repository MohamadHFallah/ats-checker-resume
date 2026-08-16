import z, { email } from 'zod'

export const ResumeSchema = z.object({
    name: z.string().describe("name of user"),
    phone: z.string().nullable().describe("phone of user"),
    summery: z.string().nullable().describe("summery or about of user"),
    skills: z.array(z.string()).describe("give list of user skills"),
    projects: z.array(z.string()).describe("list of sample projects as url"),

    experience: z.array(
        z.object({
            company: z.string(),
            position: z.string(),
            startDate: z.string().nullable(),
            endDate: z.string().nullable(),
            description: z.string(),
            technologies: z.array(z.string()),
        })
    ),

    education: z.array(
        z.object({
            institution: z.string(),
            degree: z.string().nullable(),
            field: z.string().nullable(),
            startDate: z.string().nullable(),
            endDate: z.string().nullable(),
        })
    ),
})