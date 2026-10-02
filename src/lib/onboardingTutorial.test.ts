import { expect } from "@jest/globals";
import {
  claimFirstTutorial,
  onboardingEntryForPath,
  visibleOnboardingTutorial,
} from "./onboardingTutorial";

describe("onboardingTutorial", () => {
  it("treats the recruiter desk as the recruiter entry and every other path as resume", () => {
    expect(onboardingEntryForPath("/recruit")).toBe("recruiter");
    expect(onboardingEntryForPath("/edit/profile")).toBe("resume");
  });

  it("keeps the recruiter tutorial when a first sign-in lands on the hiring desk", () => {
    expect(claimFirstTutorial("recruiter", { pending: true, recruiterPending: true })).toEqual({
      status: { pending: false, recruiterPending: true },
      changed: true,
    });
  });

  it("keeps the resume tutorial when a first sign-in lands anywhere else", () => {
    expect(claimFirstTutorial("resume", { pending: true, recruiterPending: true })).toEqual({
      status: { pending: true, recruiterPending: false },
      changed: true,
    });
  });

  it("leaves a chosen tutorial alone on later reads", () => {
    expect(claimFirstTutorial("recruiter", { pending: true, recruiterPending: false })).toEqual({
      status: { pending: true, recruiterPending: false },
      changed: false,
    });
  });

  it("shows only the tutorial that belongs on the current page", () => {
    expect(
      visibleOnboardingTutorial("/recruit", { pending: true, recruiterPending: true }, null),
    ).toBe("recruiter");
    expect(
      visibleOnboardingTutorial("/edit/profile", { pending: true, recruiterPending: false }, null),
    ).toBe("resume");
    expect(
      visibleOnboardingTutorial("/recruit", { pending: true, recruiterPending: false }, null),
    ).toBeNull();
    expect(
      visibleOnboardingTutorial("/edit/profile", { pending: false, recruiterPending: true }, null),
    ).toBeNull();
  });

  it("keeps a restart on the workspace that started it", () => {
    expect(
      visibleOnboardingTutorial(
        "/recruit",
        { pending: false, recruiterPending: false },
        "recruiter",
      ),
    ).toBe("recruiter");
    expect(
      visibleOnboardingTutorial(
        "/edit/profile",
        { pending: false, recruiterPending: false },
        "recruiter",
      ),
    ).toBeNull();
  });
});
