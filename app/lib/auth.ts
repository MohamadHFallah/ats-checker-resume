import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    plugins: [nextCookies()],
    baseURL: process.env.BETTER_AUTH_URL ?? 'http://localhpst:3000',
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