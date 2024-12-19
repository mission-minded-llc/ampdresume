/**
 * Helper function to get the base URL for the application.
 *
 * @returns {string} The base URL for the application.
 */
export const getBaseUrl = () => {
  return process?.env?.NEXT_PUBLIC_BASE_URL || "https://www.openresume.org";
};
