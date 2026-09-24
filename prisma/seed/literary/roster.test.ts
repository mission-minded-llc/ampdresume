import { expect } from "@jest/globals";
import { LITERARY_DEMOS } from "@/constants/literaryDemos";
import { literaryCharacters, RETIRED_LITERARY_SLUGS } from "./characters";
import { validateLiteraryCharacter } from "./validate";

const KEPT_SLUGS = ["sherlock-holmes", "alice", "king-arthur", "robin-hood"];

describe("literary seed roster", () => {
  it("keeps only the four most popular public-domain resumes", () => {
    expect(literaryCharacters.map((character) => character.slug)).toEqual(KEPT_SLUGS);
    expect(literaryCharacters).toHaveLength(4);
  });

  it("tags every profile as a demo resume without social or featured-project links", () => {
    expect(literaryCharacters.every((character) => character.isDemo)).toBe(true);
    expect(literaryCharacters.every((character) => character.socials.length === 0)).toBe(true);
    expect(
      literaryCharacters.every((character) =>
        character.featuredProjects.every((project) => (project.links ?? []).length === 0),
      ),
    ).toBe(true);
  });

  it("validates each character against the skill catalog", () => {
    expect(literaryCharacters.flatMap(validateLiteraryCharacter)).toEqual([]);
  });

  it("does not keep a retired slug on the roster", () => {
    const roster = new Set(literaryCharacters.map((character) => character.slug));
    for (const slug of RETIRED_LITERARY_SLUGS) {
      expect(roster.has(slug)).toBe(false);
    }
  });

  it("matches the homepage literary cards", () => {
    expect(LITERARY_DEMOS.map((demo) => demo.slug)).toEqual(KEPT_SLUGS);
    expect(LITERARY_DEMOS.map((demo) => demo.name)).toEqual(
      literaryCharacters.map((character) => character.name),
    );
  });
});
