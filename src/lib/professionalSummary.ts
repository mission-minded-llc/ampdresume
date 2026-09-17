export const DEFAULT_PROFESSIONAL_SUMMARY_TITLE = "Professional Summary";

/**
 * Returns the heading to show above a professional summary.
 * Blank or missing titles fall back to the default label.
 */
export const getProfessionalSummaryTitle = (title?: string | null): string => {
  const trimmed = title?.trim();
  return trimmed ? trimmed : DEFAULT_PROFESSIONAL_SUMMARY_TITLE;
};

/**
 * True when HTML (or plain text) still has visible characters after tags are stripped.
 * Empty Lexical documents such as `<p><br></p>` are treated as blank.
 */
export const hasRichTextContent = (html?: string | null): boolean => {
  if (!html) return false;

  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  return text.length > 0;
};

const escapeHtml = (text: string): string =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Converts imported plain-text summary into HTML for storage and theme rendering.
 * Blank input becomes null so empty imports do not persist placeholder markup.
 */
export const plainTextToSummaryHtml = (text?: string | null): string | null => {
  const trimmed = text?.trim();
  if (!trimmed) return null;

  return trimmed
    .split(/\n\s*\n/)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`)
    .join("");
};
