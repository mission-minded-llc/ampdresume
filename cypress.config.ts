import { defineConfig } from "cypress";
import filePlugin from "./cypress/plugins/file-plugin.ts";

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
