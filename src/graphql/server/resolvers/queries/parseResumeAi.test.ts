import { expect } from "@jest/globals";
import {
  getParseResumeErrorMessage,
  getSkillNamesForFuzzyMatch,
  normalizeParsedResume,
} from "./parseResumeAi";

describe("getSkillNamesForFuzzyMatch", () => {
  it("returns empty array for missing or non-array skills", () => {
    expect(getSkillNamesForFuzzyMatch(undefined)).toEqual([]);
    expect(getSkillNamesForFuzzyMatch("React")).toEqual([]);
  });

  it("keeps only trimmed skill names longer than 4 characters", () => {
    expect(getSkillNamesForFuzzyMatch(["CSS", "HTML", "React", "  Java  ", "TypeScript"])).toEqual([
      "React",
      "TypeScript",
    ]);
  });

  it("reads name from skill objects", () => {
    expect(getSkillNamesForFuzzyMatch([{ name: "React" }, { name: "Go" }])).toEqual(["React"]);
  });
});

describe("normalizeParsedResume", () => {
  it("fills missing arrays and user fields", () => {
    expect(normalizeParsedResume({})).toEqual({
      user: {
        name: "",
        displayEmail: "",
        location: "",
        title: "",
        summary: "",
        summaryTitle: "",
      },
      companies: [],
      education: [],
    });
  });

  it("normalizes nested company positions and projects", () => {
    expect(
      normalizeParsedResume({
        user: { name: "Jane", summary: "Builder of systems.", summaryTitle: "About Me" },
        companies: [
          { name: "Acme", positions: [{ title: "Engineer", projects: [{ name: "API" }] }] },
        ],
        education: [{ school: "State", degree: "BS" }],
      }),
    ).toEqual({
      user: {
        name: "Jane",
        displayEmail: "",
        location: "",
        title: "",
        summary: "Builder of systems.",
        summaryTitle: "About Me",
      },
      companies: [
        {
          name: "Acme",
          location: null,
          startDate: "",
          endDate: null,
          positions: [
            {
              title: "Engineer",
              startDate: "",
              endDate: null,
              projects: [{ name: "API" }],
            },
          ],
        },
      ],
      education: [{ school: "State", degree: "BS", dateAwarded: "" }],
    });
  });
});

describe("getParseResumeErrorMessage", () => {
  it("maps exhausted OpenAI credits", () => {
    expect(
      getParseResumeErrorMessage({
        status: 429,
        code: "credit_balance_exhausted",
        error: { type: "insufficient_quota" },
      }),
    ).toBe(
      "OpenAI has no credits remaining. Add billing credits to your OpenAI account to use Import PDF.",
    );
  });

  it("maps generic rate limits", () => {
    expect(getParseResumeErrorMessage({ status: 429 })).toBe(
      "OpenAI rate limit reached. Please wait and try again.",
    );
  });

  it("maps invalid API keys", () => {
    expect(getParseResumeErrorMessage({ status: 401 })).toBe("OpenAI API key is invalid.");
  });

  it("falls back to a generic parse error", () => {
    expect(getParseResumeErrorMessage(new Error("boom"))).toBe("Failed to parse resume text");
  });
});
