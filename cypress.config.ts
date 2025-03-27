import * as Cypress from "cypress";

import { filePlugin } from "./cypress/plugins/filePlugin";

const config = {
  e2e: {
    supportFile: "./cypress/support/e2e.ts",
    setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
      return filePlugin(on, config);
    },
    baseUrl: "http://localhost:3000",
    env: {
      BASE_URL: process.env.CYPRESS_BASE_URL || "http://localhost:3000",
      TEST_EMAIL: process.env.CYPRESS_TEST_EMAIL || "test@openresume.org",
    },
    chromeWebSecurity: false,
    specPattern: "./**/*.cy.{js,jsx,ts,tsx}",
  },
};

export default config;
