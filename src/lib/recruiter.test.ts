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
          skillForUser: [{ skill: { name: "Mathematics" } }],
        },
        {
          slug: null,
          name: "No slug",
          title: null,
          location: null,
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
                skillForUser: {
                  some: { skill: { name: { contains: "Math", mode: "insensitive" } } },
                },
              },
            ],
          },
          select: {
            slug: true,
            name: true,
            title: true,
            location: true,
            skillForUser: {
              take: 8,
              select: { skill: { select: { name: true } } },
            },
          },
        }),
      );
    });
  });
});
