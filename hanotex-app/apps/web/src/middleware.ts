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
    const protectedRoutes = [
      '/profile',
      '/technologies/register',
      '/my-technologies',
      '/my-demands',
      '/messages',
      '/settings'
    ];
    
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    if (isProtectedRoute && !token) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
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
        const protectedRoutes = [
          '/profile',
          '/admin',
          '/technologies/register',
          '/my-technologies',
          '/my-demands',
          '/messages',
          '/settings'
        ];
        
        const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
        if (isProtectedRoute) {
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
    '/technologies/register',
    '/my-technologies/:path*',
    '/my-demands/:path*',
    '/messages/:path*',
    '/settings/:path*'
  ]
};
