import { expect } from "@jest/globals";
import { generateSocialUrl, getSocialPlatformHomepage } from "@/util/social";
import { getDemoPlaceholderSocials, resolveThemeSocials } from "./demoSocials";

const user = { id: "user-maya", name: "Maya Chen", isDemo: true };

describe("getDemoPlaceholderSocials", () => {
  it("returns a stable randomized set for the same user", () => {
    expect(getDemoPlaceholderSocials(user)).toEqual(getDemoPlaceholderSocials(user));
  });

  it("varies platforms across users and links to each platform homepage", () => {
    const other = getDemoPlaceholderSocials({ id: "user-helena", name: "Helena Voss" });
    const maya = getDemoPlaceholderSocials(user);

    expect(maya.length).toBeGreaterThanOrEqual(3);
    expect(maya.length).toBeLessThanOrEqual(5);
    expect(maya.map((social) => social.platform).join(",")).not.toEqual(
      other.map((social) => social.platform).join(","),
    );
    expect(
      maya.every((social) => {
        const homepage = getSocialPlatformHomepage(social.platform);
        return social.ref === homepage && generateSocialUrl(social) === homepage;
      }),
    ).toBe(true);
  });
});

describe("resolveThemeSocials", () => {
  const stored = [
    {
      id: "stored",
      userId: user.id,
      platform: "github",
      ref: "maya-chen",
      sortIndex: 0,
    },
  ];

  it("replaces stored socials for demo users", () => {
    const socials = resolveThemeSocials(user, stored);
    expect(socials).toEqual(getDemoPlaceholderSocials(user));
    expect(socials.some((social) => social.ref === "maya-chen")).toBe(false);
  });

  it("keeps stored socials for real users", () => {
    expect(resolveThemeSocials({ ...user, isDemo: false }, stored)).toEqual(stored);
  });
});
