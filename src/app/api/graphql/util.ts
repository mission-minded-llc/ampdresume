import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export const verifySessionOwnership = async (userId: string) => {
  const session = await getServerSession(authOptions);

  // No session, or no user in session. Ownership cannot be verified.
  if (!session || !session?.user) {
    return false;
  }

  // Session user ID does not match the user ID being verified.
  if (session.user.id !== userId) {
    return false;
  }

  return true;
};
