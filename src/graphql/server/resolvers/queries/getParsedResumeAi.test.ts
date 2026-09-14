import { expect } from "@jest/globals";
import OpenAI from "openai";
import { prisma } from "@/lib/prisma";
import { verifySessionOwnership } from "../../util";
import { getParsedResumeAi } from "./getParsedResumeAi";

const mockCreate = jest.fn();

jest.mock("openai", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@sentry/node", () => ({
  captureException: jest.fn(),
}));

jest.mock("@/lib/prisma", () => ({
  prisma: {
    skill: {
      findMany: jest.fn(),
    },
  },
}));

jest.mock("../../util", () => ({
  verifySessionOwnership: jest.fn(),
}));

describe("getParsedResumeAi", () => {
  const originalApiKey = process.env.OPENAI_API_KEY;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.OPENAI_API_KEY = "test-key";
    (verifySessionOwnership as jest.Mock).mockResolvedValue(true);
    (OpenAI as unknown as jest.Mock).mockImplementation(() => ({
      chat: {
        completions: {
          create: mockCreate,
        },
      },
    }));
  });

  afterAll(() => {
    process.env.OPENAI_API_KEY = originalApiKey;
  });

  it("throws when the OpenAI API key is missing", async () => {
    delete process.env.OPENAI_API_KEY;

    await expect(getParsedResumeAi("", { userId: "user-1", text: "resume text" })).rejects.toThrow(
      "OpenAI API key is not set.",
    );
  });

  it("maps exhausted OpenAI credits instead of a generic parse error", async () => {
    mockCreate.mockRejectedValue({
      status: 429,
      code: "credit_balance_exhausted",
      error: { type: "insufficient_quota" },
    });

    await expect(getParsedResumeAi("", { userId: "user-1", text: "resume text" })).rejects.toThrow(
      "OpenAI has no credits remaining. Add billing credits to your OpenAI account to use Import PDF.",
    );
    expect(prisma.skill.findMany).not.toHaveBeenCalled();
  });

  it("skips the skill query when no fuzzy-matchable skills are returned", async () => {
    mockCreate.mockResolvedValue({
      choices: [
        {
          message: {
            content: JSON.stringify({
              user: { name: "Jane", displayEmail: "", location: "", title: "Engineer" },
              skills: ["CSS", "HTML"],
              companies: [],
              education: [],
            }),
          },
        },
      ],
    });

    const result = await getParsedResumeAi("", { userId: "user-1", text: "resume text" });

    expect(prisma.skill.findMany).not.toHaveBeenCalled();
    expect(result).toMatchObject({
      user: { name: "Jane", title: "Engineer" },
      skills: [],
      companies: [],
      education: [],
    });
  });

  it("returns fuzzy-matched skills from the database", async () => {
    mockCreate.mockResolvedValue({
      choices: [
        {
          message: {
            content: JSON.stringify({
              user: { name: "Jane", displayEmail: "", location: "", title: "Engineer" },
              skills: ["React", "TypeScript"],
              companies: [],
              education: [],
            }),
          },
        },
      ],
    });
    (prisma.skill.findMany as jest.Mock).mockResolvedValue([{ id: "skill-1", name: "React" }]);

    const result = await getParsedResumeAi("", { userId: "user-1", text: "resume text" });

    expect(prisma.skill.findMany).toHaveBeenCalledWith({
      where: {
        OR: [
          { name: { contains: "React", mode: "insensitive" } },
          { name: { contains: "TypeScript", mode: "insensitive" } },
        ],
      },
      take: 30,
    });
    expect(result.skills).toEqual([{ id: "skill-1", name: "React" }]);
  });
});
