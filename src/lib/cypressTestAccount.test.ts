import { afterEach, describe, expect, it } from "@jest/globals";
import {
  cypressSpecEmail,
  cypressSpecSlug,
  cypressSpecTagFromPath,
  isCypressMagicLinkEmail,
} from "./cypressTestAccount";

describe("cypressTestAccount", () => {
  const originalTestEmail = process.env.CYPRESS_TEST_EMAIL;

  afterEach(() => {
    if (originalTestEmail === undefined) {
      delete process.env.CYPRESS_TEST_EMAIL;
    } else {
      process.env.CYPRESS_TEST_EMAIL = originalTestEmail;
    }
  });

  describe("cypressSpecTagFromPath", () => {
    it("turns a spec path into a lowercase hyphenated tag", () => {
      expect(cypressSpecTagFromPath("cypress/integration/account/skills.cy.ts")).toBe(
        "account-skills",
      );
    });

    it("handles Windows separators and already-relative paths", () => {
      expect(cypressSpecTagFromPath("cypress\\integration\\account\\profile.cy.ts")).toBe(
        "account-profile",
      );
      expect(cypressSpecTagFromPath("./cypress/integration/account/skills.cy.ts")).toBe(
        "account-skills",
      );
      expect(cypressSpecTagFromPath("theme/davids/davidsMain.cy.ts")).toBe(
        "theme-davids-davidsmain",
      );
    });
  });

  describe("cypressSpecEmail / cypressSpecSlug", () => {
    it("keeps plus-free local parts so normalizeEmail cannot collapse users", () => {
      const spec = "cypress/integration/account/featuredProjectsSkills.cy.ts";
      expect(cypressSpecEmail(spec)).toBe("cypress-account-featuredprojectsskills@ampdresume.com");
      expect(cypressSpecSlug(spec)).toBe("cypress-account-featuredprojectsskills");
    });
  });

  describe("isCypressMagicLinkEmail", () => {
    it("matches the configured CYPRESS_TEST_EMAIL", () => {
      process.env.CYPRESS_TEST_EMAIL = "test@ampdresume.com";
      expect(isCypressMagicLinkEmail("test@ampdresume.com")).toBe(true);
      expect(isCypressMagicLinkEmail("other@example.com")).toBe(false);
    });

    it("matches per-spec Cypress accounts", () => {
      delete process.env.CYPRESS_TEST_EMAIL;
      expect(isCypressMagicLinkEmail("cypress-account-skills@ampdresume.com")).toBe(true);
      expect(isCypressMagicLinkEmail("test+skills@ampdresume.com")).toBe(false);
      expect(isCypressMagicLinkEmail("user@example.com")).toBe(false);
    });
  });
});
