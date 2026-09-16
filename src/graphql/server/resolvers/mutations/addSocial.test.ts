import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";
import { addSocial } from "./addSocial";
import { expect } from "@jest/globals";

jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

jest.mock("@/lib/prisma", () => ({
  prisma: {
    social: {
      aggregate: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock("@/lib/auth", () => ({
  authOptions: {},
}));

jest.mock("@/graphql/server/util", () => ({
  verifySessionOwnership: jest.fn(),
}));

describe("addSocial", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("throws an error if the session user is unauthorized", async () => {
    (verifySessionOwnership as jest.Mock).mockRejectedValueOnce(new Error("Unauthorized"));

    await expect(
      addSocial("", { userId: "user-1", platform: "github", ref: "johndoe" }),
    ).rejects.toThrow("Unauthorized");
  });

  it("creates a social with sortIndex 0 when the user has none", async () => {
    (verifySessionOwnership as jest.Mock).mockResolvedValueOnce(true);
    (prisma.social.aggregate as jest.Mock).mockResolvedValueOnce({ _max: { sortIndex: null } });
    (prisma.social.create as jest.Mock).mockResolvedValueOnce({
      id: "social-1",
      platform: "github",
      ref: "johndoe",
      sortIndex: 0,
    });

    const result = await addSocial("", {
      userId: "user-1",
      platform: "github",
      ref: "johndoe",
    });

    expect(result).toMatchObject({ id: "social-1", sortIndex: 0 });
    expect(prisma.social.create).toHaveBeenCalledWith({
      data: {
        userId: "user-1",
        platform: "github",
        ref: "johndoe",
        sortIndex: 0,
      },
    });
  });

  it("appends a social after the current max sortIndex", async () => {
    (verifySessionOwnership as jest.Mock).mockResolvedValueOnce(true);
    (prisma.social.aggregate as jest.Mock).mockResolvedValueOnce({ _max: { sortIndex: 2 } });
    (prisma.social.create as jest.Mock).mockResolvedValueOnce({
      id: "social-4",
      sortIndex: 3,
    });

    await addSocial("", { userId: "user-1", platform: "x", ref: "johndoe" });

    expect(prisma.social.create).toHaveBeenCalledWith({
      data: {
        userId: "user-1",
        platform: "x",
        ref: "johndoe",
        sortIndex: 3,
      },
    });
  });
});
