import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isFeatureEnabledForUser, setFeatureEnabledForUser } from "./featureFlags";
import { expect } from "@jest/globals";

jest.mock("@/lib/auth", () => ({
  getSession: jest.fn(),
}));

jest.mock("@/lib/prisma", () => ({
  prisma: {
    feature: {
      findUnique: jest.fn(),
      upsert: jest.fn(),
    },
  },
}));

describe("featureFlags", () => {
  const mockGetSession = getSession as jest.Mock;
  const mockFindUnique = prisma.feature.findUnique as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("isFeatureEnabledForUser", () => {
    it("should return false when session is null", async () => {
      mockGetSession.mockResolvedValue(null);

      const result = await isFeatureEnabledForUser("ai_assist");

      expect(result).toBe(false);
      expect(mockGetSession).toHaveBeenCalledTimes(1);
      expect(mockFindUnique).not.toHaveBeenCalled();
    });

    it("should return false when session exists but user is missing", async () => {
      mockGetSession.mockResolvedValue({
        expires: new Date().toISOString(),
      });

      const result = await isFeatureEnabledForUser("ai_assist");

      expect(result).toBe(false);
      expect(mockFindUnique).not.toHaveBeenCalled();
    });

    it("should return false when session exists but user.id is missing", async () => {
      mockGetSession.mockResolvedValue({
        user: {
          email: "user@example.com",
          name: "Test User",
        },
        expires: new Date().toISOString(),
      });

      const result = await isFeatureEnabledForUser("ai_assist");

      expect(result).toBe(false);
      expect(mockFindUnique).not.toHaveBeenCalled();
    });

    it("should return false when no Feature row exists", async () => {
      mockGetSession.mockResolvedValue({
        user: {
          id: "user-1",
          email: "user@example.com",
          name: "Test User",
        },
        expires: new Date().toISOString(),
      });
      mockFindUnique.mockResolvedValue(null);

      const result = await isFeatureEnabledForUser("ai_assist");

      expect(result).toBe(false);
      expect(mockFindUnique).toHaveBeenCalledWith({
        where: {
          userId_name: { userId: "user-1", name: "ai_assist" },
        },
      });
    });

    it("should return false when Feature row exists but enabled is false", async () => {
      mockGetSession.mockResolvedValue({
        user: {
          id: "user-1",
          email: "user@example.com",
          name: "Test User",
        },
        expires: new Date().toISOString(),
      });
      mockFindUnique.mockResolvedValue({
        id: "f1",
        name: "ai_assist",
        userId: "user-1",
        enabled: false,
      });

      const result = await isFeatureEnabledForUser("ai_assist");

      expect(result).toBe(false);
    });

    it("should return true when Feature row exists and enabled is true", async () => {
      mockGetSession.mockResolvedValue({
        user: {
          id: "user-1",
          email: "user@example.com",
          name: "Test User",
        },
        expires: new Date().toISOString(),
      });
      mockFindUnique.mockResolvedValue({
        id: "f1",
        name: "ai_assist",
        userId: "user-1",
        enabled: true,
      });

      const result = await isFeatureEnabledForUser("ai_assist");

      expect(result).toBe(true);
    });
  });

  describe("setFeatureEnabledForUser", () => {
    const mockUpsert = prisma.feature.upsert as jest.Mock;

    it("should return false when no session user id is available", async () => {
      mockGetSession.mockResolvedValue(null);

      const result = await setFeatureEnabledForUser("onboarding_pending", true);

      expect(result).toBe(false);
      expect(mockUpsert).not.toHaveBeenCalled();
    });

    it("should upsert the flag for the session user", async () => {
      mockGetSession.mockResolvedValue({
        user: { id: "user-1" },
        expires: new Date().toISOString(),
      });
      mockUpsert.mockResolvedValue({
        id: "f1",
        name: "onboarding_pending",
        userId: "user-1",
        enabled: true,
      });

      const result = await setFeatureEnabledForUser("onboarding_pending", true);

      expect(result).toBe(true);
      expect(mockUpsert).toHaveBeenCalledWith({
        where: { userId_name: { userId: "user-1", name: "onboarding_pending" } },
        create: { userId: "user-1", name: "onboarding_pending", enabled: true },
        update: { enabled: true },
      });
    });

    it("should upsert the flag for an explicit user id", async () => {
      mockUpsert.mockResolvedValue({});

      await setFeatureEnabledForUser("onboarding_pending", false, "user-9");

      expect(mockUpsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { userId_name: { userId: "user-9", name: "onboarding_pending" } },
          update: { enabled: false },
        }),
      );
    });
  });
});
