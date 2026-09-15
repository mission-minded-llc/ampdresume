/// <reference types="cypress" />

import { cypressSpecEmail } from "../../src/lib/cypressTestAccount";

/**
 * Persist "tour dismissed" on the server. Do not click or assert visibility
 * on tour wrappers — several are zero-height Boxes that fail Cypress
 * actionability during session setup.
 */
Cypress.Commands.add("skipOnboardingIfPresent", () => {
  cy.request({
    method: "POST",
    url: "/api/onboarding",
    body: { pending: false },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("loginWithMagicLink", ({ skipOnboarding = true } = {}) => {
  const email = cypressSpecEmail(Cypress.spec.relative);
  cy.session(
    [email, skipOnboarding ? "skip-onboarding" : "keep-onboarding"],
    () => {
      cy.visit("/login");
      cy.get("input[type='email']").type(email);
      cy.contains("button", "Sign in with Email").click();
      cy.contains("h1", "Check Your Email").should("be.visible");

      cy.task("getMagicLink", { email }).then((magicLink) => {
        if (skipOnboarding) {
          cy.intercept("GET", "/api/onboarding", { pending: false });
        }

        cy.visit(magicLink as string);
        cy.url().should("include", "/edit/profile");

        if (skipOnboarding) {
          cy.request({
            method: "POST",
            url: "/api/onboarding",
            body: { pending: false },
            failOnStatusCode: false,
          });
        }
      });
    },
    {
      validate() {
        cy.getCookie("next-auth.session-token").should("exist");
      },
    },
  );

  // Intercepts inside cy.session do not persist after restore.
  if (skipOnboarding) {
    cy.intercept("GET", "/api/onboarding", { pending: false });
  }
});

Cypress.Commands.add("closeMessageDialog", ({ required = false } = {}) => {
  const reminder = "[data-testid=SlugReminderDialog]";

  const dismissSlugReminder = () => {
    cy.contains("Don't forget to set your URL!").should("be.visible");
    cy.contains("button", "OK").should("be.visible").click();
    cy.get("body").should(($body) => {
      const $dlg = $body.find("[data-testid=SlugReminderDialog]");
      if ($dlg.length === 0) return;
      expect($dlg.attr("aria-hidden") === "true" || !$dlg.is(":visible")).to.eq(true);
    });
  };

  if (required) {
    dismissSlugReminder();
    return;
  }

  cy.location("pathname").then((pathname) => {
    if (pathname.includes("/edit/profile")) {
      cy.get("input[name='slug']")
        .should("exist")
        .invoke("val")
        .then((value) => {
          if (String(value ?? "").trim()) return;
          dismissSlugReminder();
        });
      return;
    }

    cy.get("body").then(($body) => {
      if ($body.find(`${reminder}:visible`).length) {
        dismissSlugReminder();
      }
    });
  });
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
