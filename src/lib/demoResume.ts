/**
 * Seeded literary and industry-vertical profiles are tagged `isDemo: true`.
 * Real accounts default to false.
 */
export function isDemoResume(user: { isDemo?: boolean | null } | null | undefined): boolean {
  return user?.isDemo === true;
}

/** Show the Demo chip on seeded resumes and theme-demo routes. */
export function shouldShowDemoResumeTag(
  user: { isDemo?: boolean | null } | null | undefined,
  pathname?: string | null,
): boolean {
  return isDemoResume(user) || Boolean(pathname?.startsWith("/demo"));
}
