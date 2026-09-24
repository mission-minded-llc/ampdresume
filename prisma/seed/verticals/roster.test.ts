import { expect } from "@jest/globals";
import { verticalProfiles } from "./profiles";
import { VERTICAL_IDS, VERTICALS } from "./types";
import { validateVerticalProfile, validateVerticalRoster } from "./validate";

describe("industry-vertical seed roster", () => {
  it("covers 25 verticals with four unique resumes each", () => {
    expect(VERTICALS).toHaveLength(25);
    expect(VERTICAL_IDS).toHaveLength(25);
    expect(verticalProfiles).toHaveLength(100);
    expect(validateVerticalRoster(verticalProfiles)).toEqual([]);
  });

  it("tags every profile as a demo resume", () => {
    expect(verticalProfiles.every((profile) => profile.isDemo)).toBe(true);
  });

  it("omits social and featured-project links from demo profiles", () => {
    expect(verticalProfiles.every((profile) => profile.socials.length === 0)).toBe(true);
    expect(
      verticalProfiles.every((profile) =>
        profile.featuredProjects.every((project) => (project.links ?? []).length === 0),
      ),
    ).toBe(true);
  });

  it("includes every supported resume section on each profile", () => {
    const errors = verticalProfiles.flatMap(validateVerticalProfile);
    expect(errors).toEqual([]);
  });

  it("keeps two women and two men in every vertical", () => {
    for (const vertical of VERTICAL_IDS) {
      const group = verticalProfiles.filter((profile) => profile.vertical === vertical);
      expect(group.filter((profile) => profile.gender === "woman")).toHaveLength(2);
      expect(group.filter((profile) => profile.gender === "man")).toHaveLength(2);
    }
  });
});
