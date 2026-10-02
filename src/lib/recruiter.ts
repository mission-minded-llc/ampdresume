import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isFeatureEnabledForUserId } from "@/lib/featureFlags";
import { prisma } from "@/lib/prisma";

const MAX_PROFILE_FIELD = 120;
const MAX_SEARCH_FIELD = 80;
const MAX_RESULTS = 25;
const MAX_SKILLS = 8;

export type RecruiterProfileSummary = {
  companyName: string;
  title: string | null;
};

export type RecruiterProfileInput = RecruiterProfileSummary;

export type CandidateSearchInput = {
  query: string;
  location: string;
  skill: string;
};

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
 * Signed-in user with the recruiter beta flag. A profile is optional here so
 * onboarding can create one; search checks for the profile separately.
 */
export async function getRecruiterAccess(): Promise<RecruiterAccess> {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  if (!userId) return { ok: false, status: 401, error: "Unauthorized" };

  const enabled = await isFeatureEnabledForUserId(userId, "recruiter_beta");

  if (!enabled) {
    return { ok: false, status: 403, error: "Recruiter access is not enabled" };
  }

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

function readSearchField(body: unknown, key: string) {
  if (!body || typeof body !== "object" || !(key in body)) return "";

  const value = (body as Record<string, unknown>)[key];

  return typeof value === "string" ? value.trim().slice(0, MAX_SEARCH_FIELD) : "";
}

export function parseCandidateSearchInput(body: unknown): CandidateSearchInput {
  return {
    query: readSearchField(body, "query"),
    location: readSearchField(body, "location"),
    skill: readSearchField(body, "skill"),
  };
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
        take: MAX_SKILLS,
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
        skills: user.skillForUser.map((row) => row.skill.name),
      },
    ];
  });
}
