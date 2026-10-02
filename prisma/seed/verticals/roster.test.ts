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

  it("opens each industry on the theme that fits that category", () => {
    const themes = new Map<string, { webThemeName?: string; pdfThemeName?: string }>();

    for (const profile of verticalProfiles) {
      const previous = themes.get(profile.vertical);
      if (!previous) {
        themes.set(profile.vertical, {
          webThemeName: profile.webThemeName,
          pdfThemeName: profile.pdfThemeName,
        });
        continue;
      }

      expect(profile.webThemeName).toBe(previous.webThemeName);
      expect(profile.pdfThemeName).toBe(previous.pdfThemeName);
    }

    expect(Object.fromEntries(themes)).toEqual({
      "software-technology": { webThemeName: "default", pdfThemeName: "default" },
      "investment-banking": { webThemeName: "default", pdfThemeName: "times" },
      "management-consulting": { webThemeName: "default", pdfThemeName: "times" },
      "commercial-banking": { webThemeName: "default", pdfThemeName: "times" },
      healthcare: { webThemeName: "default", pdfThemeName: "times" },
      pharmaceuticals: { webThemeName: "default", pdfThemeName: "times" },
      "federal-public-sector": { webThemeName: "default", pdfThemeName: "times" },
      "aerospace-defense": { webThemeName: "default", pdfThemeName: "times" },
      "legal-services": { webThemeName: "legal", pdfThemeName: "legal" },
      "accounting-audit": { webThemeName: "default", pdfThemeName: "times" },
      insurance: { webThemeName: "default", pdfThemeName: "times" },
      cybersecurity: { webThemeName: "default", pdfThemeName: "default" },
      "professional-engineering": { webThemeName: "default", pdfThemeName: "times" },
      "energy-utilities": { webThemeName: "default", pdfThemeName: "times" },
      telecommunications: { webThemeName: "default", pdfThemeName: "default" },
      manufacturing: { webThemeName: "default", pdfThemeName: "default" },
      "supply-chain": { webThemeName: "default", pdfThemeName: "default" },
      "human-resources": { webThemeName: "default", pdfThemeName: "default" },
      "corporate-marketing": { webThemeName: "default", pdfThemeName: "default" },
      "enterprise-sales": { webThemeName: "default", pdfThemeName: "default" },
      "higher-education": { webThemeName: "default", pdfThemeName: "times" },
      architecture: { webThemeName: "default", pdfThemeName: "times" },
      "commercial-real-estate": { webThemeName: "default", pdfThemeName: "times" },
      nonprofit: { webThemeName: "default", pdfThemeName: "times" },
      "airlines-aviation": { webThemeName: "default", pdfThemeName: "default" },
    });
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
