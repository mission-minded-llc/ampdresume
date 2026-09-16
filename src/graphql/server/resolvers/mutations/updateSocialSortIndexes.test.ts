import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";
import { updateSocialSortIndexes } from "./updateSocialSortIndexes";
import { expect } from "@jest/globals";

jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

jest.mock("@/lib/prisma", () => ({
  prisma: {
    social: {
      findMany: jest.fn(),
      update: jest.fn(),
    },
  },
}));

jest.mock("@/lib/auth", () => ({
  authOptions: {},
}));

jest.mock("@/graphql/server/util", () => ({
  verifySessionOwnership: jest.fn(),
}));

describe("updateSocialSortIndexes", () => {
  const socialSortIndexes = [
    { id: "social-1", sortIndex: 1 },
    { id: "social-2", sortIndex: 0 },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("throws an error if the session user is unauthorized", async () => {
    (verifySessionOwnership as jest.Mock).mockRejectedValueOnce(new Error("Unauthorized"));

    await expect(
      updateSocialSortIndexes("", { userId: "user-1", socialSortIndexes }),
    ).rejects.toThrow("Unauthorized");
  });

  it("throws an error if a social is missing", async () => {
    (verifySessionOwnership as jest.Mock).mockResolvedValueOnce(true);
    (prisma.social.findMany as jest.Mock).mockResolvedValueOnce([
      { id: "social-1", userId: "user-1" },
    ]);

    await expect(
      updateSocialSortIndexes("", { userId: "user-1", socialSortIndexes }),
    ).rejects.toThrow("Social not found");
  });

  it("throws an error if the user does not own a social", async () => {
    (verifySessionOwnership as jest.Mock).mockResolvedValueOnce(true);
    (prisma.social.findMany as jest.Mock).mockResolvedValueOnce([
      { id: "social-1", userId: "user-1" },
      { id: "social-2", userId: "other-user" },
    ]);

    await expect(
      updateSocialSortIndexes("", { userId: "user-1", socialSortIndexes }),
    ).rejects.toThrow("Unauthorized: You do not own this social");
  });

  it("updates sort indexes for owned socials", async () => {
    (verifySessionOwnership as jest.Mock).mockResolvedValueOnce(true);
    (prisma.social.findMany as jest.Mock).mockResolvedValueOnce([
      { id: "social-1", userId: "user-1" },
      { id: "social-2", userId: "user-1" },
    ]);
    (prisma.social.update as jest.Mock).mockResolvedValue({});

    const result = await updateSocialSortIndexes("", { userId: "user-1", socialSortIndexes });

    expect(result).toBe(true);
    expect(prisma.social.update).toHaveBeenCalledTimes(2);
    expect(prisma.social.update).toHaveBeenCalledWith({
      where: { id: "social-1" },
      data: { sortIndex: 1 },
    });
    expect(prisma.social.update).toHaveBeenCalledWith({
      where: { id: "social-2" },
      data: { sortIndex: 0 },
    });
  });
});
