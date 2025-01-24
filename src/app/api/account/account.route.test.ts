import { NextRequest } from "next/server";
import { POST } from "@/app/api/account/route";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

// Mock dependencies
jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  },
}));

jest.mock("@/lib/auth", () => ({
  authOptions: {},
}));

// Create a mock NextRequest
const createMockNextRequest = (body: object): NextRequest => {
  const bodyString = JSON.stringify(body);

  return new Request("https://example.com", {
    method: "POST",
    body: bodyString,
    headers: {
      "Content-Type": "application/json",
    },
  }) as unknown as NextRequest;
};

describe("User Profile Update Endpoint", () => {
  // Mock session data
  const mockSession = {
    user: {
      id: "user123",
      email: "test@example.com",
    },
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it("should successfully update user profile when all validations pass", async () => {
    // Setup mocks
    (getServerSession as jest.Mock).mockResolvedValue(mockSession);
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.user.update as jest.Mock).mockResolvedValue({
      id: "user123",
      name: "New Name",
      slug: "new-slug",
    });

    // Create mock request
    const mockRequest = createMockNextRequest({
      name: "New Name",
      slug: "new-slug",
    });

    // Call the endpoint
    const response = await POST(mockRequest);
    const responseBody = await response.json();

    // Assertions
    expect(response.status).toBe(200);
    expect(responseBody.data).toEqual({
      id: "user123",
      name: "New Name",
      slug: "new-slug",
    });
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: "user123" },
      data: {
        name: "New Name",
        slug: "new-slug",
        displayEmail: null,
        title: null,
        location: null,
        siteTitle: null,
        siteDescription: null,
        siteImage: null,
      },
    });
  });

  it("should return 401 if no session exists", async () => {
    // Setup mocks
    (getServerSession as jest.Mock).mockResolvedValue(null);

    // Create mock request
    const mockRequest = createMockNextRequest({
      name: "New Name",
      slug: "new-slug",
    });

    // Call the endpoint
    const response = await POST(mockRequest);
    const responseBody = await response.json();

    // Assertions
    expect(response.status).toBe(401);
    expect(responseBody.error).toBe("Unauthorized");
  });

  it("should return 400 if name or slug is missing", async () => {
    // Setup mocks
    (getServerSession as jest.Mock).mockResolvedValue(mockSession);

    // Create mock request with missing slug
    const mockRequest = createMockNextRequest({
      name: "New Name",
    });

    // Call the endpoint
    const response = await POST(mockRequest);
    const responseBody = await response.json();

    // Assertions
    expect(response.status).toBe(400);
    expect(responseBody.error).toBe("Name and slug are required");
  });

  it("should return 400 if slug is invalid", async () => {
    // Setup mocks
    (getServerSession as jest.Mock).mockResolvedValue(mockSession);

    // Create mock request with invalid slug
    const mockRequest = createMockNextRequest({
      name: "New Name",
      slug: "Invalid Slug!",
    });

    // Call the endpoint
    const response = await POST(mockRequest);
    const responseBody = await response.json();

    // Assertions
    expect(response.status).toBe(400);
    expect(responseBody.error).toBe("Slug must be alphanumeric and lowercase");
  });

  it("should return 400 if slug is already taken", async () => {
    // Setup mocks
    (getServerSession as jest.Mock).mockResolvedValue(mockSession);
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: "another-user",
      slug: "existing-slug",
    });

    // Create mock request
    const mockRequest = createMockNextRequest({
      name: "New Name",
      slug: "existing-slug",
    });

    // Call the endpoint
    const response = await POST(mockRequest);
    const responseBody = await response.json();

    // Assertions
    expect(response.status).toBe(400);
    expect(responseBody.error).toBe("Slug is already taken");
  });

  it("should handle unexpected errors", async () => {
    // Setup mocks to throw an error
    (getServerSession as jest.Mock).mockRejectedValue(new Error("Unexpected error"));

    // Create mock request
    const mockRequest = createMockNextRequest({
      name: "New Name",
      slug: "new-slug",
    });

    // Call the endpoint
    const response = await POST(mockRequest);
    const responseBody = await response.json();

    // Assertions
    expect(response.status).toBe(500);
    expect(responseBody.error).toBeTruthy();
  });
});
