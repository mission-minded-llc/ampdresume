import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { GraphQLContext } from "@/types/graphql";

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

/**
 * Type for the filtered user data returned to unauthenticated users
 */
type FilteredUserData = {
  id: string;
  name: string | null;
  title: string | null;
  location: string | null;
  siteTitle: string | null;
  siteDescription: string | null;
  siteImage: string | null;
  webThemeName: string | null;
  displayEmail: string | null;
  email: null;
};

/**
 * Filters user data based on authentication status.
 * Returns only public fields for unauthenticated users.
 * Returns full user data for authenticated users.
 *
 * @param {User | null} user The full user object from the database
 * @param {GraphQLContext} context The GraphQL context containing authentication info
 * @returns {User | FilteredUserData | null} Filtered user object
 */
export const filterUserData = (
  user: User | null,
  context: GraphQLContext,
): User | FilteredUserData | null => {
  if (!user) return null;

  // For unauthenticated users, or if the user.id does not match the session user ID,
  // return only public fields.
  if (!context.isAuthenticated || user.id !== context.session?.user?.id) {
    return {
      id: user.id,
      name: user.name,
      title: user.title,
      location: user.location,
      siteTitle: user.siteTitle,
      siteDescription: user.siteDescription,
      siteImage: user.siteImage,
      webThemeName: user.webThemeName,
      displayEmail: user.displayEmail,

      // Explicitly set sensitive fields to null for unauthenticated users
      email: null,
    };
  }

  // For authenticated users, return full user data
  return user;
};
