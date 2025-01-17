import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

/**
 * The purpose of this function is to verify that the session user ID matches the user ID being verified.
 * When a client-side mutation is performed, the session user ID is passed to the server-side mutation.
 * If the session user ID does not match the user ID being verified, an error is thrown and the mutation
 * doesn't proceed. This is a security measure to prevent unauthorized users from modifying data that they
 * do not own.
 *
 * @param {string} userId the user ID to verify session ownership for.
 * @returns {boolean} true if the session user ID matches the user ID being verified.
 * @throws {Error} if no session or user in session, or if the session user ID does not match the user ID being verified.
 */
export const verifySessionOwnership = async (userId: string) => {
  const session = await getServerSession(authOptions);

  // No session, or no user in session. Ownership cannot be verified.
  if (!session || !session?.user) {
    throw new Error("Unauthorized: No session or user in session");
  }

  // Session user ID does not match the user ID being verified.
  if (session.user.id !== userId) {
    throw new Error("Unauthorized: Session user ID does not match the user ID being verified");
  }

  return true;
};
