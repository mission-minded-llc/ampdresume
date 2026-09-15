/// <reference types="cypress" />

import { cypressSpecEmail } from "../../src/lib/cypressTestAccount";

Cypress.Commands.add("loginWithMagicLink", () => {
  const email = cypressSpecEmail(Cypress.spec.relative);
  cy.session(
    email,
    () => {
      cy.visit("/login");
      cy.get("input[type='email']").type(email);
      cy.contains("button", "Sign in with Email").click();
      cy.contains("Check Your Email").should("be.visible");

      cy.task("getMagicLink", { email }).then((magicLink) => {
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

Cypress.Commands.add(
  "fillMonthYear",
  (parentSelector: string, fieldName: string, month: string, year: string) => {
    cy.get(parentSelector)
      .find(`input[name='${fieldName}']`)
      .filter(":visible")
      .first()
      .parent()
      .within(() => {
        cy.get('[role="spinbutton"][aria-label="Month"]').click().clear().type(month);
        cy.get('[role="spinbutton"][aria-label="Year"]').click().clear().type(year);
      });
  },
);

Cypress.Commands.add("aliasGraphql", (operationName: string) => {
  cy.intercept("POST", "/api/graphql", (req) => {
    if (req.body.operationName === operationName) {
      req.alias = operationName;
    }
  });
});
