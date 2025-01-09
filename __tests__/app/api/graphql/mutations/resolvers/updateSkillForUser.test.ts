import { prisma } from "@/lib/prisma";
import { updateSkillForUser } from "@/app/api/graphql/mutations/resolvers/updateSkillForUser";
import { verifySessionOwnership } from "@/app/api/graphql/util";

jest.mock("@/lib/prisma", () => ({
  prisma: {
    skillForUser: {
      findFirst: jest.fn(),
      update: jest.fn(),
    },
  },
}));

jest.mock("@/app/api/graphql/util", () => ({
  verifySessionOwnership: jest.fn(),
}));

describe("updateSkillForUser", () => {
  it("throws an error if user is unauthorized for session", async () => {
    (verifySessionOwnership as jest.Mock).mockResolvedValueOnce(false);
    await expect(
      updateSkillForUser("", {
        id: "skill-id",
        userId: "user-id",
        yearStarted: 2020,
        totalYears: 3,
        description: "Test description",
        icon: "icon",
      }),
    ).rejects.toThrow("Unauthorized");
  });

  it("throws an error if user is not authorized to edit this skill", async () => {
    (verifySessionOwnership as jest.Mock).mockResolvedValueOnce(true);
    (prisma.skillForUser.findFirst as jest.Mock).mockResolvedValueOnce({
      id: "skill-for-user-id",
      userId: "user-id-other",
    });

    (prisma.skillForUser.update as jest.Mock).mockResolvedValueOnce({
      id: "skill-for-user-id",
      userId: "user-id",
      yearStarted: 2020,
      totalYears: 3,
      description: "New description",
      skill: { name: "Sample Skill" },
    });

    await expect(
      updateSkillForUser("", {
        id: "skill-id",
        userId: "user-id",
        yearStarted: 2020,
        totalYears: 3,
        description: "Test description",
        icon: "icon",
      }),
    ).rejects.toThrow("Unauthorized: User does not own this skill");
  });

  it("updates skill if user is authorized", async () => {
    (verifySessionOwnership as jest.Mock).mockResolvedValueOnce(true);
    (prisma.skillForUser.findFirst as jest.Mock).mockResolvedValueOnce({
      id: "skill-for-user-id",
      userId: "user-id",
    });

    (prisma.skillForUser.update as jest.Mock).mockResolvedValueOnce({
      id: "skill-for-user-id",
      userId: "user-id",
      yearStarted: 2020,
      totalYears: 3,
      description: "New description",
      skill: { name: "Sample Skill" },
    });

    const result = await updateSkillForUser("", {
      id: "skill-id",
      userId: "user-id",
      yearStarted: 2020,
      totalYears: 3,
      description: "New description",
      icon: "icon",
    });

    expect(result).toMatchObject({
      id: "skill-for-user-id",
      description: "New description",
      skill: { name: "Sample Skill" },
    });
    expect(prisma.skillForUser.update).toHaveBeenCalledWith({
      where: { id: "skill-id" },
      data: {
        userId: "user-id",
        description: "New description",
        yearStarted: 2020,
        totalYears: 3,
        icon: "icon",
      },
      include: { skill: true },
    });
  });
});
