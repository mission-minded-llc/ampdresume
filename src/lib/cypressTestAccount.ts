/**
 * Cypress logs in as one user per spec file so specs can run in any order
 * (and in parallel shards) without sharing resume data.
 *
 * Do not use plus-addressing (test+spec@...). `normalizeEmail` strips +tags,
 * so those addresses would collapse onto a single user.
 */

export const CYPRESS_SPEC_EMAIL_PATTERN = /^cypress-[a-z0-9-]+@ampdresume\.com$/i;

export function isCypressMagicLinkEmail(email: string): boolean {
  if (email === process.env.CYPRESS_TEST_EMAIL) return true;
  return CYPRESS_SPEC_EMAIL_PATTERN.test(email);
}

export function cypressSpecTagFromPath(specRelative: string): string {
  return specRelative
    .replace(/\\/g, "/")
    .replace(/^\.?\//, "")
    .replace(/^cypress\/integration\//, "")
    .replace(/\.cy\.ts$/, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

export function cypressSpecEmail(specRelative: string): string {
  return `cypress-${cypressSpecTagFromPath(specRelative)}@ampdresume.com`;
}

export function cypressSpecSlug(specRelative: string): string {
  return `cypress-${cypressSpecTagFromPath(specRelative)}`;
}
