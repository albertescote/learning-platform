import { NextRequest, NextResponse } from 'next/server';
import { validateAccessToken } from '@/app/lib/backend/auth';

const protectedRoutes = ['/dashboard', '/meeting'];
const teacherProtectedRoutes = ['/dashboard/create-meeting'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  let authorized = false;
  let role: string | undefined = '';
  const accessTokenPayload = await validateAccessToken();
  if (accessTokenPayload) {
    role = accessTokenPayload.role;
    authorized = true;
  }

  if (isProtectedRoute && !authorized) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }
  if (teacherProtectedRoutes.includes(path) && role !== 'Teacher') {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
