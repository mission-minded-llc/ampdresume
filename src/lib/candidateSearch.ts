const MAX_SEARCH_FIELD = 80;
const MAX_SKILL_FIELD = 200;
const MAX_SKILL_TERMS = 8;
const MIN_CANDIDATE_SEARCH_LENGTH = 3;

export const EMPTY_CANDIDATE_SEARCH_ERROR = "Enter a name, title, location, or skill";
export const CANDIDATE_SEARCH_TOO_SHORT_ERROR = "Use at least 3 characters in each search field";
export const TOO_MANY_SKILL_TERMS_ERROR = "Search up to 8 skills at a time";

export type CandidateSearchInput = {
  query: string;
  location: string;
  skill: string;
  skills: string[];
};

type FieldError = { error: string };

export type SearchMatchPart = {
  text: string;
  match: boolean;
};

/**
 * Reads one search box and keeps only a trimmed string within the field limit.
 *
 * @param body Request JSON, which may be missing or malformed.
 * @param key Field name to read, such as query, location, or skill.
 * @param maxLength Longest string to keep. Extra characters are dropped.
 * @returns The trimmed field, or an empty string when it is missing or not text.
 */
function readSearchField(body: unknown, key: string, maxLength: number) {
  if (!body || typeof body !== "object" || !(key in body)) return "";

  const value = (body as Record<string, unknown>)[key];

  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

/**
 * Splits a skill box on commas so each skill can be matched and ranked on its own.
 *
 * @param skill Raw skill field, which may list several skills separated by commas.
 * @returns Trimmed skills in the order typed, with blanks and repeated skills removed.
 */
function splitSkillTerms(skill: string) {
  const seen = new Set<string>();
  const terms: string[] = [];

  for (const part of skill.split(",")) {
    const term = part.trim();
    const key = term.toLowerCase();

    if (!term || seen.has(key)) continue;

    seen.add(key);
    terms.push(term);
  }

  return terms;
}

/**
 * Reads a candidate search, rejects an empty one, and rejects terms that are too short to be selective.
 *
 * @param body Request JSON from the recruiter search form.
 * @returns The trimmed search fields, including each comma-separated skill, or an error when every field is blank, any filled field is under 3 characters, or more than 8 skills are listed.
 */
export function parseCandidateSearchInput(body: unknown): CandidateSearchInput | FieldError {
  const query = readSearchField(body, "query", MAX_SEARCH_FIELD);
  const location = readSearchField(body, "location", MAX_SEARCH_FIELD);
  const skill = readSearchField(body, "skill", MAX_SKILL_FIELD);
  const skills = splitSkillTerms(skill);
  const filled = [query, location, ...skills];

  if (filled.every((field) => !field)) {
    return { error: EMPTY_CANDIDATE_SEARCH_ERROR };
  }

  if (filled.some((field) => field.length > 0 && field.length < MIN_CANDIDATE_SEARCH_LENGTH)) {
    return { error: CANDIDATE_SEARCH_TOO_SHORT_ERROR };
  }

  if (skills.length > MAX_SKILL_TERMS) {
    return { error: TOO_MANY_SKILL_TERMS_ERROR };
  }

  return { query, location, skill, skills };
}

/**
 * Escapes a search term so it is matched as plain text inside a regular expression.
 *
 * @param value Recruiter search text that may contain characters such as + or parentheses.
 * @returns The same text with regular-expression metacharacters escaped.
 */
function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Splits resume text into plain and matching slices so the UI can mark what the search found.
 *
 * @param text Visible resume text, such as a name, title, location, or skill.
 * @param query Search term or terms to find. Matching is case-insensitive and treats each term as plain text.
 * @returns Ordered slices covering the full text. A blank query returns the text as one plain slice.
 */
export function splitSearchMatch(
  text: string,
  query: string | readonly string[],
): SearchMatchPart[] {
  const needles = (Array.isArray(query) ? query : [query])
    .map((term) => term.trim())
    .filter(Boolean);

  if (needles.length === 0 || !text) return [{ text, match: false }];

  const ranges: { start: number; end: number }[] = [];

  for (const needle of needles) {
    const pattern = new RegExp(escapeRegExp(needle), "gi");

    for (const match of text.matchAll(pattern)) {
      const start = match.index ?? 0;
      ranges.push({ start, end: start + match[0].length });
    }
  }

  ranges.sort((left, right) => left.start - right.start || left.end - right.end);

  const merged: { start: number; end: number }[] = [];

  for (const range of ranges) {
    const last = merged[merged.length - 1];

    if (last && range.start <= last.end) {
      last.end = Math.max(last.end, range.end);
      continue;
    }

    merged.push({ ...range });
  }

  const parts: SearchMatchPart[] = [];
  let lastIndex = 0;

  for (const range of merged) {
    if (range.start > lastIndex) {
      parts.push({ text: text.slice(lastIndex, range.start), match: false });
    }

    parts.push({ text: text.slice(range.start, range.end), match: true });
    lastIndex = range.end;
  }

  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), match: false });
  }

  return parts.length > 0 ? parts : [{ text, match: false }];
}

