export type OnboardingTutorial = "resume" | "recruiter";

export type OnboardingStatus = {
  pending: boolean;
  recruiterPending: boolean;
};

/**
 * Picks the tutorial that matches the page someone is using.
 *
 * @param pathname Current app path.
 * @returns Recruiter when the path is the hiring desk, otherwise the resume tutorial.
 */
export function onboardingEntryForPath(pathname: string): OnboardingTutorial {
  return pathname.startsWith("/recruit") ? "recruiter" : "resume";
}

/**
 * Resolves a first sign-in that still has both tutorials unfinished.
 * The page they land on keeps one tutorial and clears the other, so a
 * recruiter does not later get the resume tour, and the reverse.
 *
 * @param entry Workspace that handled this read. Missing when the caller did not say.
 * @param status Both pending flags before this read.
 * @returns The flags to store, and whether either one changed.
 */
export function claimFirstTutorial(
  entry: string | null,
  status: OnboardingStatus,
): { status: OnboardingStatus; changed: boolean } {
  if (!status.pending || !status.recruiterPending) {
    return { status, changed: false };
  }

  if (entry === "recruiter") {
    return { status: { pending: false, recruiterPending: true }, changed: true };
  }

  if (entry === "resume") {
    return { status: { pending: true, recruiterPending: false }, changed: true };
  }

  return { status, changed: false };
}

/**
 * Chooses which tutorial to show for this page.
 * A forced restart stays on the workspace it belongs to.
 *
 * @param pathname Current app path.
 * @param status Saved pending flags.
 * @param forced Tutorial a restart asked to show, if one is in progress.
 * @returns The tutorial to render, or null when this page should stay quiet.
 */
export function visibleOnboardingTutorial(
  pathname: string,
  status: OnboardingStatus,
  forced: OnboardingTutorial | null,
): OnboardingTutorial | null {
  const entry = onboardingEntryForPath(pathname);

  if (forced) {
    return forced === entry ? forced : null;
  }

  if (entry === "recruiter") {
    return status.recruiterPending ? "recruiter" : null;
  }

  return status.pending ? "resume" : null;
}
