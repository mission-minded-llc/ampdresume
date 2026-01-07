/**
 * Regular expression to validate email addresses.
 */
export const EMAIL_REGEX =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

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
