describe("Primary Nav Menu", () => {
  it(`should visit 'davids' theme`, () => {
    cy.visit("/");
    cy.get("[data-testid=NavPrimaryMenuIcon]").click();
    cy.get("[data-testid=NavPrimaryMenuDemoThemes]").should("be.visible");
    cy.get("[data-testid=NavPrimaryMenuDemoThemes]").click();
    cy.get(`a[href='/demo/davids']`).click();
    cy.url().should("include", `/demo/davids`);
  });
});
