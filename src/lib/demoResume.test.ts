import { expect } from "@jest/globals";
import { isDemoResume, shouldShowDemoResumeTag } from "./demoResume";

describe("isDemoResume", () => {
  it("returns true only when isDemo is true", () => {
    expect(isDemoResume({ isDemo: true })).toBe(true);
    expect(isDemoResume({ isDemo: false })).toBe(false);
    expect(isDemoResume({ isDemo: null })).toBe(false);
    expect(isDemoResume({})).toBe(false);
    expect(isDemoResume(null)).toBe(false);
    expect(isDemoResume(undefined)).toBe(false);
  });
});

describe("shouldShowDemoResumeTag", () => {
  it("is true for demo users or /demo routes", () => {
    expect(shouldShowDemoResumeTag({ isDemo: true }, "/r/maya-chen")).toBe(true);
    expect(shouldShowDemoResumeTag({ isDemo: false }, "/demo/default")).toBe(true);
    expect(shouldShowDemoResumeTag({ isDemo: false }, "/r/jane-doe")).toBe(false);
  });
});
