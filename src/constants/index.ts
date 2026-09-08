export { SOCIAL_MEDIA_PLATFORMS } from "./social";

// Default SEO values.
export const titleSuffix = "| Amp'd Resume";
export const defaultDescription =
  "Amp'd Resume is a free interactive resume builder. Sign in and start building your resume today!";

// List of allowed users for alpha testing and access to test subdomains.
// Comma-separated list of email addresses from environment variable.
export const ALLOWED_USER_EMAILS = process.env.ALLOWED_USER_EMAILS
  ? process.env.ALLOWED_USER_EMAILS.split(",").map((email) => email.trim())
  : ["test@ampdresume.com", "jesttest@ampdresume.com"];
