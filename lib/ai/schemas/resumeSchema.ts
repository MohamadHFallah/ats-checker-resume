import z from 'zod';

const optionalText = z.string().max(3_000);
const shortText = z.string().max(500);

export const ResumeSchema = z
  .object({
    name: z.string().max(300).describe('name of user'),
    phone: z.string().max(100).nullable().describe('phone of user'),
    summery: optionalText.nullable().describe('summery or about of user'),
    skills: z.array(shortText).max(100).describe('give list of user skills'),
    projects: z.array(optionalText).max(100).describe('list of sample projects as url'),

    experience: z
      .array(
        z
          .object({
            company: z.string().max(300),
            position: z.string().max(300),
            startDate: z.string().nullable(),
            endDate: z.string().nullable(),
            description: optionalText,
            technologies: z.array(shortText).max(100),
          })
          .strict()
      )
      .max(100),

    education: z
      .array(
        z
          .object({
            institution: z.string().max(300),
            degree: z.string().max(300).nullable(),
            field: z.string().max(300).nullable(),
            startDate: z.string().nullable(),
            endDate: z.string().nullable(),
          })
          .strict()
      )
      .max(100),
  })
  .strict();
