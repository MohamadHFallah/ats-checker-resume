# ATS Resume Checker

An AI-powered resume review and job-comparison app. Paste resume text to receive a structured review, save it to your account, then compare it with job descriptions. Results are estimates for guidance—not official ATS scores, screening predictions, or guarantees of passing an ATS.

## Features

- Extracts resume details and reviews structure, strengths, weaknesses, ATS-related issues, and suggested improvements.
- Compares a saved resume against a job description and presents matched skills, missing or unconfirmed requirements, keywords, and recommendations.
- Uses LangChain structured output with Zod schemas and stores resumes and comparisons for authenticated users.
- Includes a dashboard with saved resumes, comparison history, and light/dark theme selection.

## Requirements

- Node.js 20 or newer
- pnpm 11 (the package manager specified in `package.json`)
- PostgreSQL database
- GitHub OAuth app for sign-in
- OpenAI API key for analysis

## Local setup

1. Clone the repository and install dependencies:

   ```bash
   git clone <repository-url>
   cd at-checker
   pnpm install
   ```

2. Create a `.env` file in the project root:

   ```dotenv
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/at_checker?schema=public"
   OPENAI_API_KEY="your-openai-api-key"
   BETTER_AUTH_SECRET="replace-with-a-long-random-secret"
   BETTER_AUTH_URL="http://localhost:3000"
   GITHUB_CLIENT_ID="your-github-oauth-client-id"
   GITHUB_CLIENT_SECRET="your-github-oauth-client-secret"
   ```

   Generate a secret with `openssl rand -base64 32`. Keep `.env` private and never commit real credentials.

3. Create a GitHub OAuth app. Set its authorization callback URL to your app's Better Auth callback endpoint (use the same origin as `BETTER_AUTH_URL`):

   ```text
   http://localhost:3000/api/auth/callback/github
   ```

4. Make sure PostgreSQL is running and `DATABASE_URL` points to a database the app can access. The package's `postinstall` script runs `prisma db push` to synchronize the schema on dependency installation. If needed, synchronize it manually:

   ```bash
   pnpm exec prisma db push
   ```

5. Start the development server:

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Using the app

1. Sign in with GitHub.
2. Submit plain-text resume content. Resume input must contain at least 100 characters and can be up to 20,000 characters.
3. Optionally provide a job description during analysis (80–20,000 characters), or open a saved resume in the dashboard and compare it with a job description later.
4. Review the resume analysis and job comparison from the dashboard.

Only plain text is supported; PDF/DOCX upload and parsing are not currently included.

## Scripts

| Command                | Purpose                                    |
| ---------------------- | ------------------------------------------ |
| `pnpm dev`             | Start the Next.js development server       |
| `pnpm build`           | Build the production app                   |
| `pnpm start`           | Start the production server after building |
| `pnpm lint`            | Run ESLint                                 |
| `pnpm prisma:generate` | Run the configured Prisma generate command |
| `pnpm prisma:migrate`  | Run Prisma development migrations          |
| `pnpm prisma:prod`     | Apply Prisma migrations in production      |
| `pnpm prisma:studio`   | Open Prisma Studio                         |
| `pnpm prisma:format`   | Format the Prisma schema                   |

## Privacy and security notes

Resume and job-description text is sent to OpenAI for analysis and saved in the configured PostgreSQL database for signed-in users. Treat this information as sensitive. Use a trusted database, restrict access to API credentials, and review the AI provider's data handling terms before using real personal data.

This repository is an MVP, not a security certification. Before public deployment, configure production OAuth origins/secrets, add shared rate limiting and abuse monitoring at the hosting or gateway layer, and define retention/deletion controls. Do not log or share real resume text in issue reports.

## Tech stack

- Next.js App Router, React, and TypeScript
- Tailwind CSS and shadcn UI components
- Better Auth with GitHub OAuth
- Prisma ORM and PostgreSQL
- LangChain, OpenAI, and Zod structured schemas

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
