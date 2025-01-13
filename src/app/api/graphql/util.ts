import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

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
