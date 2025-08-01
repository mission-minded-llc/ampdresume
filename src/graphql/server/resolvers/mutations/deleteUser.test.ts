import type { User } from "@prisma/client";

import { verifySessionOwnership } from "@/graphql/server/util";
import { prisma } from "@/lib/prisma";

import { deleteUser } from "./deleteUser";

// Mock dependencies
jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      delete: jest.fn(),
    },
  },
}));

jest.mock("@/graphql/server/util", () => ({
  verifySessionOwnership: jest.fn(),
}));

describe("deleteUser", () => {
  const mockPrisma = prisma as jest.Mocked<typeof prisma>;
  const mockVerifySessionOwnership = verifySessionOwnership as jest.MockedFunction<
    typeof verifySessionOwnership
  >;
  const mockDelete = prisma.user.delete as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delete user successfully", async () => {
    const userId = "test-user-id";
    mockVerifySessionOwnership.mockResolvedValue(true);
    mockDelete.mockResolvedValue({ id: userId } as User);

    const result = await deleteUser("", { userId });

    expect(mockVerifySessionOwnership).toHaveBeenCalledWith(userId);
    expect(mockPrisma.user.delete).toHaveBeenCalledWith({
      where: {
        id: userId,
      },
    });
    expect(result).toBe(true);
  });

  it("should throw error if session ownership verification fails", async () => {
    const userId = "test-user-id";
    const errorMessage = "Unauthorized";
    mockVerifySessionOwnership.mockRejectedValue(new Error(errorMessage));

    await expect(deleteUser("", { userId })).rejects.toThrow(errorMessage);

    expect(mockVerifySessionOwnership).toHaveBeenCalledWith(userId);
    expect(mockPrisma.user.delete).not.toHaveBeenCalled();
  });

  it("should throw error if user deletion fails", async () => {
    const userId = "test-user-id";
    const errorMessage = "User not found";
    mockVerifySessionOwnership.mockResolvedValue(true);
    mockDelete.mockRejectedValue(new Error(errorMessage));

    await expect(deleteUser("", { userId })).rejects.toThrow(errorMessage);

    expect(mockVerifySessionOwnership).toHaveBeenCalledWith(userId);
    expect(mockPrisma.user.delete).toHaveBeenCalledWith({
      where: {
        id: userId,
      },
    });
  });
});
