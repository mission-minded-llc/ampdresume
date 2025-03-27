import { defineConfig } from "cypress";
import { filePlugin } from "./plugins/filePlugin.js";

export default defineConfig({
  e2e: {
    supportFile: "./cypress/support/e2e.js",
    setupNodeEvents(on, config) {
      return filePlugin(on, config);
    },
    baseUrl: "http://localhost:3000",
    env: {
      BASE_URL: process.env.CYPRESS_BASE_URL || "http://localhost:3000",
      TEST_EMAIL: process.env.CYPRESS_TEST_EMAIL || "test@openresume.org",
    },
    chromeWebSecurity: false, // Might be needed for navigating to magic link
    specPattern: "./**/*.cy.js",
  },
});
