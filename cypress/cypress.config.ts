import { defineConfig } from "cypress";
import filePlugin from "./plugins/file-plugin";

export default defineConfig({
  e2e: {
    supportFile: false,
    setupNodeEvents(on, config) {
      return filePlugin(on, config);
    },
    baseUrl: "http://localhost:3000",
    env: {
      BASE_URL: "http://localhost:3000",
      TEST_EMAIL: "test@openresume.org",
    },
    chromeWebSecurity: false, // Might be needed for navigating to magic link
    specPattern: "./**/*.cy.{js,jsx,ts,tsx}",
  },
});
