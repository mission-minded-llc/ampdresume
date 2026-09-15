import { Session } from "next-auth";
import { prisma } from "@/lib/prisma";
import { User } from "@/types";

/**
 * Public resume data omits displayEmail. Attach it only when the viewer owns the resume,
 * so owner-generated PDFs can include a contact address without exposing it to scrapers.
 */
export const withOwnerDisplayEmail = async (user: User, session: Session | null): Promise<User> => {
  if (!session?.user?.id || session.user.id !== user.id) {
    return { ...user, displayEmail: null };
  }

  const owner = await prisma.user.findUnique({
    where: { id: user.id },
    select: { displayEmail: true },
  });

  return { ...user, displayEmail: owner?.displayEmail ?? null };
};
