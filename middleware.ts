import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from './lib/session';

// Routes that don't require authentication
const publicRoutes = ['/login'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Allow public routes
  if (publicRoutes.includes(path)) {
    return NextResponse.next();
  }

  // Get session
  const response = NextResponse.next();
  const session = await getIronSession<SessionData>(request, response, sessionOptions);

  // If not logged in, redirect to login
  if (!session.isLoggedIn) {
    const url = new URL('/login', request.url);
    return NextResponse.redirect(url);
  }

  // Role-based access
  if (path.startsWith('/admin')) {
    if (session.role !== 'admin') {
      // Admin route but user is not admin → redirect to home
      const url = new URL('/', request.url);
      return NextResponse.redirect(url);
    }
  }

  // For home page, both roles are allowed – proceed
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};
