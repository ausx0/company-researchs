import { NextResponse, type NextRequest } from "next/server";

import { cookies } from "next/headers";

export function middleware(request: NextRequest) {
  // Get the token from the cookies
  const cookieStore = cookies();

  const { pathname } = request.nextUrl;
  const isPublicPath =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/verifyemail";

  const token = cookieStore.get("token");
  // console.log(token?.value);

  if (pathname.startsWith("/_next")) return NextResponse.next();

  if (isPublicPath && token) {
    // If the user is on a public page and they have a token, redirect them to the home page

    return NextResponse.redirect(new URL("/home", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
