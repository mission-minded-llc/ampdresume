/// <reference types="cypress" />

const themes = ["default", "davids", "retro-80s"] as const;

describe("Demo PDF views", () => {
  themes.forEach((theme) => {
    it(`should load the '${theme}' demo PDF page`, () => {
      cy.visit(`/demo/${theme}/pdf`);
      cy.contains("Generate PDF").should("be.visible");
    });
  });
});
