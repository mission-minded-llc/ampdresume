import { expect } from "@jest/globals";
import { VERTICALS } from "../../prisma/seed/verticals/types";
import { VERTICAL_DEMO_GROUPS } from "./verticalDemos";

describe("VERTICAL_DEMO_GROUPS", () => {
  it("covers every industry vertical with four unique sample resumes", () => {
    expect(VERTICAL_DEMO_GROUPS).toHaveLength(VERTICALS.length);
    expect(VERTICAL_DEMO_GROUPS.map((group) => group.id)).toEqual(
      VERTICALS.map((group) => group.id),
    );

    const slugs = VERTICAL_DEMO_GROUPS.flatMap((group) =>
      group.resumes.map((resume) => resume.slug),
    );
    expect(slugs).toHaveLength(100);
    expect(new Set(slugs).size).toBe(100);

    for (const group of VERTICAL_DEMO_GROUPS) {
      expect(group.resumes).toHaveLength(4);
      expect(group.label).toBe(VERTICALS.find((vertical) => vertical.id === group.id)?.label);
      expect(group.blurb).toBe(VERTICALS.find((vertical) => vertical.id === group.id)?.blurb);
    }
  });
});
