import { describe, expect, it } from "@jest/globals";
import {
  autoBinCount,
  groupName,
  packSpecsIntoBins,
  specDisplayName,
  specWeight,
} from "./cypressSpecsForShard";

describe("cypressSpecsForShard", () => {
  describe("specWeight", () => {
    it("counts it() and cy.wait() calls", () => {
      expect(specWeight("it('a', () => { cy.wait(500); }); it('b', () => {});")).toBe(3);
    });

    it("is at least 1 for empty files", () => {
      expect(specWeight("")).toBe(1);
    });
  });

  describe("specDisplayName / groupName", () => {
    it("strips the integration prefix and suffix", () => {
      expect(specDisplayName("cypress/integration/account/skills.cy.ts")).toBe("account/skills");
    });

    it("names a single-spec group after that spec", () => {
      expect(groupName(["cypress/integration/account/skills.cy.ts"])).toBe("account/skills");
    });

    it("summarizes multi-spec groups without commas", () => {
      expect(
        groupName([
          "cypress/integration/account/skills.cy.ts",
          "cypress/integration/navigation/homepage.cy.ts",
        ]),
      ).toBe("account/skills + navigation/homepage");
      expect(
        groupName([
          "cypress/integration/a.cy.ts",
          "cypress/integration/b.cy.ts",
          "cypress/integration/c.cy.ts",
        ]),
      ).toBe("a + b + c");
    });
  });

  describe("packSpecsIntoBins", () => {
    const specs = [
      { file: "heavy.cy.ts", name: "heavy", weight: 20 },
      { file: "mid.cy.ts", name: "mid", weight: 8 },
      { file: "a.cy.ts", name: "a", weight: 2 },
      { file: "b.cy.ts", name: "b", weight: 2 },
      { file: "c.cy.ts", name: "c", weight: 2 },
    ];

    it("puts the heaviest spec in its own bin when bin count allows", () => {
      const groups = packSpecsIntoBins(specs, 3);
      expect(groups).toHaveLength(3);
      const heavy = groups.find((group) => group.files.includes("heavy.cy.ts"));
      expect(heavy?.files).toEqual(["heavy.cy.ts"]);
    });

    it("fills lighter bins instead of stacking onto the heavy spec", () => {
      const groups = packSpecsIntoBins(specs, 3);
      const weights = groups.map((group) => group.weight).sort((a, b) => a - b);
      expect(weights[weights.length - 1]).toBe(20);
      expect(weights[0]).toBeGreaterThanOrEqual(6);
    });

    it("rejects invalid bin counts", () => {
      expect(() => packSpecsIntoBins(specs, 0)).toThrow(/binCount/);
    });
  });

  describe("autoBinCount", () => {
    it("creates enough bins that no group exceeds the heaviest spec", () => {
      expect(
        autoBinCount([
          { file: "a", name: "a", weight: 10 },
          { file: "b", name: "b", weight: 10 },
          { file: "c", name: "c", weight: 10 },
          { file: "d", name: "d", weight: 2 },
        ]),
      ).toBe(4);
    });
  });
});
