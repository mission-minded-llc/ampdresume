import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Redirect if not authenticated
  },
  callbacks: {
    authorized: ({ req }) => {
      // Look for the session cookie
      const session = req.cookies.get("next-auth.session-token")?.value;

      return Boolean(session); // Allow access if session exists

      // This is a shallow access check. You should validate the session
      // to ensure it's not expired or tampered with before allowing access.
    },
  },
});

export const config = {
  matcher: [
    // User account pages.
    "/account/:path*",
    // Resume editing pages.
    "/r/:slug/edit/:path*",
    // Apply to all API routes.
    "/api/:path*",
  ],
};
