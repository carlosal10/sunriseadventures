import { NextResponse } from 'next/server';

function getExpectedPassword() {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  if (process.env.NODE_ENV !== 'production') return 'sunrise-admin';
  return null;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: 'Invalid sign-in request.' }, { status: 400 });
  }

  const configuredUsername = process.env.ADMIN_USERNAME?.trim();
  const username = String(body.username ?? '').trim();
  const password = String(body.password ?? '');
  const expectedPassword = getExpectedPassword();

  if (!expectedPassword) {
    return NextResponse.json(
      { message: 'ADMIN_PASSWORD is not configured for this deployment.' },
      { status: 500 }
    );
  }

  if (configuredUsername && username !== configuredUsername) {
    return NextResponse.json({ message: 'Invalid admin credentials.' }, { status: 401 });
  }

  if (password !== expectedPassword) {
    return NextResponse.json({ message: 'Invalid admin credentials.' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set('isAdmin', '1', {
    httpOnly: true,
    maxAge: 60 * 60 * 8,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  return response;
}
