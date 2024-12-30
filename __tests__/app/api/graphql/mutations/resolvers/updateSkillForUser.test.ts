import { prisma } from "@/lib/prisma";
import { updateSkillForUser } from "@/app/api/graphql/mutations/resolvers/updateSkillForUser";
import { verifySessionOwnership } from "@/app/api/graphql/util";

jest.mock("@/lib/prisma", () => ({
  prisma: {
    skillForUser: {
      update: jest.fn(),
    },
  },
}));

jest.mock("@/app/api/graphql/util", () => ({
  verifySessionOwnership: jest.fn(),
}));

describe("updateSkillForUser", () => {
  it("throws an error if user is unauthorized", async () => {
    (verifySessionOwnership as jest.Mock).mockResolvedValueOnce(false);
    await expect(
      updateSkillForUser("", {
        id: "skill-id",
        userId: "user-id",
        yearStarted: 2020,
        totalYears: 3,
        description: "Test description",
      }),
    ).rejects.toThrow("Unauthorized");
  });

  it("updates skill if user is authorized", async () => {
    (verifySessionOwnership as jest.Mock).mockResolvedValueOnce(true);
    (prisma.skillForUser.update as jest.Mock).mockResolvedValueOnce({
      id: "skill-id",
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
    });

    expect(result).toMatchObject({
      id: "skill-id",
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
      },
      include: { skill: true },
    });
  });
});
