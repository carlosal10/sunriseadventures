import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/api/admin')) {
    const hasAdminCookie = req.cookies.get('isAdmin')?.value === '1';

    if (!hasAdminCookie) {
      if (url.pathname.startsWith('/api/admin')) {
        return NextResponse.json({ message: 'Admin sign-in required.' }, { status: 401 });
      }

      url.pathname = '/auth/signin';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
