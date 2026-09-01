import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import prisma from "./prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    // emailAndPassword: {
    //     enabled: true,
    // },
    logger: {
        level: "debug",
    },
    plugins: [nextCookies()],
    baseURL: process.env.BETTER_AUTH_URL ?? 'http://localhost:3000',
    secret: process.env.BETTER_AUTH_SECRET,
    advanced: {
        disableCSRFCheck: process.env.NODE_ENV === "development",
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            redirectURI: "http://localhost:3000/api/auth/callback/github",

        },
    },
})