import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * To prevent users from creating multiple accounts using slight email variations,
 * e.g. test@test.com, tes.t@test.com, test+1234@test.com - we need to normalize
 * incoming email addresses.
 *
 * @param {string} email the email address to normalize.
 * @returns a normalized email.
 */
export const normalizeEmail = (email: string) => {
  const [localPart, domain] = email.split("@");

  // Remove dots and anything after '+'
  const cleanedLocalPart = localPart.split("+")[0].replace(/\./g, "");

  // Ensure it's all lowercase.
  return `${cleanedLocalPart}@${domain}`.toLowerCase();
};

export const findUserByNormalizedEmail = async (email: string) => {
  const normalizedEmail = normalizeEmail(email);

  console.log({ normalizedEmail });

  // Get all users with the same domain
  const [localPart, domain] = email.split("@");
  const usersWithSameDomain = await prisma.user.findMany({
    where: { email: { endsWith: `@${domain}` } }, // Fetch users with the same domain
  });

  // Compare normalized emails
  const matchedUser = usersWithSameDomain.find((user) => {
    if (!user?.email) return false;

    const normalizedDbEmail = normalizeEmail(user.email);
    return normalizedDbEmail === normalizedEmail;
  });

  console.log({ matchedUser });

  return matchedUser;
};
