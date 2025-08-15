/**
 * This is the NextAuth API endpoint for the application.
 * @see https://next-auth.js.org/getting-started/example
 */
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
