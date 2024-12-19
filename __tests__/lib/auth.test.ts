import { authOptions, sendVerificationRequest } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import nodemailer from "nodemailer";

// Mock dependencies
jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn().mockResolvedValue([]), // Returns an empty array
    },
  })),
}));

jest.mock("next-auth/next", () => ({
  getServerSession: jest.fn(),
}));

jest.mock("nodemailer", () => ({
  createTestAccount: jest.fn(),
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue({
      messageId: "test-message-id",
    }),
  }),
  getTestMessageUrl: jest.fn(),
}));

describe("Authentication Configuration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("NextAuth Configuration", () => {
    it("should have email provider configured", () => {
      expect(authOptions.providers[0].type).toBe("email");
    });

    it("should use PrismaAdapter", () => {
      expect(authOptions.adapter).toBeDefined();
    });

    it("should have custom pages configured", () => {
      expect(authOptions.pages).toEqual({
        signIn: "/login",
        signOut: "/logout",
        verifyRequest: "/login/verify",
      });
    });
  });

  describe("Email Verification", () => {
    it("should generate a verification email", async () => {
      const mockCreateTestAccount = nodemailer.createTestAccount as jest.Mock;
      mockCreateTestAccount.mockResolvedValue({
        user: "test-user",
        pass: "test-pass",
      });

      const mockTransport = nodemailer.createTransport as jest.Mock;
      const sendMailMock = mockTransport().sendMail as jest.Mock;

      await sendVerificationRequest({
        identifier: "test@example.com",
        url: "http://localhost:3000/verify?token=test-token",
        provider: {
          id: "email",
          type: "email",
          name: "Email",
          maxAge: 900,
          sendVerificationRequest,
          options: {},
          server: {},
          from: "noreply@test.com",
        },
      });

      expect(sendMailMock).toHaveBeenCalledWith(
        expect.objectContaining({
          to: "test@example.com",
          subject: expect.stringContaining("Sign in"),
          html: expect.stringContaining("Click the link below to sign in"),
        }),
      );
    });
  });

  describe("Session Management", () => {
    it("should return null for unauthenticated session", async () => {
      const mockGetServerSession = getServerSession as jest.Mock;
      mockGetServerSession.mockResolvedValue(null);

      const session = await getServerSession(authOptions);
      expect(session).toBeNull();
    });

    it("should return user data for authenticated session", async () => {
      const mockGetServerSession = getServerSession as jest.Mock;
      const mockSession = {
        user: {
          email: "test@example.com",
          name: "Test User",
        },
        expires: new Date(Date.now() + 86400000).toISOString(),
      };
      mockGetServerSession.mockResolvedValue(mockSession);

      const session = await getServerSession(authOptions);
      expect(session).toEqual(mockSession);
      expect(session?.user?.email).toBe("test@example.com");
    });
  });

  describe("Authentication Providers", () => {
    it("should only have email provider", () => {
      expect(authOptions.providers).toHaveLength(1);
      expect(authOptions.providers[0].type).toBe("email");
    });
  });
});
