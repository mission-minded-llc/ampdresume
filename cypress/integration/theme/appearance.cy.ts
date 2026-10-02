/// <reference types="cypress" />

/**
 * The nav drawer switch stores a light or dark preference.
 */
describe("Theme appearance", () => {
  it("should switch appearance and keep it after reload", () => {
    cy.visit("/");
    cy.get("[data-testid=NavPrimaryMenuIcon]").click();
    cy.get(".MuiDrawer-paper .MuiSwitch-input").then(($input) => {
      const next = $input.is(":checked") ? "light" : "dark";
      cy.wrap($input).click();
      cy.document().its("documentElement").should("have.css", "color-scheme", next);
      cy.getCookie("theme-appearance").should("have.property", "value", next);
      cy.wrap(next).as("appearance");
    });

    cy.reload();
    cy.get("@appearance").then((appearance) => {
      cy.document().its("documentElement").should("have.css", "color-scheme", appearance);
    });
  });
});
