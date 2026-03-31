import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "admin_session";
const SESSION_VALUE = "authenticated";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = request.cookies.get(SESSION_COOKIE);
  const isAuthenticated = session?.value === SESSION_VALUE;

  // 1. Protect admin builder and dashboard routes
  if (pathname.startsWith("/admin") && 
      !pathname.startsWith("/admin/setup") && 
      pathname !== "/admin") {
    
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      const url = new URL("/admin", request.url);
      return NextResponse.redirect(url);
    }
  }

  // 2. Redirect logged-in users away from the login page
  if (pathname === "/admin" && isAuthenticated) {
    const url = new URL("/admin/builder", request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/admin/:path*",
  ],
};
