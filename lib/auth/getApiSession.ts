import { NextResponse } from 'next/server';
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

export async function rejectCrossOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return null;

  const requestOrigin = new URL(request.url).origin;
  if (origin === requestOrigin) return null;

  return NextResponse.json({ error: 'Cross-origin requests are not allowed.' }, { status: 403 });
}

export async function readJsonBody(
  request: Request,
  maxBytes: number
): Promise<{ data: unknown; error?: never } | { error: NextResponse; data?: never }> {
  const contentLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(contentLength) && contentLength > maxBytes) {
    return { error: NextResponse.json({ error: 'Request body is too large.' }, { status: 413 }) };
  }

  const body = await request.text();
  if (new TextEncoder().encode(body).byteLength > maxBytes) {
    return { error: NextResponse.json({ error: 'Request body is too large.' }, { status: 413 }) };
  }

  try {
    return { data: JSON.parse(body) as unknown };
  } catch {
    return {
      error: NextResponse.json({ error: 'The request body must be valid JSON.' }, { status: 400 }),
    };
  }
}
