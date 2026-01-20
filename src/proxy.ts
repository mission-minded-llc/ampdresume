import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Export the proxy with security headers
export default withAuth(
  function proxy() {
    const res = NextResponse.next();

    // Add security headers
    res.headers.set("X-Frame-Options", "DENY");
    res.headers.set("Content-Security-Policy", "frame-ancestors 'none';");

    return res;
  },
  {
    pages: {
      signIn: "/login",
    },
    callbacks: {
      authorized: ({ req }) => {
        // If the requested path is /api/graphql, skip auth
        if (req.url.includes("/api/graphql")) return true;

        // For non-protected routes, allow access
        if (
          !req.nextUrl.pathname.startsWith("/edit/") &&
          !req.nextUrl.pathname.startsWith("/api/")
        ) {
          return true;
        }

        // For protected routes, check session
        const session = req.cookies.get("next-auth.session-token")?.value;
        return Boolean(session);
      },
    },
  },
);

export const config = {
  matcher: [
    // Apply to all paths
    "/:path*",
  ],
};
