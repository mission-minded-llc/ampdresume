import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { selectSurfacedSkills, type CandidateSearchInput } from "@/lib/candidateSearch";
import { prisma } from "@/lib/prisma";

const MAX_PROFILE_FIELD = 120;
const MAX_RESULTS = 25;
const MAX_SKILLS = 8;
const SEARCH_LIMIT = 20;
const SEARCH_WINDOW_MS = 60_000;

const searchHits = new Map<string, number[]>();

export {
  CANDIDATE_SEARCH_TOO_SHORT_ERROR,
  EMPTY_CANDIDATE_SEARCH_ERROR,
  parseCandidateSearchInput,
} from "@/lib/candidateSearch";
export type { CandidateSearchInput } from "@/lib/candidateSearch";

export const RECRUITER_SEARCH_LIMIT_ERROR = "Too many searches. Wait a minute and try again.";

export type RecruiterProfileSummary = {
  companyName: string;
  title: string | null;
};

export type RecruiterProfileInput = RecruiterProfileSummary;

export type CandidateResult = {
  slug: string;
  name: string;
  title: string | null;
  location: string | null;
  skills: string[];
};

export type RecruiterAccess =
  | { ok: true; userId: string; profile: RecruiterProfileSummary | null }
  | { ok: false; status: 401 | 403; error: string };

type FieldError = { error: string };

/**
 * Signed-in user. A profile is optional here so onboarding can create one;
 * search checks for the profile separately.
 */
export async function getRecruiterAccess(): Promise<RecruiterAccess> {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) return { ok: false, status: 401, error: "Unauthorized" };

  const profile = await prisma.recruiterProfile.findUnique({
    where: { userId },
    select: { companyName: true, title: true },
  });

  return { ok: true, userId, profile };
}

export function parseRecruiterProfileInput(body: unknown): RecruiterProfileInput | FieldError {
  if (!body || typeof body !== "object") return { error: "Company name is required" };

  const record = body as Record<string, unknown>;
  const companyName = typeof record.companyName === "string" ? record.companyName.trim() : "";
  const title = typeof record.title === "string" ? record.title.trim() : "";

  if (!companyName) return { error: "Company name is required" };
  if (companyName.length > MAX_PROFILE_FIELD) return { error: "Company name is too long" };
  if (title.length > MAX_PROFILE_FIELD) return { error: "Title is too long" };

  return { companyName, title: title || null };
}

export async function saveRecruiterProfile(userId: string, input: RecruiterProfileInput) {
  return prisma.recruiterProfile.upsert({
    where: { userId },
    create: {
      userId,
      companyName: input.companyName,
      title: input.title,
    },
    update: {
      companyName: input.companyName,
      title: input.title,
    },
    select: { companyName: true, title: true },
  });
}

export function parseDiscoverableInput(body: unknown): { enabled: boolean } | FieldError {
  if (!body || typeof body !== "object" || !("enabled" in body)) {
    return { error: "enabled must be a boolean" };
  }

  const enabled = (body as { enabled: unknown }).enabled;

  if (typeof enabled !== "boolean") return { error: "enabled must be a boolean" };

  return { enabled };
}

export async function setRecruiterDiscoverable(userId: string, enabled: boolean) {
  await prisma.user.update({
    where: { id: userId },
    data: { recruiterDiscoverable: enabled },
  });
}

/**
 * Forgets in-memory search hits. Tests call this so cases do not share a window.
 */
export function resetRecruiterSearchLimit() {
  searchHits.clear();
}

/**
 * Allows a short burst of candidate searches per user, then asks them to wait.
 */
export function consumeRecruiterSearch(
  userId: string,
  now = Date.now(),
): { ok: true } | { ok: false; error: string } {
  const windowStart = now - SEARCH_WINDOW_MS;
  const hits = (searchHits.get(userId) ?? []).filter((time) => time > windowStart);

  if (hits.length >= SEARCH_LIMIT) {
    searchHits.set(userId, hits);
    return { ok: false, error: RECRUITER_SEARCH_LIMIT_ERROR };
  }

  hits.push(now);
  searchHits.set(userId, hits);
  return { ok: true };
}

/**
 * Opted-in, non-demo resumes only. Login email and display email are never selected.
 */
export async function searchCandidates(input: CandidateSearchInput): Promise<CandidateResult[]> {
  const filters = [];

  if (input.query) {
    filters.push({
      OR: [
        { name: { contains: input.query, mode: "insensitive" as const } },
        { title: { contains: input.query, mode: "insensitive" as const } },
      ],
    });
  }

  if (input.location) {
    filters.push({ location: { contains: input.location, mode: "insensitive" as const } });
  }

  if (input.skill) {
    filters.push({
      skillForUser: {
        some: {
          skill: { name: { contains: input.skill, mode: "insensitive" as const } },
        },
      },
    });
  }

  const users = await prisma.user.findMany({
    where: {
      recruiterDiscoverable: true,
      isDemo: false,
      slug: { not: null },
      ...(filters.length ? { AND: filters } : {}),
    },
    select: {
      slug: true,
      name: true,
      title: true,
      location: true,
      skillForUser: {
        select: { skill: { select: { name: true } } },
      },
    },
    orderBy: { updatedAt: "desc" },
    take: MAX_RESULTS,
  });

  return users.flatMap((user) => {
    if (!user.slug) return [];

    return [
      {
        slug: user.slug,
        name: user.name?.trim() || "Untitled resume",
        title: user.title,
        location: user.location,
        skills: selectSurfacedSkills(
          user.skillForUser.map((row) => row.skill.name),
          input.skill,
          MAX_SKILLS,
        ),
      },
    ];
  });
}
