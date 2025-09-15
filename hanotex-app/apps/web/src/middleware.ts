import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Admin routes protection
    if (pathname.startsWith('/admin')) {
      if (!token || !['ADMIN', 'SUPER_ADMIN'].includes(token.role as string)) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
      }
    }

    // Protected routes that require authentication
    if (pathname.startsWith('/profile') || pathname.startsWith('/technologies/register')) {
      if (!token) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
      }
    }

    // Allow all auth routes to pass through
    if (pathname.startsWith('/auth/') || pathname.startsWith('/api/auth/')) {
      return NextResponse.next();
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Allow access to public routes
        if (pathname === '/' || pathname.startsWith('/technologies') || pathname.startsWith('/auctions')) {
          return true;
        }
        
        // Require authentication for protected routes
        if (pathname.startsWith('/profile') || pathname.startsWith('/admin') || pathname.startsWith('/technologies/register')) {
          return !!token;
        }
        
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    '/admin/:path*',
    '/profile/:path*',
    '/technologies/register'
  ]
};
