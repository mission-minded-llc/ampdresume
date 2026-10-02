const MAX_SEARCH_FIELD = 80;
const MIN_CANDIDATE_SEARCH_LENGTH = 3;

export const EMPTY_CANDIDATE_SEARCH_ERROR = "Enter a name, title, location, or skill";
export const CANDIDATE_SEARCH_TOO_SHORT_ERROR = "Use at least 3 characters in each search field";

export type CandidateSearchInput = {
  query: string;
  location: string;
  skill: string;
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
 * @returns The trimmed field, or an empty string when it is missing or not text.
 */
function readSearchField(body: unknown, key: string) {
  if (!body || typeof body !== "object" || !(key in body)) return "";

  const value = (body as Record<string, unknown>)[key];

  return typeof value === "string" ? value.trim().slice(0, MAX_SEARCH_FIELD) : "";
}

/**
 * Reads a candidate search, rejects an empty one, and rejects terms that are too short to be selective.
 *
 * @param body Request JSON from the recruiter search form.
 * @returns The trimmed search fields, or an error when every field is blank or any filled field is under 3 characters.
 */
export function parseCandidateSearchInput(body: unknown): CandidateSearchInput | FieldError {
  const input = {
    query: readSearchField(body, "query"),
    location: readSearchField(body, "location"),
    skill: readSearchField(body, "skill"),
  };
  const fields = [input.query, input.location, input.skill];

  if (fields.every((field) => !field)) {
    return { error: EMPTY_CANDIDATE_SEARCH_ERROR };
  }

  if (fields.some((field) => field.length > 0 && field.length < MIN_CANDIDATE_SEARCH_LENGTH)) {
    return { error: CANDIDATE_SEARCH_TOO_SHORT_ERROR };
  }

  return input;
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
 * @param query Search term to find. Matching is case-insensitive and treats the term as plain text.
 * @returns Ordered slices covering the full text. A blank query returns the text as one plain slice.
 */
export function splitSearchMatch(text: string, query: string): SearchMatchPart[] {
  const needle = query.trim();

  if (!needle || !text) return [{ text, match: false }];

  const pattern = new RegExp(escapeRegExp(needle), "gi");
  const parts: SearchMatchPart[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;

    if (index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, index), match: false });
    }

    parts.push({ text: match[0], match: true });
    lastIndex = index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), match: false });
  }

  return parts.length > 0 ? parts : [{ text, match: false }];
}

/**
 * Keeps a short skill list and puts skills that contain the search term first so the match stays visible.
 *
 * @param names Skill names from the resume, in their stored order.
 * @param skillQuery Skill search term. Blank leaves the stored order unchanged.
 * @param limit Maximum number of skills to return on a result card.
 * @returns Up to limit skill names, with matches ahead of the rest.
 */
export function selectSurfacedSkills(names: string[], skillQuery: string, limit: number) {
  const needle = skillQuery.trim().toLowerCase();
  const ordered = needle
    ? [...names].sort((left, right) => {
        const leftMatch = left.toLowerCase().includes(needle) ? 0 : 1;
        const rightMatch = right.toLowerCase().includes(needle) ? 0 : 1;

        return leftMatch - rightMatch;
      })
    : names;

  return ordered.slice(0, limit);
}
