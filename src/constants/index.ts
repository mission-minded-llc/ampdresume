export { SOCIAL_MEDIA_PLATFORMS } from "./social";

// Default SEO values.
export const titleSuffix = "| Amp'd Resume";
export const defaultDescription =
  "Amp'd Resume is a free interactive resume builder. Sign in and start building your resume today!";

// File upload constants.
export const MAX_USER_IMAGE_SIZE = 1 * 1024 * 1024;
export const ALLOWED_USER_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
];

// List of allowed users for alpha testing and access to test subdomains.
// Comma-separated list of email addresses from environment variable.
export const ALLOWED_USER_EMAILS = process.env.ALLOWED_USER_EMAILS
  ? process.env.ALLOWED_USER_EMAILS.split(",").map((email) => email.trim())
  : ["test@ampdresume.com", "jesttest@ampdresume.com"];
