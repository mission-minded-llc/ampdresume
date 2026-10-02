import { expect } from "@jest/globals";
import { selectSurfacedSkills, splitSearchMatch } from "./candidateSearch";

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
  });

  describe("selectSurfacedSkills", () => {
    it("preserves stored order when there is no skill query", () => {
      expect(selectSurfacedSkills(["Go", "Rust"], "", 8)).toEqual(["Go", "Rust"]);
    });
  });
});
