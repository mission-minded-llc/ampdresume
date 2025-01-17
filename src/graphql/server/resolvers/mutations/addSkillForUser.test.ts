import { addSkillForUser } from "@/graphql/server/resolvers/mutations/addSkillForUser";
import { prisma } from "@/lib/prisma";
import { verifySessionOwnership } from "@/graphql/server/util";

// Mock dependencies
jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

jest.mock("@/lib/prisma", () => ({
  prisma: {
    skillForUser: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock("@/lib/auth", () => ({
  authOptions: {},
}));

jest.mock("@/app/api/graphql/util", () => ({
  verifySessionOwnership: jest.fn(),
}));

describe("addSkillForUser", () => {
  it("throws an error if user is unauthorized", async () => {
    (verifySessionOwnership as jest.Mock).mockRejectedValueOnce(new Error("Unauthorized"));
    await expect(
      addSkillForUser("", { userId: "1", skillId: "2", yearStarted: 2020, totalYears: 3 }),
    ).rejects.toThrow("Unauthorized");
  });

  it("returns existing skill if skill is already recorded for user", async () => {
    (verifySessionOwnership as jest.Mock).mockResolvedValueOnce(true);
    (prisma.skillForUser.findFirst as jest.Mock).mockResolvedValueOnce({ id: "existing-skill" });
    const result = await addSkillForUser("", {
      userId: "1",
      skillId: "2",
      yearStarted: 2020,
      totalYears: 3,
    });
    expect(result).toEqual({ id: "existing-skill" });
    expect(prisma.skillForUser.create).not.toHaveBeenCalled();
  });

  it("creates a new skill for user if skill does not already exist", async () => {
    (verifySessionOwnership as jest.Mock).mockResolvedValueOnce(true);
    (prisma.skillForUser.findFirst as jest.Mock).mockResolvedValueOnce(null);
    (prisma.skillForUser.create as jest.Mock).mockResolvedValueOnce({
      id: "new-skill",
      skill: { name: "Test Skill" },
    });
    const result = await addSkillForUser("", {
      userId: "1",
      skillId: "2",
      yearStarted: 2020,
      totalYears: 3,
    });
    expect(result).toMatchObject({ id: "new-skill", skill: { name: "Test Skill" } });
    expect(prisma.skillForUser.create).toHaveBeenCalledWith({
      data: {
        userId: "1",
        skillId: "2",
        yearStarted: 2020,
        totalYears: 3,
      },
      include: { skill: true },
    });
  });
});
