describe("Experience Section", () => {
  beforeEach(() => {
    cy.loginWithMagicLink();
  });

  it("should access protected experience section", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/experience`);
    cy.contains("Edit Professional Experience").should("be.visible");
  });
});
