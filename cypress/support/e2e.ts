/// <reference types="cypress" />

import { cypressSpecEmail } from "../../src/lib/cypressTestAccount";

Cypress.Commands.add("loginWithMagicLink", (email?: string) => {
  const resolvedEmail = email ?? cypressSpecEmail(Cypress.spec.relative);
  cy.session(
    resolvedEmail,
    () => {
      cy.log(`Logging in with email: ${resolvedEmail}`);
      cy.visit("/login");

      cy.get("input[type='email']").type(resolvedEmail);
      cy.contains("button", "Sign in with Email").click();

      cy.contains("Check Your Email").should("be.visible");
      cy.wait(100); // Wait for magic link to be "sent" (writing to file).

      cy.task("getMagicLink", { email: resolvedEmail }).then((magicLink) => {
        cy.visit(magicLink as string);
        cy.url().should("include", "/edit/profile");
        cy.contains("Profile").should("be.visible");
        cy.contains("General Information").should("be.visible");
      });
    },
    {
      validate() {
        cy.getCookie("next-auth.session-token").should("exist");
      },
    },
  );
});

Cypress.Commands.add("closeMessageDialog", ({ required = false } = {}) => {
  if (required) {
    cy.get("[data-testid=MessageDialog]").should("be.visible");
    cy.get("[data-testid=MessageDialog]").contains("OK").click();
  } else {
    cy.get("body", { timeout: 1000 }).then(($body) => {
      const $dialog = $body.find("[data-testid=MessageDialog]");
      if ($dialog.length) {
        cy.wrap($dialog).should("be.visible");
        cy.wrap($dialog).contains("OK").click();
      } else {
        cy.log("Message dialog not found — continuing");
      }
    });
  }
});
