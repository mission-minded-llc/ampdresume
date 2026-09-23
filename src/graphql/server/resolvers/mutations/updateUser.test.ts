import type { User } from "@prisma/client";
import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";
import { updateUser } from "./updateUser";
import { expect } from "@jest/globals";

jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      update: jest.fn(),
    },
  },
}));

jest.mock("@/graphql/server/util", () => ({
  verifySessionOwnership: jest.fn(),
}));

describe("updateUser", () => {
  const mockUpdate = prisma.user.update as unknown as jest.Mock;
  const mockVerifySessionOwnership = verifySessionOwnership as jest.MockedFunction<
    typeof verifySessionOwnership
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("throws if session ownership verification fails", async () => {
    mockVerifySessionOwnership.mockRejectedValueOnce(new Error("Unauthorized"));

    await expect(updateUser("", { userId: "user-1", webThemeName: "davids" })).rejects.toThrow(
      "Unauthorized",
    );
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it("updates only the web theme when that field is provided", async () => {
    mockVerifySessionOwnership.mockResolvedValueOnce(true);
    mockUpdate.mockResolvedValueOnce({ id: "user-1", webThemeName: "davids" } as User);

    const result = await updateUser("", { userId: "user-1", webThemeName: "davids" });

    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: "user-1" },
      data: { webThemeName: "davids" },
    });
    expect(result).toMatchObject({ webThemeName: "davids" });
  });

  it("updates only the PDF theme when that field is provided", async () => {
    mockVerifySessionOwnership.mockResolvedValueOnce(true);
    mockUpdate.mockResolvedValueOnce({ id: "user-1", pdfThemeName: "default" } as User);

    await updateUser("", { userId: "user-1", pdfThemeName: "default" });

    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: "user-1" },
      data: { pdfThemeName: "default" },
    });
  });

  it("updates web and PDF themes independently in the same request", async () => {
    mockVerifySessionOwnership.mockResolvedValueOnce(true);
    mockUpdate.mockResolvedValueOnce({
      id: "user-1",
      webThemeName: "retro-80s",
      pdfThemeName: "default",
    } as User);

    await updateUser("", {
      userId: "user-1",
      webThemeName: "retro-80s",
      pdfThemeName: "default",
    });

    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: "user-1" },
      data: { webThemeName: "retro-80s", pdfThemeName: "default" },
    });
  });
});
