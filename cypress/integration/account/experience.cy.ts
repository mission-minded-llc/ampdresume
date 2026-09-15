/// <reference types="cypress" />

/**
 * The Experience section is a complex section that allows users to add, edit, and delete companies
 * and positions within those companies. It also allows users to add projects to positions.
 */
describe("Experience Section", () => {
  beforeEach(() => {
    cy.loginWithMagicLink();
    cy.visit("/edit/experience");
    cy.skipOnboardingIfPresent();
  });

  it("should access protected experience section", () => {
    cy.contains("Edit Professional Experience").should("be.visible");
  });

  it("should add a company", () => {
    const companyName = "Acme Corp";
    const location = "Springfield, USA";

    cy.get("button").contains("Add New Company").click();
    cy.get(".MuiDialog-container input[name='companyName']").type(companyName);
    cy.get(".MuiDialog-container input[name='location']").type(location);
    cy.fillMonthYear(".MuiDialog-container", "dateStarted", "February", "2020");
    cy.fillMonthYear(".MuiDialog-container", "dateEnded", "March", "2021");
    cy.get(".MuiDialog-container button").contains("Save Company").click();

    cy.get("h3").contains(companyName).should("be.visible");
    cy.get("div").contains(location).should("be.visible");
    cy.get("div").contains("February 2020 to March 2021").should("be.visible");
  });

  it("should edit a company", () => {
    const companyName = "Acme Corp";
    const location = "New Place, USA";

    cy.get("h3").contains(companyName).click();
    cy.get(".Mui-expanded input[name='location']").clear().type(location);
    cy.fillMonthYear(".Mui-expanded", "dateStarted", "February", "2021");
    cy.fillMonthYear(".Mui-expanded", "dateEnded", "March", "2022");
    cy.get(".Mui-expanded button").contains("Save Company").click();

    cy.get("div").contains(location).should("be.visible");
    cy.get("div").contains("February 2021 to March 2022").should("be.visible");
  });

  it("should add a position", () => {
    const companyName = "Acme Corp";
    const positionTitle = "Software Engineer";

    cy.get("h3").contains(companyName).click();
    cy.get("button").contains("Add New Position").click();
    cy.get(".position-form input[name='positionTitle']").type(positionTitle);
    cy.fillMonthYear(".position-form", "dateStarted", "February", "2020");
    cy.fillMonthYear(".position-form", "dateEnded", "March", "2021");
    cy.get("button").contains("Save Position").click();

    cy.get("h3").contains(positionTitle).should("be.visible");
    cy.get("div").contains("February 2020 to March 2021").should("be.visible");
  });

  it("should be unable to delete the company because a position is present", () => {
    const companyName = "Acme Corp";

    cy.get("h3").contains(companyName).click();
    cy.get(".Mui-expanded button").contains("Delete Company").should("be.disabled");
  });

  it("should add a project to the position", () => {
    const companyName = "Acme Corp";
    const positionTitle = "Software Engineer";
    const projectTitle = "Open Source Project";

    cy.get("h3").contains(companyName).click();
    cy.get("h3").contains(positionTitle).click();
    cy.get(".Mui-expanded input[name=project]").type(projectTitle);
    cy.get("button").contains("Add").click();

    cy.contains(projectTitle).should("be.visible");
  });

  it("should be unable to delete the position because a project is present", () => {
    const companyName = "Acme Corp";
    const positionTitle = "Software Engineer";

    cy.get("h3").contains(companyName).click();
    cy.get("h3").contains(positionTitle).click();
    cy.get(".Mui-expanded button").contains("Delete Position").should("be.disabled");
  });

  it("should delete the project", () => {
    const companyName = "Acme Corp";
    const positionTitle = "Software Engineer";
    const projectTitle = "Open Source Project";

    cy.get("h3").contains(companyName).click();
    cy.get("h3").contains(positionTitle).click();
    cy.contains(projectTitle).dblclick();
    cy.get(".MuiDialog-container button").contains("Delete").click();
    cy.get("button").contains("Yes, Delete").click();

    cy.contains(projectTitle).should("not.exist");
  });

  it("should delete the position", () => {
    const companyName = "Acme Corp";
    const positionTitle = "Software Engineer";

    cy.get("h3").contains(companyName).click();
    cy.get("h3").contains(positionTitle).click();
    cy.get(".Mui-expanded button").contains("Delete Position").click();
    cy.get("button").contains("Yes, Delete").click();

    cy.contains(positionTitle).should("not.exist");
  });

  it("should delete a company", () => {
    const companyName = "Acme Corp";

    cy.get("h3").contains(companyName).click();
    cy.get(".Mui-expanded button").contains("Delete Company").click();
    cy.get("button").contains("Yes, Delete").click();

    cy.contains(companyName).should("not.exist");
  });
});
