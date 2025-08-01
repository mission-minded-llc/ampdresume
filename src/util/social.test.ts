import { SOCIAL_MEDIA_PLATFORMS } from "@/constants";

import { getSocialMediaPlatformByPlatformName } from "./social";

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
