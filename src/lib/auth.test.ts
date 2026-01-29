import fs from "fs";
import path from "path";
import { sendVerificationRequest, authOptions, getSession } from "./auth";
import { findUserByNormalizedEmail } from "@/util/email.server";
import { getEnvironmentName } from "@/util/url";
import { ALLOWED_USER_EMAILS } from "@/constants";
import { getServerSession } from "next-auth";
import * as Sentry from "@sentry/nextjs";
import nodemailer from "nodemailer";
import { expect } from "@jest/globals";

// Mock dependencies
jest.mock("fs");
jest.mock("path");
jest.mock("nodemailer");
jest.mock("@sentry/nextjs", () => ({
  captureMessage: jest.fn(),
}));
jest.mock("@/util/email.server", () => ({
  findUserByNormalizedEmail: jest.fn(),
}));
jest.mock("@/util/url", () => ({
  getEnvironmentName: jest.fn(),
}));
jest.mock("@/constants", () => ({
  ALLOWED_USER_EMAILS: ["test@ampdresume.com", "allowed@example.com"],
}));
jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

describe("auth", () => {
  const mockFindUserByNormalizedEmail = findUserByNormalizedEmail as jest.Mock;
  const mockGetEnvironmentName = getEnvironmentName as jest.Mock;
  const mockSentryCaptureMessage = Sentry.captureMessage as jest.Mock;
  const mockFsExistsSync = fs.existsSync as jest.Mock;
  const mockFsMkdirSync = fs.mkdirSync as jest.Mock;
  const mockFsWriteFileSync = fs.writeFileSync as jest.Mock;
  const mockPathJoin = path.join as jest.Mock;
  const mockProcessCwd = jest.spyOn(process, "cwd");
  const mockNodemailerCreateTransport = nodemailer.createTransport as jest.Mock;
  const mockSendMail = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockProcessCwd.mockReturnValue("/test/workspace");
    mockPathJoin.mockImplementation((...args) => args.join("/"));
    mockNodemailerCreateTransport.mockReturnValue({
      sendMail: mockSendMail,
    });
    mockSendMail.mockResolvedValue(undefined);
    mockFsExistsSync.mockReturnValue(false);
  });

  afterEach(() => {
    delete process.env.CYPRESS_TEST_EMAIL;
  });

  describe("sendVerificationRequest", () => {
    const mockProvider = {
      server: {
        host: "smtp.example.com",
        port: 587,
        auth: {
          user: "test@example.com",
          pass: "password",
        },
      },
      from: "noreply@example.com",
    };

    const mockUrl = "https://example.com/auth/callback?token=abc123";

    it("should send verification email to the provided identifier", async () => {
      mockGetEnvironmentName.mockReturnValue("production");
      mockFindUserByNormalizedEmail.mockResolvedValue(null);

      await sendVerificationRequest({
        identifier: "user@example.com",
        url: mockUrl,
        provider: mockProvider,
      });

      expect(mockNodemailerCreateTransport).toHaveBeenCalledWith(mockProvider.server);
      expect(mockSendMail).toHaveBeenCalledWith({
        to: "user@example.com",
        from: mockProvider.from,
        subject: "Sign in to Amp'd Resume (example.com)",
        text: `Click to sign in to Amp'd Resume:\n\n${mockUrl}`,
        html: expect.stringContaining("Sign in to Amp'd Resume (example.com)"),
      });
    });

    it("should use matched user email if found", async () => {
      mockGetEnvironmentName.mockReturnValue("production");
      mockFindUserByNormalizedEmail.mockResolvedValue({
        email: "matched@example.com",
      });

      await sendVerificationRequest({
        identifier: "user@example.com",
        url: mockUrl,
        provider: mockProvider,
      });

      expect(mockSendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: "matched@example.com",
        }),
      );
    });

    it("should use original identifier if user not found", async () => {
      mockGetEnvironmentName.mockReturnValue("production");
      mockFindUserByNormalizedEmail.mockResolvedValue(null);

      await sendVerificationRequest({
        identifier: "user@example.com",
        url: mockUrl,
        provider: mockProvider,
      });

      expect(mockSendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: "user@example.com",
        }),
      );
    });

    it("should use original identifier if user found but email is null", async () => {
      mockGetEnvironmentName.mockReturnValue("production");
      mockFindUserByNormalizedEmail.mockResolvedValue({
        email: null,
      });

      await sendVerificationRequest({
        identifier: "user@example.com",
        url: mockUrl,
        provider: mockProvider,
      });

      expect(mockSendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: "user@example.com",
        }),
      );
    });

    describe("non-production environment email restrictions", () => {
      beforeEach(() => {
        mockGetEnvironmentName.mockReturnValue("development");
      });

      it("should allow email if it is in ALLOWED_USER_EMAILS", async () => {
        mockFindUserByNormalizedEmail.mockResolvedValue(null);

        await sendVerificationRequest({
          identifier: "test@ampdresume.com",
          url: mockUrl,
          provider: mockProvider,
        });

        expect(mockSendMail).toHaveBeenCalled();
        expect(mockSentryCaptureMessage).not.toHaveBeenCalled();
      });

      it("should allow email if matched user email is in ALLOWED_USER_EMAILS", async () => {
        mockFindUserByNormalizedEmail.mockResolvedValue({
          email: "allowed@example.com",
        });

        await sendVerificationRequest({
          identifier: "user@example.com",
          url: mockUrl,
          provider: mockProvider,
        });

        expect(mockSendMail).toHaveBeenCalled();
        expect(mockSentryCaptureMessage).not.toHaveBeenCalled();
      });

      it("should reject email if it is not in ALLOWED_USER_EMAILS", async () => {
        mockFindUserByNormalizedEmail.mockResolvedValue(null);

        await expect(
          sendVerificationRequest({
            identifier: "unauthorized@example.com",
            url: mockUrl,
            provider: mockProvider,
          }),
        ).rejects.toThrow("Email is not allowed to sign in.");

        expect(mockSentryCaptureMessage).toHaveBeenCalledWith(
          "Email unauthorized@example.com is not allowed to sign in.",
        );
        expect(mockSendMail).not.toHaveBeenCalled();
      });

      it("should reject email if matched user email is not in ALLOWED_USER_EMAILS", async () => {
        mockFindUserByNormalizedEmail.mockResolvedValue({
          email: "unauthorized@example.com",
        });

        await expect(
          sendVerificationRequest({
            identifier: "user@example.com",
            url: mockUrl,
            provider: mockProvider,
          }),
        ).rejects.toThrow("Email is not allowed to sign in.");

        expect(mockSentryCaptureMessage).toHaveBeenCalledWith(
          "Email unauthorized@example.com is not allowed to sign in.",
        );
        expect(mockSendMail).not.toHaveBeenCalled();
      });
    });

    describe("Cypress test email handling", () => {
      beforeEach(() => {
        process.env.CYPRESS_TEST_EMAIL = "cypress@test.com";
        mockGetEnvironmentName.mockReturnValue("production");
      });

      it("should save magic link to file for Cypress test email", async () => {
        mockFindUserByNormalizedEmail.mockResolvedValue(null);
        mockFsExistsSync.mockReturnValue(true);

        await sendVerificationRequest({
          identifier: "cypress@test.com",
          url: mockUrl,
          provider: mockProvider,
        });

        expect(mockPathJoin).toHaveBeenCalledWith("/test/workspace", ".cypress-temp");
        expect(mockFsWriteFileSync).toHaveBeenCalledWith(
          "/test/workspace/.cypress-temp/magic-link-cypress_test_com.txt",
          mockUrl,
        );
        expect(mockSendMail).not.toHaveBeenCalled();
      });

      it("should create temp directory if it does not exist", async () => {
        mockFindUserByNormalizedEmail.mockResolvedValue(null);
        mockFsExistsSync.mockReturnValue(false);

        await sendVerificationRequest({
          identifier: "cypress@test.com",
          url: mockUrl,
          provider: mockProvider,
        });

        expect(mockFsMkdirSync).toHaveBeenCalledWith("/test/workspace/.cypress-temp", {
          recursive: true,
        });
        expect(mockFsWriteFileSync).toHaveBeenCalled();
      });

      it("should sanitize email address in filename", async () => {
        process.env.CYPRESS_TEST_EMAIL = "test.email+tag@example.com";
        mockFindUserByNormalizedEmail.mockResolvedValue(null);
        mockFsExistsSync.mockReturnValue(true);

        await sendVerificationRequest({
          identifier: "test.email+tag@example.com",
          url: mockUrl,
          provider: mockProvider,
        });

        expect(mockFsWriteFileSync).toHaveBeenCalledWith(
          expect.stringContaining("magic-link-test_email+tag_example_com.txt"),
          mockUrl,
        );
      });

      it("should use matched user email for Cypress test if found", async () => {
        mockFindUserByNormalizedEmail.mockResolvedValue({
          email: "cypress@test.com",
        });
        mockFsExistsSync.mockReturnValue(true);

        await sendVerificationRequest({
          identifier: "user@example.com",
          url: mockUrl,
          provider: mockProvider,
        });

        expect(mockFsWriteFileSync).toHaveBeenCalledWith(
          "/test/workspace/.cypress-temp/magic-link-cypress_test_com.txt",
          mockUrl,
        );
      });
    });

    describe("email content", () => {
      beforeEach(() => {
        mockGetEnvironmentName.mockReturnValue("production");
        mockFindUserByNormalizedEmail.mockResolvedValue(null);
      });

      it("should include correct subject with hostname", async () => {
        await sendVerificationRequest({
          identifier: "user@example.com",
          url: "https://app.example.com/auth/callback?token=abc",
          provider: mockProvider,
        });

        expect(mockSendMail).toHaveBeenCalledWith(
          expect.objectContaining({
            subject: "Sign in to Amp'd Resume (app.example.com)",
          }),
        );
      });

      it("should include plain text version of email", async () => {
        await sendVerificationRequest({
          identifier: "user@example.com",
          url: mockUrl,
          provider: mockProvider,
        });

        expect(mockSendMail).toHaveBeenCalledWith(
          expect.objectContaining({
            text: `Click to sign in to Amp'd Resume:\n\n${mockUrl}`,
          }),
        );
      });

      it("should include HTML version of email with link", async () => {
        await sendVerificationRequest({
          identifier: "user@example.com",
          url: mockUrl,
          provider: mockProvider,
        });

        const callArgs = mockSendMail.mock.calls[0][0];
        expect(callArgs.html).toContain("Sign in to Amp'd Resume");
        expect(callArgs.html).toContain(mockUrl);
        expect(callArgs.html).toContain(`<a href="${mockUrl}"`);
      });
    });
  });

  describe("authOptions callbacks", () => {
    describe("signIn callback", () => {
      const signInCallback = authOptions.callbacks?.signIn;

      beforeEach(() => {
        mockGetEnvironmentName.mockReturnValue("development");
      });

      it("should return true for non-Google, non-email providers", async () => {
        const result = await signInCallback?.({
          user: { id: "123", email: "user@example.com" },
          account: { provider: "linkedin" },
          profile: {},
        });

        expect(result).toBe(true);
      });

      describe("Google provider", () => {
        it("should allow sign-in if email is in ALLOWED_USER_EMAILS in non-production", async () => {
          mockFindUserByNormalizedEmail.mockResolvedValue(null);

          const result = await signInCallback?.({
            user: { id: "123", email: "test@ampdresume.com" },
            account: { provider: "google", providerAccountId: "google123" },
            profile: { email: "test@ampdresume.com" },
          });

          expect(result).toBe(true);
          expect(mockSentryCaptureMessage).not.toHaveBeenCalled();
        });

        it("should reject sign-in if email is not in ALLOWED_USER_EMAILS in non-production", async () => {
          mockFindUserByNormalizedEmail.mockResolvedValue(null);

          const result = await signInCallback?.({
            user: { id: "123", email: "unauthorized@example.com" },
            account: { provider: "google", providerAccountId: "google123" },
            profile: { email: "unauthorized@example.com" },
          });

          expect(result).toBe(false);
          expect(mockSentryCaptureMessage).toHaveBeenCalledWith(
            "Email unauthorized@example.com is not allowed to sign in with Google.",
          );
        });

        it("should allow sign-in in production without email check", async () => {
          mockGetEnvironmentName.mockReturnValue("production");
          mockFindUserByNormalizedEmail.mockResolvedValue(null);

          const result = await signInCallback?.({
            user: { id: "123", email: "any@example.com" },
            account: { provider: "google", providerAccountId: "google123" },
            profile: { email: "any@example.com" },
          });

          expect(result).toBe(true);
          expect(mockSentryCaptureMessage).not.toHaveBeenCalled();
        });

        it("should update user and account with matched email if user found", async () => {
          mockFindUserByNormalizedEmail.mockResolvedValue({
            email: "matched@example.com",
          });

          const user: { id: string; email: string } = { id: "123", email: "test@ampdresume.com" };
          const account: {
            provider: string;
            providerAccountId: string;
            userId?: string;
          } = { provider: "google", providerAccountId: "google123" };
          const profile: { email?: string } = { email: "test@ampdresume.com" };

          const result = await signInCallback?.({
            user,
            account,
            profile,
          });

          expect(result).toBe(true);
          expect(mockFindUserByNormalizedEmail).toHaveBeenCalledWith("test@ampdresume.com");
          expect(user.id).toBe("matched@example.com");
          expect(user.email).toBe("matched@example.com");
          expect(account.providerAccountId).toBe("matched@example.com");
          expect(account.userId).toBe("matched@example.com");
        });

        it("should not update user if no match found", async () => {
          mockFindUserByNormalizedEmail.mockResolvedValue(null);

          const user = { id: "123", email: "user@example.com" };
          const account = { provider: "google", providerAccountId: "google123" };

          await signInCallback?.({
            user,
            account,
            profile: { email: "user@example.com" },
          });

          expect(user.id).toBe("123");
          expect(user.email).toBe("user@example.com");
        });

        it("should handle missing profile email gracefully", async () => {
          const result = await signInCallback?.({
            user: { id: "123" },
            account: { provider: "google" },
            profile: {},
          });

          expect(result).toBe(true);
        });
      });

      describe("email provider", () => {
        it("should update user and account with matched email if user found", async () => {
          mockFindUserByNormalizedEmail.mockResolvedValue({
            email: "matched@example.com",
          });

          const user = { id: "123", email: "user@example.com" };
          const account = { provider: "email", providerAccountId: "user@example.com" };

          await signInCallback?.({
            user,
            account,
            profile: {},
          });

          expect(user.id).toBe("matched@example.com");
          expect(user.email).toBe("matched@example.com");
          expect(account.providerAccountId).toBe("matched@example.com");
          expect(account.userId).toBe("matched@example.com");
        });

        it("should not update user if no match found", async () => {
          mockFindUserByNormalizedEmail.mockResolvedValue(null);

          const user = { id: "123", email: "user@example.com" };
          const account = { provider: "email", providerAccountId: "user@example.com" };

          await signInCallback?.({
            user,
            account,
            profile: {},
          });

          expect(user.id).toBe("123");
          expect(user.email).toBe("user@example.com");
        });

        it("should handle missing user email gracefully", async () => {
          const result = await signInCallback?.({
            user: { id: "123" },
            account: { provider: "email" },
            profile: {},
          });

          expect(result).toBe(true);
        });
      });
    });

    describe("session callback", () => {
      const sessionCallback = authOptions.callbacks?.session;

      it("should add user id and email to session", async () => {
        const session = {
          user: { name: "Test User" },
          expires: new Date().toISOString(),
        };
        const token = {};
        const user = {
          id: "user123",
          email: "user@example.com",
        };

        const result = await sessionCallback?.({ session, token, user });

        expect(result?.user.id).toBe("user123");
        expect(result?.user.email).toBe("user@example.com");
        expect(result?.user.name).toBe("Test User");
      });

      it("should add slug to session if user has slug", async () => {
        const session = {
          user: { name: "Test User" },
          expires: new Date().toISOString(),
        };
        const token = {};
        const user = {
          id: "user123",
          email: "user@example.com",
          slug: "test-user",
        };

        const result = await sessionCallback?.({ session, token, user });

        expect(result?.user.slug).toBe("test-user");
      });

      it("should add webThemeName to session if user has webThemeName", async () => {
        const session = {
          user: { name: "Test User" },
          expires: new Date().toISOString(),
        };
        const token = {};
        const user = {
          id: "user123",
          email: "user@example.com",
          webThemeName: "davids",
        };

        const result = await sessionCallback?.({ session, token, user });

        expect(result?.user.webThemeName).toBe("davids");
      });

      it("should add pdfThemeName to session if user has pdfThemeName", async () => {
        const session = {
          user: { name: "Test User" },
          expires: new Date().toISOString(),
        };
        const token = {};
        const user = {
          id: "user123",
          email: "user@example.com",
          pdfThemeName: "davids",
        };

        const result = await sessionCallback?.({ session, token, user });

        expect(result?.user.pdfThemeName).toBe("davids");
      });

      it("should add all optional fields if user has them", async () => {
        const session = {
          user: { name: "Test User" },
          expires: new Date().toISOString(),
        };
        const token = {};
        const user = {
          id: "user123",
          email: "user@example.com",
          slug: "test-user",
          webThemeName: "davids",
          pdfThemeName: "modern",
        };

        const result = await sessionCallback?.({ session, token, user });

        expect(result?.user.slug).toBe("test-user");
        expect(result?.user.webThemeName).toBe("davids");
        expect(result?.user.pdfThemeName).toBe("modern");
      });

      it("should not add optional fields if user does not have them", async () => {
        const session = {
          user: { name: "Test User" },
          expires: new Date().toISOString(),
        };
        const token = {};
        const user = {
          id: "user123",
          email: "user@example.com",
        };

        const result = await sessionCallback?.({ session, token, user });

        expect(result?.user.slug).toBeUndefined();
        expect(result?.user.webThemeName).toBeUndefined();
        expect(result?.user.pdfThemeName).toBeUndefined();
      });
    });
  });

  describe("getSession", () => {
    const mockGetServerSession = getServerSession as jest.Mock;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should call getServerSession with authOptions", async () => {
      const mockSession = {
        user: { id: "user123", email: "user@example.com" },
        expires: new Date().toISOString(),
      };
      mockGetServerSession.mockResolvedValue(mockSession);

      const result = await getSession();

      expect(mockGetServerSession).toHaveBeenCalledWith(authOptions);
      expect(result).toBe(mockSession);
    });

    it("should return null when getServerSession returns null", async () => {
      mockGetServerSession.mockResolvedValue(null);

      const result = await getSession();

      expect(result).toBeNull();
    });
  });
});
