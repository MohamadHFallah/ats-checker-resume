import { headers } from 'next/headers';
import { auth } from '../auth';

export async function getApiSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireApiAuth() {
  const session = await getApiSession();

  if (!session) {
    return null;
  }

  return session;
}
