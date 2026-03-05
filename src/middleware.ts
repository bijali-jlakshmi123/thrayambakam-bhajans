import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define paths that don't require authentication
  const isPublicPath = path === "/admin/login";

  // Get the session cookie
  const session = request.cookies.get("session")?.value;

  if (path.startsWith("/admin")) {
    // If it's a private admin path and there's no session, redirect to login
    if (!isPublicPath && !session) {
      return NextResponse.redirect(new URL("/admin/login", request.nextUrl));
    }

    // Verify the session if it exists
    if (session) {
      try {
        await decrypt(session);
        // If it's the login page and we have a valid session, redirect to dashboard
        if (isPublicPath) {
          return NextResponse.redirect(new URL("/admin", request.nextUrl));
        }
      } catch (error) {
        // If session is invalid, clear it and redirect to login
        if (!isPublicPath) {
          const response = NextResponse.redirect(
            new URL("/admin/login", request.nextUrl),
          );
          response.cookies.delete("session");
          return response;
        }
      }
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*"],
};
