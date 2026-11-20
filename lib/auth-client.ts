import { createAuthClient } from 'better-auth/react'; // make sure to import from better-auth/react

export const authClient = createAuthClient({
  baseURL:process.env.BETTER_AUTH_URL,
  basePath: process.env.BETTER_AUTH_BASE_URL,  
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;
