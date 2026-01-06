import { prisma } from "@/lib/prisma";
import { normalizeEmail } from "@/util/email";

/**
 * Helper used to compare normalized emails.
 *
 * @param {string} email
 * @returns {User | null} the user with the matching normalized email, or null if not found.
 */
export const findUserByNormalizedEmail = async (email: string) => {
  const normalizedEmail = normalizeEmail(email);

  const splitEmail = email.split("@");
  const domain = splitEmail[1];

  const usersWithSameDomain = await prisma.user.findMany({
    where: { email: { endsWith: `@${domain}` } }, // Fetch users with the same domain
  });

  // Compare normalized emails
  const matchedUser = usersWithSameDomain.find((user: { email: string | null }) => {
    if (!user?.email) return false;

    const normalizedDbEmail = normalizeEmail(user.email);
    return normalizedDbEmail === normalizedEmail;
  });

  return matchedUser;
};

