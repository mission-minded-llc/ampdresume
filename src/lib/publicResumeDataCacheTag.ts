/** Next.js Data Cache tag max length (NEXT_CACHE_TAG_MAX_LENGTH). */
const MAX_TAG_LEN = 256;
const PREFIX = "public-resume:";

/**
 * Stable tag for Next.js fetch/Data Cache on public resume GraphQL requests (`slug` variable).
 * Must stay ≤ 256 characters.
 */
export function publicResumeDataCacheTag(slug: string): string {
  const maxSlug = MAX_TAG_LEN - PREFIX.length;
  const body = slug.length <= maxSlug ? slug : slug.slice(0, maxSlug);
  return `${PREFIX}${body}`;
}
