const DEFAULT_CALLBACK_URL = "/edit/profile";

/**
 * Keep post-login redirects on this site. Reject protocol-relative and absolute URLs.
 */
export function safeCallbackUrl(raw: string | null | undefined): string {
  if (!raw) return DEFAULT_CALLBACK_URL;
  if (!raw.startsWith("/") || raw.startsWith("//")) return DEFAULT_CALLBACK_URL;
  if (raw.includes("\\") || raw.includes("://")) return DEFAULT_CALLBACK_URL;

  return raw;
}
