import { publicResumeDataCacheTag } from "@/lib/publicResumeDataCacheTag";
import { expect, describe, it } from "@jest/globals";

describe("publicResumeDataCacheTag", () => {
  it("prefixes a short slug", () => {
    expect(publicResumeDataCacheTag("taylor")).toBe("public-resume:taylor");
  });

  it("keeps tags at or below 256 characters", () => {
    const longSlug = "a".repeat(300);
    const tag = publicResumeDataCacheTag(longSlug);

    expect(tag.startsWith("public-resume:")).toBe(true);
    expect(tag.length).toBe(256);
    expect(tag).toBe(`public-resume:${"a".repeat(256 - "public-resume:".length)}`);
  });
});