/**
 * Decides whether a resume skill is the searched skill, starts with it, or contains it as its own word.
 *
 * @param name Skill name from the resume.
 * @param term Skill the recruiter typed.
 * @returns True when the term is a real skill match, so a fragment inside another word does not count.
 */
export function matchesSkillTerm(name: string, term: string) {
  const skill = name.toLowerCase();
  const needle = term.trim().toLowerCase();

  if (!needle) return false;
  if (skill.startsWith(needle)) return true;

  const pattern = new RegExp(`(?:^|[^a-z0-9])${escapeRegExp(needle)}(?:[^a-z0-9]|$)`, "i");

  return pattern.test(skill);
}

/**
 * Scores how closely one resume skill covers one searched skill.
 *
 * @param name Skill name from the resume, already lowercased.
 * @param term Searched skill, already lowercased.
 * @returns 3 for the same name, 2 when the resume skill starts with the term, 1 when the term is its own word, and 0 when it is only buried inside another word.
 */
function skillTermCloseness(name: string, term: string) {
  if (name === term) return 3;
  if (name.startsWith(term)) return 2;
  if (matchesSkillTerm(name, term)) return 1;

  return 0;
}

type SkillRelevance = {
  matched: number;
  closeness: number;
};

/**
 * Measures how many searched skills a resume covers, and how closely each name matches.
 *
 * @param names Skill names from the resume.
 * @param terms Skills the recruiter listed, in search order.
 * @returns How many terms match, plus a closeness total that prefers an exact name over a longer one.
 */
function scoreSkillRelevance(names: string[], terms: string[]): SkillRelevance {
  const loweredNames = names.map((name) => name.toLowerCase());
  let matched = 0;
  let closeness = 0;

  for (const term of terms) {
    const needle = term.trim().toLowerCase();

    if (!needle) continue;

    let best = 0;

    for (const name of loweredNames) {
      best = Math.max(best, skillTermCloseness(name, needle));
      if (best === 3) break;
    }

    if (best === 0) continue;

    matched += 1;
    closeness += best;
  }

  return { matched, closeness };
}

/**
 * Orders candidates so resumes that cover more of the searched skills come first.
 *
 * @param candidates Rows that include resume skill names and the last update time used to break ties.
 * @param terms Skills the recruiter listed. An empty list leaves the current order unchanged.
 * @returns A new array with broader, closer skill matches ahead of narrower ones, then more recently updated resumes.
 */
export function rankCandidatesBySkills<T extends { skillNames: string[]; updatedAt: Date }>(
  candidates: T[],
  terms: string[],
): T[] {
  if (terms.length === 0) return candidates;

  return [...candidates].sort((left, right) => {
    const leftScore = scoreSkillRelevance(left.skillNames, terms);
    const rightScore = scoreSkillRelevance(right.skillNames, terms);

    if (rightScore.matched !== leftScore.matched) return rightScore.matched - leftScore.matched;
    if (rightScore.closeness !== leftScore.closeness)
      return rightScore.closeness - leftScore.closeness;

    return right.updatedAt.getTime() - left.updatedAt.getTime();
  });
}

/**
 * Keeps a short skill list and puts skills that match the search first so those matches stay visible.
 *
 * @param names Skill names from the resume, in their stored order.
 * @param terms Skills the recruiter listed. An empty list leaves the stored order unchanged.
 * @param limit Maximum number of skills to return on a result card.
 * @returns Up to limit skill names, with matches in the order the recruiter typed them ahead of the rest.
 */
export function selectSurfacedSkills(names: string[], terms: string[], limit: number) {
  const needles = terms.map((term) => term.trim().toLowerCase()).filter(Boolean);

  if (needles.length === 0) return names.slice(0, limit);

  const used = new Set<number>();
  const matched: string[] = [];

  for (const needle of needles) {
    for (let index = 0; index < names.length; index += 1) {
      const name = names[index];

      if (name === undefined || used.has(index) || !matchesSkillTerm(name, needle)) continue;

      used.add(index);
      matched.push(name);
    }
  }

  const rest = names.filter((_, index) => !used.has(index));

  return [...matched, ...rest].slice(0, limit);
}
