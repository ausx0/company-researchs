import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Get the token from the cookies
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyemail";

  const token = request.cookies.get("token");

  if (path === "/login" && token) {
    // If the user is on the login page and they have a token, redirect them to the home page
    return NextResponse.redirect(new URL("/home", request.nextUrl));
  }

  if (isPublicPath && token) {
    // If the user is on a public path (other than the login page) and they have a token, let them stay on the current page
    return NextResponse.next();
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
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
