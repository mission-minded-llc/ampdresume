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
