type OpenAILikeError = {
  status?: number;
  code?: string | null;
  message?: string;
  error?: { type?: string; code?: string; message?: string };
};

export const getSkillNamesForFuzzyMatch = (skills: unknown): string[] => {
  if (!Array.isArray(skills)) return [];

  return skills
    .map((skill) => {
      if (typeof skill === "string") return skill;
      if (skill && typeof skill === "object" && "name" in skill) {
        return String((skill as { name: unknown }).name ?? "");
      }
      return "";
    })
    .map((skill) => skill.trim())
    .filter((skill) => skill.length > 4);
};

export const normalizeParsedResume = (parsedData: {
  user?: {
    name?: string;
    displayEmail?: string;
    location?: string;
    title?: string;
    summary?: string;
    summaryTitle?: string;
  };
  companies?: Array<{
    name?: string;
    location?: string | null;
    startDate?: string;
    endDate?: string | null;
    positions?: Array<{
      title?: string;
      startDate?: string;
      endDate?: string | null;
      projects?: Array<{ name?: string }>;
    }>;
  }>;
  education?: Array<{
    school?: string;
    degree?: string;
    dateAwarded?: string;
  }>;
}) => ({
  user: {
    name: parsedData.user?.name ?? "",
    displayEmail: parsedData.user?.displayEmail ?? "",
    location: parsedData.user?.location ?? "",
    title: parsedData.user?.title ?? "",
    summary: parsedData.user?.summary ?? "",
    summaryTitle: parsedData.user?.summaryTitle ?? "",
  },
  companies: (parsedData.companies ?? []).map((company) => ({
    name: company?.name ?? "",
    location: company?.location ?? null,
    startDate: company?.startDate ?? "",
    endDate: company?.endDate ?? null,
    positions: (company?.positions ?? []).map((position) => ({
      title: position?.title ?? "",
      startDate: position?.startDate ?? "",
      endDate: position?.endDate ?? null,
      projects: (position?.projects ?? []).map((project) => ({
        name: project?.name ?? "",
      })),
    })),
  })),
  education: (parsedData.education ?? []).map((edu) => ({
    school: edu?.school ?? "",
    degree: edu?.degree ?? "",
    dateAwarded: edu?.dateAwarded ?? "",
  })),
});

export const getParseResumeErrorMessage = (error: unknown): string => {
  const err = error as OpenAILikeError;
  const code = err?.code ?? err?.error?.code;
  const type = err?.error?.type;

  if (
    code === "credit_balance_exhausted" ||
    code === "insufficient_quota" ||
    type === "insufficient_quota"
  ) {
    return "OpenAI has no credits remaining. Add billing credits to your OpenAI account to use Import PDF.";
  }

  if (err?.status === 429) {
    return "OpenAI rate limit reached. Please wait and try again.";
  }

  if (err?.status === 401) {
    return "OpenAI API key is invalid.";
  }

  return "Failed to parse resume text";
};
