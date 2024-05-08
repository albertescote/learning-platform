import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validateAccessToken } from '@/app/lib/backend/auth';

const protectedRoutes = ['/dashboard', '/meeting'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  const accessToken = cookies().get('access_token_learning_platform')?.value;
  let authorized = false;
  if (accessToken) {
    authorized = await validateAccessToken(accessToken);
  }

  if (isProtectedRoute && !authorized) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
