import { getServerSession } from "next-auth";
import { expect } from "@jest/globals";
import { prisma } from "@/lib/prisma";
import {
  consumeRecruiterSearch,
  getRecruiterAccess,
  parseCandidateSearchInput,
  parseDiscoverableInput,
  parseRecruiterProfileInput,
  resetRecruiterSearchLimit,
  saveRecruiterProfile,
  searchCandidates,
} from "./recruiter";

jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

jest.mock("@/lib/auth", () => ({
  authOptions: {},
}));

jest.mock("@/lib/prisma", () => ({
  prisma: {
    recruiterProfile: {
      findUnique: jest.fn(),
      upsert: jest.fn(),
    },
    user: {
      findMany: jest.fn(),
      update: jest.fn(),
    },
  },
}));

describe("recruiter", () => {
  const mockGetServerSession = getServerSession as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getRecruiterAccess", () => {
    it("rejects a missing session", async () => {
      mockGetServerSession.mockResolvedValue(null);

      await expect(getRecruiterAccess()).resolves.toEqual({
        ok: false,
        status: 401,
        error: "Unauthorized",
      });
    });

    it("returns the user and an empty profile before onboarding", async () => {
      mockGetServerSession.mockResolvedValue({ user: { id: "user-1" } });
      (prisma.recruiterProfile.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(getRecruiterAccess()).resolves.toEqual({
        ok: true,
        userId: "user-1",
        profile: null,
      });
    });
  });

  describe("parseRecruiterProfileInput", () => {
    it("requires a company name", () => {
      expect(parseRecruiterProfileInput({ companyName: "  " })).toEqual({
        error: "Company name is required",
      });
    });

    it("trims fields and treats a blank title as empty", () => {
      expect(parseRecruiterProfileInput({ companyName: " Northwind ", title: "  " })).toEqual({
        companyName: "Northwind",
        title: null,
      });
    });
  });

  describe("saveRecruiterProfile", () => {
    it("upserts the desk on the same user", async () => {
      (prisma.recruiterProfile.upsert as jest.Mock).mockResolvedValue({
        companyName: "Northwind",
        title: "Recruiter",
      });

      await saveRecruiterProfile("user-1", { companyName: "Northwind", title: "Recruiter" });

      expect(prisma.recruiterProfile.upsert).toHaveBeenCalledWith({
        where: { userId: "user-1" },
        create: { userId: "user-1", companyName: "Northwind", title: "Recruiter" },
        update: { companyName: "Northwind", title: "Recruiter" },
        select: { companyName: true, title: true },
      });
    });
  });

  describe("parseDiscoverableInput", () => {
    it("requires a boolean", () => {
      expect(parseDiscoverableInput({ enabled: "yes" })).toEqual({
        error: "enabled must be a boolean",
      });
    });
  });

  describe("parseCandidateSearchInput", () => {
    it("rejects a search with no fields", () => {
      expect(parseCandidateSearchInput({})).toEqual({
        error: "Enter a name, title, location, or skill",
      });
      expect(parseCandidateSearchInput({ query: "  ", location: "", skill: "" })).toEqual({
        error: "Enter a name, title, location, or skill",
      });
    });

    it("rejects a filled field shorter than 3 characters", () => {
      expect(parseCandidateSearchInput({ query: "En" })).toEqual({
        error: "Use at least 3 characters in each search field",
      });
      expect(parseCandidateSearchInput({ query: "Engineer", skill: "JS" })).toEqual({
        error: "Use at least 3 characters in each search field",
      });
      expect(parseCandidateSearchInput({ query: "  Ada " })).toEqual({
        query: "Ada",
        location: "",
        skill: "",
        skills: [],
      });
    });

    it("splits skills on commas and drops blanks and repeats", () => {
      expect(parseCandidateSearchInput({ skill: " TypeScript, React, typescript, " })).toEqual({
        query: "",
        location: "",
        skill: "TypeScript, React, typescript,",
        skills: ["TypeScript", "React"],
      });
    });

    it("rejects a short skill inside a comma-separated list", () => {
      expect(parseCandidateSearchInput({ skill: "React, JS" })).toEqual({
        error: "Use at least 3 characters in each search field",
      });
    });

    it("rejects more than 8 skills", () => {
      expect(
        parseCandidateSearchInput({
          skill: "One, Two, Three, Four, Five, Six, Seven, Eight, Nine",
        }),
      ).toEqual({
        error: "Search up to 8 skills at a time",
      });
    });
  });

  describe("consumeRecruiterSearch", () => {
    beforeEach(() => {
      resetRecruiterSearchLimit();
    });

    it("allows a burst and then asks the user to wait", () => {
      for (let attempt = 0; attempt < 20; attempt += 1) {
        expect(consumeRecruiterSearch("user-1", 1_000)).toEqual({ ok: true });
      }

      expect(consumeRecruiterSearch("user-1", 1_000)).toEqual({
        ok: false,
        error: "Too many searches. Wait a minute and try again.",
      });
      expect(consumeRecruiterSearch("user-2", 1_000)).toEqual({ ok: true });
      expect(consumeRecruiterSearch("user-1", 1_000 + 60_000)).toEqual({ ok: true });
    });
  });

  describe("searchCandidates", () => {
    it("limits the pool to opted-in, non-demo resumes and omits emails", async () => {
      (prisma.user.findMany as jest.Mock).mockResolvedValue([
        {
          slug: "ada",
          name: "Ada Lovelace",
          title: "Engineer",
          location: "London",
          updatedAt: new Date("2026-01-01"),
          skillForUser: [{ skill: { name: "Mathematics" } }],
        },
        {
          slug: null,
          name: "No slug",
          title: null,
          location: null,
          updatedAt: new Date("2026-01-02"),
          skillForUser: [],
        },
      ]);

      const parsed = parseCandidateSearchInput({
        query: "Engineer",
        location: "London",
        skill: "Math",
      });

      if ("error" in parsed) throw new Error(parsed.error);

      const results = await searchCandidates(parsed);

      expect(results).toEqual([
        {
          slug: "ada",
          name: "Ada Lovelace",
          title: "Engineer",
          location: "London",
          skills: ["Mathematics"],
        },
      ]);
      expect(prisma.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            recruiterDiscoverable: true,
            isDemo: false,
            slug: { not: null },
            AND: [
              {
                OR: [
                  { name: { contains: "Engineer", mode: "insensitive" } },
                  { title: { contains: "Engineer", mode: "insensitive" } },
                ],
              },
              { location: { contains: "London", mode: "insensitive" } },
              {
                OR: [
                  {
                    skillForUser: {
                      some: { skill: { name: { contains: "Math", mode: "insensitive" } } },
                    },
                  },
                ],
              },
            ],
          },
          select: {
            slug: true,
            name: true,
            title: true,
            location: true,
            updatedAt: true,
            skillForUser: {
              select: { skill: { select: { name: true } } },
            },
          },
        }),
      );
    });

    it("keeps a matching skill on the card when it sits past the first eight", async () => {
      (prisma.user.findMany as jest.Mock).mockResolvedValue([
        {
          slug: "ada",
          name: "Ada Lovelace",
          title: "Engineer",
          location: "London",
          updatedAt: new Date("2026-01-01"),
          skillForUser: [
            ...Array.from({ length: 8 }, (_, index) => ({ skill: { name: `Skill ${index}` } })),
            { skill: { name: "TypeScript" } },
          ],
        },
      ]);

      const results = await searchCandidates({
        query: "",
        location: "",
        skill: "Type",
        skills: ["Type"],
      });

      expect(results[0]?.skills[0]).toBe("TypeScript");
      expect(results[0]?.skills).toHaveLength(8);
      expect(results[0]?.skills).not.toContain("Skill 7");
    });

    it("returns candidates who match more of the comma-separated skills first", async () => {
      (prisma.user.findMany as jest.Mock).mockResolvedValue([
        {
          slug: "newer",
          name: "Newer Match",
          title: null,
          location: null,
          updatedAt: new Date("2026-04-01"),
          skillForUser: [{ skill: { name: "Bioreactor Design" } }],
        },
        {
          slug: "partial",
          name: "Partial Match",
          title: null,
          location: null,
          updatedAt: new Date("2026-03-01"),
          skillForUser: [{ skill: { name: "TypeScript" } }],
        },
        {
          slug: "closer",
          name: "Closer Match",
          title: null,
          location: null,
          updatedAt: new Date("2026-02-01"),
          skillForUser: [{ skill: { name: "React Native" } }, { skill: { name: "TypeScript" } }],
        },
        {
          slug: "broader",
          name: "Broader Match",
          title: null,
          location: null,
          updatedAt: new Date("2026-01-01"),
          skillForUser: [
            { skill: { name: "Writing" } },
            { skill: { name: "React" } },
            { skill: { name: "TypeScript" } },
          ],
        },
      ]);

      const results = await searchCandidates({
        query: "",
        location: "",
        skill: "React, TypeScript",
        skills: ["React", "TypeScript"],
      });

      expect(results.map((result) => result.slug)).toEqual(["broader", "closer", "partial"]);
      expect(results[0]?.skills.slice(0, 2)).toEqual(["React", "TypeScript"]);
    });
  });
});
