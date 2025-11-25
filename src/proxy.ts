import { NextRequest, NextResponse } from "next/server";

/**
 * Development proxy to skip landing page and redirect to main app
 */
export function proxy(request: NextRequest) {
  // Only redirect if on root path
  if (request.nextUrl.pathname === "/") {
    // Redirect to /main using the request URL as the base
    return NextResponse.redirect(new URL("/main", request.url));
  }

  // Allow all other requests to pass through
  return NextResponse.next();
}
