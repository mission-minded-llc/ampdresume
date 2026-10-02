import { expect } from "@jest/globals";
import {
  matchesSkillTerm,
  rankCandidatesBySkills,
  selectSurfacedSkills,
  splitSearchMatch,
} from "./candidateSearch";

describe("candidateSearch", () => {
  describe("splitSearchMatch", () => {
    it("marks the matching slice without changing the surrounding text", () => {
      expect(splitSearchMatch("Mathematics", "math")).toEqual([
        { text: "Math", match: true },
        { text: "ematics", match: false },
      ]);
    });

    it("treats the query as plain text", () => {
      expect(splitSearchMatch("C++ and Go", "C++")).toEqual([
        { text: "C++", match: true },
        { text: " and Go", match: false },
      ]);
    });

    it("leaves text unmarked when the query is blank", () => {
      expect(splitSearchMatch("Ada Lovelace", "  ")).toEqual([
        { text: "Ada Lovelace", match: false },
      ]);
    });

    it("marks each comma-separated skill", () => {
      expect(splitSearchMatch("Java and TypeScript", ["Java", "Script"])).toEqual([
        { text: "Java", match: true },
        { text: " and Type", match: false },
        { text: "Script", match: true },
      ]);
    });
  });

  describe("selectSurfacedSkills", () => {
    it("preserves stored order when there is no skill query", () => {
      expect(selectSurfacedSkills(["Go", "Rust"], [], 8)).toEqual(["Go", "Rust"]);
    });

    it("puts searched skills first in the order they were typed", () => {
      expect(
        selectSurfacedSkills(["Writing", "React", "TypeScript"], ["TypeScript", "React"], 8),
      ).toEqual(["TypeScript", "React", "Writing"]);
    });

    it("does not treat a skill fragment inside another word as a match", () => {
      expect(matchesSkillTerm("Bioreactor Design", "React")).toBe(false);
      expect(matchesSkillTerm("React Native", "React")).toBe(true);
      expect(matchesSkillTerm("TypeScript", "Type")).toBe(true);
      expect(selectSurfacedSkills(["Writing", "Bioreactor Design", "React"], ["React"], 8)).toEqual(
        ["React", "Writing", "Bioreactor Design"],
      );
    });
  });

  describe("rankCandidatesBySkills", () => {
    it("prefers more skill matches, then a closer name, then a newer resume", () => {
      const ranked = rankCandidatesBySkills(
        [
          {
            slug: "newer",
            skillNames: ["TypeScript"],
            updatedAt: new Date("2026-03-01"),
          },
          {
            slug: "prefix",
            skillNames: ["React Native", "TypeScript"],
            updatedAt: new Date("2026-02-01"),
          },
          {
            slug: "exact",
            skillNames: ["React", "TypeScript"],
            updatedAt: new Date("2026-01-01"),
          },
        ],
        ["React", "TypeScript"],
      );

      expect(ranked.map((candidate) => candidate.slug)).toEqual(["exact", "prefix", "newer"]);
    });
  });
});
