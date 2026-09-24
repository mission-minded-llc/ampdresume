import { Social } from "@/types";
import { getSocialPlatformHomepage } from "@/util/social";
import { isDemoResume } from "./demoResume";

const DEMO_PLACEHOLDER_PLATFORMS = [
  "github",
  "linkedin",
  "x",
  "instagram",
  "youtube",
  "medium",
  "website",
] as const;

function hashSeed(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: T[], random: () => number): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

/**
 * Dummy socials for demo resumes. The mix is randomized per user but stable for
 * a given id so SSR, hydration, and PDF/web views stay in sync.
 */
export function getDemoPlaceholderSocials(user: {
  id?: string | null;
  name?: string | null;
}): Social[] {
  const seedKey = user.id || user.name || "demo";
  const random = mulberry32(hashSeed(seedKey));
  const platforms = shuffle([...DEMO_PLACEHOLDER_PLATFORMS], random);
  const count = 3 + Math.floor(random() * 3);
  const userId = user.id ?? "demo";

  return platforms.slice(0, count).map((platform, index) => ({
    id: `demo-social-${platform}`,
    userId,
    platform,
    ref: getSocialPlatformHomepage(platform),
    sortIndex: index,
  }));
}

/** Demo users never show stored socials; themes get placeholders instead. */
export function resolveThemeSocials(
  user: { id?: string | null; name?: string | null; isDemo?: boolean | null },
  socials: Social[],
): Social[] {
  return isDemoResume(user) ? getDemoPlaceholderSocials(user) : socials;
}
