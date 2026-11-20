import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import prisma from './prisma';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { createAuthMiddleware } from 'better-auth/api';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  // emailAndPassword: {
  //     enabled: true,
  // },
  plugins: [nextCookies()],
  baseURL: process.env.BETTER_AUTH_URL,
  basePath: process.env.BETTER_AUTH_BASE_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path.startsWith('/sign-up') || ctx.path === '/callback/github') {
        const newSession = ctx.context.newSession;
        if (newSession) {
          await prisma.user.updateMany({
            where: { id: newSession.user.id },
            data: { plan: 'FREE', remainingCredits: 5 },
          });
        }
      }
    }),
  },
  advanced: {
    disableCSRFCheck: process.env.NODE_ENV === 'development',
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
      redirectURI: process.env.BETTER_AUTH_REDIRECT_URL_GITHUB
    },
  },
});
