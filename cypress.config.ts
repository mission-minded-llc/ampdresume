/// <reference types="cypress" />

import fs from "fs";
import path from "path";

function magicLinkPath(email: string) {
  const safeEmail = email.replace(/[@.]/g, "_");
  return path.join(process.cwd(), ".cypress-temp", `magic-link-${safeEmail}.txt`);
}

async function waitForMagicLink(email: string) {
  const filePath = magicLinkPath(email);
  const deadline = Date.now() + 5000;

  while (Date.now() < deadline) {
    if (fs.existsSync(filePath)) {
      const magicLink = fs.readFileSync(filePath, "utf8").trim();
      if (magicLink) return magicLink;
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  throw new Error(`Magic link file not found for ${email} at ${filePath}`);
}

const filePlugin = (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  on("task", {
    getMagicLink({ email }: { email: string }) {
      return waitForMagicLink(email);
    },
  });

  return config;
};

const config = {
  e2e: {
    supportFile: "./cypress/support/e2e.ts",
    setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
      return filePlugin(on, config);
    },
    baseUrl: "http://localhost:3000",
    chromeWebSecurity: false,
    specPattern: "./cypress/integration/**/*.cy.ts",
  },
};

export default config;
