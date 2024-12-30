import { PrismaClient } from "@prisma/client";

/**
 * Regular expression to validate email addresses.
 */
export const EMAIL_REGEX =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

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
  const matchedUser = usersWithSameDomain.find((user) => {
    if (!user?.email) return false;

    const normalizedDbEmail = normalizeEmail(user.email);
    return normalizedDbEmail === normalizedEmail;
  });

  return matchedUser;
};
