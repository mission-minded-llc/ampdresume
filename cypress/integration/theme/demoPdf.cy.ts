/// <reference types="cypress" />

describe("Demo PDF views", () => {
  const themes = ["default", "davids", "retro-80s"] as const;

  themes.forEach((theme) => {
    it(`should load the '${theme}' demo PDF page`, () => {
      cy.visit(`/demo/${theme}/pdf`);
      cy.contains("Generate PDF").should("be.visible");
    });
  });
});
