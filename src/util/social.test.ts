import { SOCIAL_MEDIA_PLATFORMS } from "@/constants";
import {
  generateSocialUrl,
  getSocialMediaPlatformByPlatformName,
  getSocialPlatformHomepage,
} from "./social";
import { expect, describe, it } from "@jest/globals";

describe("getSocialMediaPlatformByPlatformName", () => {
  it("returns the correct platform object for known platform", () => {
    const result = getSocialMediaPlatformByPlatformName("x");
    expect(result).toEqual(SOCIAL_MEDIA_PLATFORMS["x.com"]);
  });

  it("returns fallback if platform is unknown", () => {
    const result = getSocialMediaPlatformByPlatformName("unknown");
    expect(result).toEqual(SOCIAL_MEDIA_PLATFORMS.website);
  });

  it("handles different casing for platform name", () => {
    const result = getSocialMediaPlatformByPlatformName("X");
    expect(result).toEqual(SOCIAL_MEDIA_PLATFORMS["x.com"]);
  });
});

describe("getSocialPlatformHomepage", () => {
  it("returns the platform origin, not a profile path", () => {
    expect(getSocialPlatformHomepage("github")).toBe("https://github.com");
    expect(getSocialPlatformHomepage("linkedin")).toBe("https://www.linkedin.com");
    expect(getSocialPlatformHomepage("youtube")).toBe("https://www.youtube.com");
    expect(getSocialPlatformHomepage("website")).toBe("https://www.example.com");
  });
});

describe("generateSocialUrl", () => {
  it("uses an absolute ref as the final URL", () => {
    expect(
      generateSocialUrl({
        id: "1",
        userId: "user",
        platform: "github",
        ref: "https://github.com",
        sortIndex: 0,
      }),
    ).toBe("https://github.com");
  });
});
