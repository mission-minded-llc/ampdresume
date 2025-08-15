/**
 * Helper function to get the base URL for the application.
 *
 * @returns {string} The base URL for the application.
 */
export const getBaseUrl = () => process?.env?.NEXT_PUBLIC_BASE_URL || "https://www.ampdresume.com";

/**
 * Helper function to get the environment name.
 *
 * @returns {string} the environment name.
 */
export const getEnvironmentName = () => process?.env?.NEXT_PUBLIC_ENVIRONMENT_NAME || "production";

/**
 * Helper function to validate a URL.
 *
 * @param {string} url The URL to validate.
 * @returns {boolean} Whether the URL is valid.
 */
export function validateUrl(url: string): boolean {
  const urlRegExp = new RegExp(
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/,
  );

  return url === "https://" || urlRegExp.test(url);
}

/**
 * Regex used to validate URLs when they're entered by the user.
 */
export const URL_REGEX =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
