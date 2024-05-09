import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validateAccessToken } from '@/app/lib/backend/auth';

const protectedRoutes = ['/dashboard', '/meeting'];
const teacherProtectedRoutes = ['/dashboard/create-meeting'];
const studentProtectedRoutes = ['/dashboard/join-meeting'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  const accessToken = cookies().get('access_token_learning_platform')?.value;
  let authorized = false;
  let role = '';
  if (accessToken) {
    const accessTokenPayload = await validateAccessToken(accessToken);
    authorized = !!accessTokenPayload;
    if (authorized) {
      if (!accessTokenPayload?.role) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
      }
      role = accessTokenPayload!.role;
    }
  }

  if (isProtectedRoute && !authorized) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }
  if (teacherProtectedRoutes.includes(path) && role !== 'Teacher') {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }
  if (studentProtectedRoutes.includes(path) && role !== 'Student') {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
