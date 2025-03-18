describe("Experience Section", () => {
  before(() => {
    cy.loginWithMagicLink();
  });

  beforeEach(() => {
    cy.setNextAuthCookies();
  });

  it("should access protected experience section", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/experience`);
    cy.contains("Edit Professional Experience").should("be.visible");
  });

  it("should add a company", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/experience`);

    const companyName = "Acme Corp";
    const location = "Springfield, USA";
    const startDate = "Feb 2020";
    const endDate = "Mar 2021";

    cy.get("button").contains("Add New Company").click();
    cy.get(".MuiDialog-container input[name='companyName']").type(companyName);
    cy.get(".MuiDialog-container input[name='location']").type(location);
    cy.get(".MuiDialog-container input[name='dateStarted']").type(startDate);
    cy.get(".MuiDialog-container input[name='dateEnded']").type(endDate);
    cy.get(".MuiDialog-container button").contains("Save Company").click();
    cy.get("h3").contains(companyName).should("be.visible");
    cy.get("div").contains(location).should("be.visible");
    cy.get("div").contains("February 2020 to March 2021").should("be.visible");
  });

  it("should edit a company", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/experience`);

    const companyName = "Acme Corp";
    const location = "New Place, USA";
    const startDate = "Feb 2021";
    const endDate = "Mar 2022";

    cy.get("h3").contains(companyName).click();
    cy.get(".Mui-expanded input[name='location']").clear().type(location);
    cy.get(".Mui-expanded input[name='dateStarted']").clear().type(startDate);
    cy.get(".Mui-expanded input[name='dateEnded']").clear().type(endDate);
    cy.get(".Mui-expanded button").contains("Save Company").click();

    cy.get("div").contains(location).should("be.visible");
    cy.get("div").contains("February 2021 to March 2022").should("be.visible");
  });

  it("should delete a company", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/experience`);

    const companyName = "Acme Corp";

    cy.get("h3").contains(companyName).click();
    cy.get(".Mui-expanded button").contains("Delete Company").click();
    cy.get("button").contains("Yes, Delete").click(); // Confirmation dialog.

    cy.get("h3").contains(companyName).should("not.exist");
  });
});
