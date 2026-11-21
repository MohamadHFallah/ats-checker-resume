# ATS Resume Checker

An AI-powered resume review and job-comparison app. Paste resume text to receive a structured review, save it to your account, then compare it with job descriptions. Results are estimates for guidance—not official ATS scores, screening predictions, or guarantees of passing an ATS.

## Features

- Extracts resume details and reviews structure, strengths, weaknesses, ATS-related issues, and suggested improvements.
- Compares a saved resume against a job description and presents matched skills, missing or unconfirmed requirements, keywords, and recommendations.
- Uses LangChain structured output with Zod schemas and stores resumes and comparisons for authenticated users.
- Supports optional Langfuse tracing for LangChain model calls.
- Includes a dashboard with saved resumes, comparison history, and light/dark theme selection.
- Tracks Free/Pro plans and deducts AI credits before analysis and comparison requests.

## Requirements

- Node.js 20 or newer
- pnpm 11 (the package manager specified in `package.json`)
- PostgreSQL database
- GitHub OAuth app for sign-in
- OpenAI API key for analysis
- Langfuse project keys for tracing (optional)

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
   # Optional: OpenAI-compatible endpoint, if not using the default OpenAI API
   # OPENAI_BASE_URL="https://your-provider.example/v1"
   BETTER_AUTH_SECRET="replace-with-a-long-random-secret"
   BETTER_AUTH_URL="http://localhost:3000"
   GITHUB_CLIENT_ID="your-github-oauth-client-id"
   GITHUB_CLIENT_SECRET="your-github-oauth-client-secret"
   # Optional: enable Langfuse tracing by setting both keys
   # LANGFUSE_PUBLIC_KEY="pk-lf-..."
   # LANGFUSE_SECRET_KEY="sk-lf-..."
   # LANGFUSE_BASE_URL="https://cloud.langfuse.com"
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

## Docker

Build and run the production image (pass the required environment variables through your deployment platform):

```bash
docker build -t at-checker .
docker run --rm -p 3000:3000 \
  -e DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/at_checker?schema=public" \
  -e OPENAI_API_KEY="your-openai-api-key" \
  -e BETTER_AUTH_SECRET="your-long-random-secret" \
  -e BETTER_AUTH_URL="http://localhost:3000" \
  -e GITHUB_CLIENT_ID="your-github-oauth-client-id" \
  -e GITHUB_CLIENT_SECRET="your-github-oauth-client-secret" \
  at-checker
```

The container serves the Next.js app on port 3000 and expects PostgreSQL to be available separately. Run database schema migrations or `prisma db push` as a separate deployment step; the container does not automatically change the database schema. Add the optional `OPENAI_BASE_URL` or Langfuse environment variables with `-e` when needed. For public deployment, set `BETTER_AUTH_URL` to the public HTTPS origin and register the matching GitHub callback URL.

## Using the app

1. Sign in with GitHub.
2. Submit plain-text resume content. Resume input must contain at least 100 characters and can be up to 20,000 characters.
3. Optionally provide a job description during analysis (80–20,000 characters), or open a saved resume in the dashboard and compare it with a job description later.
4. Review the resume analysis and job comparison from the dashboard.

Only plain text is supported; PDF/DOCX upload and parsing are not currently included.

New accounts receive 5 credits on the Free plan. Resume analysis costs 2 credits and a saved-resume job comparison costs 1 credit with the default model. Credits are reserved before an AI request and refunded if analysis fails. Credit costs are defined in `lib/ai/plan/calculateCredits.ts`. Plan upgrades and recurring credit resets are not yet implemented.

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

Resume and job-description text is sent to the configured OpenAI-compatible model provider for analysis and saved in the configured PostgreSQL database for signed-in users. When Langfuse is enabled, LangChain traces may also include model inputs and outputs; review your Langfuse project's data retention and access controls before processing real personal data. Treat this information as sensitive, use trusted providers and databases, and restrict access to API credentials.

This repository is an MVP, not a security certification. Before public deployment, configure production OAuth origins/secrets, add shared rate limiting and abuse monitoring at the hosting or gateway layer, and define retention/deletion controls. Do not log or share real resume text in issue reports.

## Tech stack

- Next.js App Router, React, and TypeScript
- Tailwind CSS and shadcn UI components
- Better Auth with GitHub OAuth
- Prisma ORM and PostgreSQL
- LangChain, OpenAI, and Zod structured schemas
- Optional Langfuse tracing for LangChain

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
