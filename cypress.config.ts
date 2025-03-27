import { defineConfig } from "cypress";
import fs from "fs";
import path from "path";

interface GetMagicLinkParams {
  email: string;
}

const filePlugin = (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
): Cypress.PluginConfigOptions => {
  on("task", {
    getMagicLink({ email }: GetMagicLinkParams): string {
      // Convert email to safe filename
      const safeEmail = email.replace(/[@.]/g, "_");
      const tempDir = path.join(process.cwd(), ".cypress-temp");
      const filePath = path.join(tempDir, `magic-link-${safeEmail}.txt`);

      // Try to read the file
      try {
        if (!fs.existsSync(filePath)) {
          throw new Error(`Magic link file not found for ${email} at ${filePath}`);
        }

        // Read the magic link from the file
        const magicLink = fs.readFileSync(filePath, "utf8").trim();

        // Optional: Remove the file after reading it
        // fs.unlinkSync(filePath);

        return magicLink;
      } catch (error) {
        throw new Error(`Error reading magic link for ${email}: ${(error as Error).message}`);
      }
    },

    // Optional: Add a task to clean up all magic link files
    cleanupMagicLinks(): null {
      const tempDir = path.join(process.cwd(), ".cypress-temp");

      if (fs.existsSync(tempDir)) {
        const files = fs.readdirSync(tempDir);

        for (const file of files) {
          if (file.startsWith("magic-link-")) {
            fs.unlinkSync(path.join(tempDir, file));
          }
        }
      }

      return null;
    },
  });

  return config;
};

export default defineConfig({
  e2e: {
    supportFile: "./cypress/support/e2e.ts",
    setupNodeEvents(on, config) {
      return filePlugin(on, config);
    },
    baseUrl: "http://localhost:3000",
    env: {
      BASE_URL: process.env.CYPRESS_BASE_URL || "http://localhost:3000",
      TEST_EMAIL: process.env.CYPRESS_TEST_EMAIL || "test@openresume.org",
    },
    chromeWebSecurity: false, // Might be needed for navigating to magic link
    specPattern: "./**/*.cy.{js,jsx,ts,tsx}",
  },
});
