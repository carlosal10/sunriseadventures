import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Only protect /admin paths
  if (url.pathname.startsWith('/admin')) {
    // TEMP: simple check; replace with real auth
    const hasAdminCookie = req.cookies.get('isAdmin')?.value === '1';
    if (!hasAdminCookie) {
      url.pathname = '/auth/signin'; // or a generic access denied page
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
