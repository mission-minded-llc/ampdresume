import { getSession } from "@/lib/auth";
import { isFeatureEnabledForUser } from "./featureFlags";
import { expect } from "@jest/globals";

// Mock the auth module
jest.mock("@/lib/auth", () => ({
  getSession: jest.fn(),
}));

describe("featureFlags", () => {
  const mockGetSession = getSession as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("isFeatureEnabledForUser", () => {
    it("should return false when session is null", async () => {
      mockGetSession.mockResolvedValue(null);

      const result = await isFeatureEnabledForUser("ai_assist");

      expect(result).toBe(false);
      expect(mockGetSession).toHaveBeenCalledTimes(1);
    });

    it("should return false when session exists but user is missing", async () => {
      mockGetSession.mockResolvedValue({
        expires: new Date().toISOString(),
      });

      const result = await isFeatureEnabledForUser("ai_assist");

      expect(result).toBe(false);
    });

    it("should return false when session exists but user.email is missing", async () => {
      mockGetSession.mockResolvedValue({
        user: {
          name: "Test User",
        },
        expires: new Date().toISOString(),
      });

      const result = await isFeatureEnabledForUser("ai_assist");

      expect(result).toBe(false);
    });

    it("should return false when user email is not in the allowed list", async () => {
      mockGetSession.mockResolvedValue({
        user: {
          email: "unauthorized@example.com",
          name: "Test User",
        },
        expires: new Date().toISOString(),
      });

      const result = await isFeatureEnabledForUser("ai_assist");

      expect(result).toBe(false);
    });
  });
});
