describe("Profile Section", () => {
  beforeEach(() => {
    cy.loginWithMagicLink();
  });

  it("should access protected profile section", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/profile`);
    cy.contains("Profile").should("be.visible");
  });
});
