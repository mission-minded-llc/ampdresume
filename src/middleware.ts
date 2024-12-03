import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Redirect if not authenticated
  },
  callbacks: {
    authorized: ({ req }) => {
      const session = req.cookies.get("next-auth.session-token"); // Look for the session cookie

      return Boolean(session); // Allow access if session exists
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export const config = {
  matcher: [
    // User account pages.
    "/account/:path*",
    // Resume editing pages.
    "/r/:slug/edit/:path*",
  ],
};
