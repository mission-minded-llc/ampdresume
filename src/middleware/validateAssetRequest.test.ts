import { getServerSession } from "next-auth";
import type { NextRequest } from "next/server";
import { handleAssetRequest } from "./validateAssetRequest";
import { objectExists } from "@/lib/s3";
import { expect } from "@jest/globals";

// Mock Next.js server components - need to mock before importing the module under test
jest.mock("next/server", () => {
  return {
    NextRequest: jest.fn(),
    NextResponse: {
      json: jest.fn((body: any, init?: { status?: number }) => {
        return {
          json: jest.fn().mockResolvedValue(body),
          status: init?.status || 200,
        };
      }),
    },
  };
});

// Mock dependencies
jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

jest.mock("@/lib/s3", () => ({
  objectExists: jest.fn(),
}));

jest.mock("@/lib/auth", () => ({
  authOptions: {},
}));

describe("handleAssetRequest", () => {
  const mockGetServerSession = getServerSession as jest.Mock;
  const mockObjectExists = objectExists as jest.Mock;
  const mockAction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.AWS_S3_BUCKET_NAME = "test-bucket.com";
    mockAction.mockResolvedValue(undefined);
  });

  const createMockRequest = (body: any): NextRequest => {
    return {
      json: jest.fn().mockResolvedValue(body),
      body: body ? {} : null, // Mock body as object when present, null when absent
    } as unknown as NextRequest;
  };

  describe("authentication", () => {
    it("should return 401 when user is not authenticated", async () => {
      mockGetServerSession.mockResolvedValue(null);

      const req = createMockRequest({
        src: "https://test-bucket.com/assets/user/user123/file.jpg",
      });
      const result = await handleAssetRequest(req, mockAction);

      expect(result.status).toBe(401);
      expect(await result.json()).toEqual({ error: "Unauthorized" });
      expect(mockAction).not.toHaveBeenCalled();
    });

    it("should return 401 when session exists but user is missing", async () => {
      mockGetServerSession.mockResolvedValue({});

      const req = createMockRequest({
        src: "https://test-bucket.com/assets/user/user123/file.jpg",
      });
      const result = await handleAssetRequest(req, mockAction);

      expect(result.status).toBe(401);
      expect(await result.json()).toEqual({ error: "Unauthorized" });
      expect(mockAction).not.toHaveBeenCalled();
    });
  });

  describe("request body validation", () => {
    it("should return 400 when request body is missing", async () => {
      mockGetServerSession.mockResolvedValue({
        user: { id: "user123" },
      });

      const req = {
        json: jest.fn().mockResolvedValue({}),
        body: null,
      } as unknown as NextRequest;

      const result = await handleAssetRequest(req, mockAction);

      expect(result.status).toBe(400);
      expect(await result.json()).toEqual({ error: "No body" });
      expect(mockAction).not.toHaveBeenCalled();
    });

    it("should return 400 when src is missing from body", async () => {
      mockGetServerSession.mockResolvedValue({
        user: { id: "user123" },
      });

      const req = createMockRequest({});
      const result = await handleAssetRequest(req, mockAction);

      expect(result.status).toBe(400);
      expect(await result.json()).toEqual({ error: "src is required" });
      expect(mockAction).not.toHaveBeenCalled();
    });
  });

  describe("URL validation", () => {
    beforeEach(() => {
      mockGetServerSession.mockResolvedValue({
        user: { id: "user123" },
      });
    });

    it("should return 400 when src does not start with https://", async () => {
      const req = createMockRequest({ src: "http://test-bucket.com/assets/user/user123/file.jpg" });
      const result = await handleAssetRequest(req, mockAction);

      expect(result.status).toBe(400);
      expect(await result.json()).toEqual({ error: "src must be an absolute URL" });
      expect(mockAction).not.toHaveBeenCalled();
    });

    it("should return 400 when src does not start with bucket URL", async () => {
      const req = createMockRequest({
        src: "https://other-bucket.com/assets/user/user123/file.jpg",
      });
      const result = await handleAssetRequest(req, mockAction);

      expect(result.status).toBe(400);
      expect(await result.json()).toEqual({
        error: "src must be an absolute URL to the user's asset",
      });
      expect(mockAction).not.toHaveBeenCalled();
    });
  });

  describe("authorization", () => {
    beforeEach(() => {
      mockGetServerSession.mockResolvedValue({
        user: { id: "user123" },
      });
      mockObjectExists.mockResolvedValue(true);
    });

    it("should return 401 when user ID does not match session user ID", async () => {
      const req = createMockRequest({
        src: "https://test-bucket.com/assets/user/user456/file.jpg",
      });
      const result = await handleAssetRequest(req, mockAction);

      expect(result.status).toBe(401);
      expect(await result.json()).toEqual({ error: "Unauthorized" });
      expect(mockAction).not.toHaveBeenCalled();
    });

    it("should allow access when user ID matches session user ID", async () => {
      const req = createMockRequest({
        src: "https://test-bucket.com/assets/user/user123/file.jpg",
      });
      const result = await handleAssetRequest(req, mockAction);

      expect(result.status).toBe(200);
      expect(await result.json()).toEqual({
        success: true,
        path: "assets/user/user123/file.jpg",
      });
      expect(mockAction).toHaveBeenCalledWith("assets/user/user123/file.jpg");
    });
  });

  describe("file existence", () => {
    beforeEach(() => {
      mockGetServerSession.mockResolvedValue({
        user: { id: "user123" },
      });
    });

    it("should return 404 when file does not exist", async () => {
      mockObjectExists.mockResolvedValue(false);

      const req = createMockRequest({
        src: "https://test-bucket.com/assets/user/user123/file.jpg",
      });
      const result = await handleAssetRequest(req, mockAction);

      expect(result.status).toBe(404);
      expect(await result.json()).toEqual({ error: "File not found" });
      expect(mockAction).not.toHaveBeenCalled();
    });

    it("should proceed when file exists", async () => {
      mockObjectExists.mockResolvedValue(true);

      const req = createMockRequest({
        src: "https://test-bucket.com/assets/user/user123/file.jpg",
      });
      const result = await handleAssetRequest(req, mockAction);

      expect(result.status).toBe(200);
      expect(mockAction).toHaveBeenCalled();
    });
  });

  describe("URL decoding", () => {
    beforeEach(() => {
      mockGetServerSession.mockResolvedValue({
        user: { id: "user123" },
      });
      mockObjectExists.mockResolvedValue(true);
    });

    it("should decode URL-encoded paths", async () => {
      const encodedPath = "assets/user/user123/file%20with%20spaces.jpg";
      const req = createMockRequest({
        src: `https://test-bucket.com/${encodedPath}`,
      });
      const result = await handleAssetRequest(req, mockAction);

      expect(result.status).toBe(200);
      expect(mockAction).toHaveBeenCalledWith("assets/user/user123/file with spaces.jpg");
    });

    it("should handle special characters in paths", async () => {
      const encodedPath = "assets/user/user123/file%2Btest%40example.jpg";
      const req = createMockRequest({
        src: `https://test-bucket.com/${encodedPath}`,
      });
      const result = await handleAssetRequest(req, mockAction);

      expect(result.status).toBe(200);
      expect(mockAction).toHaveBeenCalledWith("assets/user/user123/file+test@example.jpg");
    });
  });

  describe("successful execution", () => {
    beforeEach(() => {
      mockGetServerSession.mockResolvedValue({
        user: { id: "user123" },
      });
      mockObjectExists.mockResolvedValue(true);
    });

    it("should call the action with decoded path and return success", async () => {
      const req = createMockRequest({
        src: "https://test-bucket.com/assets/user/user123/file.jpg",
      });
      const result = await handleAssetRequest(req, mockAction);

      expect(result.status).toBe(200);
      const json = await result.json();
      expect(json).toEqual({
        success: true,
        path: "assets/user/user123/file.jpg",
      });
      expect(mockAction).toHaveBeenCalledTimes(1);
      expect(mockAction).toHaveBeenCalledWith("assets/user/user123/file.jpg");
    });

    it("should wait for action to complete before returning", async () => {
      let actionResolved = false;
      mockAction.mockImplementation(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
        actionResolved = true;
      });

      const req = createMockRequest({
        src: "https://test-bucket.com/assets/user/user123/file.jpg",
      });
      const result = await handleAssetRequest(req, mockAction);

      expect(actionResolved).toBe(true);
      expect(result.status).toBe(200);
    });
  });

  describe("error handling", () => {
    beforeEach(() => {
      mockGetServerSession.mockResolvedValue({
        user: { id: "user123" },
      });
    });

    it("should return 500 when JSON parsing fails", async () => {
      const req = {
        json: jest.fn().mockRejectedValue(new Error("Invalid JSON")),
        body: {}, // Mock body as object
      } as unknown as NextRequest;

      const result = await handleAssetRequest(req, mockAction);

      expect(result.status).toBe(500);
      const json = await result.json();
      expect(json.error).toBeDefined();
    });

    it("should return 500 when objectExists throws an error", async () => {
      mockObjectExists.mockRejectedValue(new Error("S3 error"));

      const req = createMockRequest({
        src: "https://test-bucket.com/assets/user/user123/file.jpg",
      });
      const result = await handleAssetRequest(req, mockAction);

      expect(result.status).toBe(500);
      const json = await result.json();
      expect(json.error).toBeDefined();
    });

    it("should return 500 when action throws an error", async () => {
      mockObjectExists.mockResolvedValue(true);
      mockAction.mockRejectedValue(new Error("Action failed"));

      const req = createMockRequest({
        src: "https://test-bucket.com/assets/user/user123/file.jpg",
      });
      const result = await handleAssetRequest(req, mockAction);

      expect(result.status).toBe(500);
      const json = await result.json();
      expect(json.error).toBeDefined();
    });
  });

  describe("edge cases", () => {
    beforeEach(() => {
      mockGetServerSession.mockResolvedValue({
        user: { id: "user123" },
      });
      mockObjectExists.mockResolvedValue(true);
    });

    it("should handle nested paths correctly", async () => {
      const req = createMockRequest({
        src: "https://test-bucket.com/assets/user/user123/nested/path/file.jpg",
      });
      const result = await handleAssetRequest(req, mockAction);

      expect(result.status).toBe(200);
      expect(mockAction).toHaveBeenCalledWith("assets/user/user123/nested/path/file.jpg");
    });

    it("should handle multiple occurrences of 'assets/user/' in URL", async () => {
      // This tests the logic that uses split and takes the last occurrence
      const req = createMockRequest({
        src: "https://test-bucket.com/assets/user/user123/assets/user/user123/file.jpg",
      });
      const result = await handleAssetRequest(req, mockAction);

      expect(result.status).toBe(200);
      // Should extract user123 from the last occurrence
      expect(mockAction).toHaveBeenCalledWith("assets/user/user123/assets/user/user123/file.jpg");
    });
  });
});
