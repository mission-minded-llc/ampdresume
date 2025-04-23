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

  it("should add a position", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/experience`);

    const companyName = "Acme Corp";
    const positionTitle = "Software Engineer";
    const startDate = "Feb 2020";
    const endDate = "Mar 2021";

    cy.get("h3").contains(companyName).click();
    cy.get("button").contains("Add New Position").click();
    cy.get(".position-form input[name='positionTitle']").type(positionTitle);
    cy.get(".position-form input[name='dateStarted']").type(startDate);
    cy.get(".position-form input[name='dateEnded']").type(endDate);
    cy.get("button").contains("Save Position").click();

    cy.get("h3").contains(positionTitle).should("be.visible");
    cy.get("div").contains("February 2020 to March 2021").should("be.visible");
  });

  it("should be unable to delete the company because a position is present", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/experience`);

    const companyName = "Acme Corp";

    cy.get("h3").contains(companyName).click();
    cy.get(".Mui-expanded button").contains("Delete Company").should("be.disabled");
  });

  it("should add a project to the position", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/experience`);

    const companyName = "Acme Corp";
    const positionTitle = "Software Engineer";
    const projectTitle = "Open Source Project";

    cy.get("h3").contains(companyName).click();
    cy.get("h3").contains(positionTitle).click();
    cy.get(".Mui-expanded input[name=project]").type(projectTitle);
    cy.get("button").contains("Add").click();

    cy.contains(projectTitle).should("be.visible");
  });

  it("should edit a project", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/experience`);

    const companyName = "Acme Corp";
    const positionTitle = "Software Engineer";
    const projectTitle = "Open Source Project";
    const newProjectTitle = "Updated Open Source Project";

    cy.get("h3").contains(companyName).click();
    cy.get("h3").contains(positionTitle).click();
    cy.contains(projectTitle).dblclick();
    cy.get(".MuiDialog-container textarea").clear().type(newProjectTitle);
    cy.get(".MuiDialog-container button").contains("Save").click();

    cy.contains(newProjectTitle).should("be.visible");
  });

  it("should be unable to delete the position because a project is present", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/experience`);

    const companyName = "Acme Corp";
    const positionTitle = "Software Engineer";

    cy.get("h3").contains(companyName).click();
    cy.get("h3").contains(positionTitle).click();
    cy.get(".Mui-expanded button").contains("Delete Position").should("be.disabled");
  });

  it("should delete the project", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/experience`);

    const companyName = "Acme Corp";
    const positionTitle = "Software Engineer";
    const projectTitle = "Open Source Project";

    cy.get("h3").contains(companyName).click();
    cy.get("h3").contains(positionTitle).click();

    cy.contains(projectTitle).dblclick();
    cy.get(".MuiDialog-container button").contains("Delete").click();
    cy.get("button").contains("Yes, Delete").click(); // Confirmation dialog.

    cy.contains(projectTitle).should("not.exist");
  });

  it("should delete the position", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/experience`);

    const companyName = "Acme Corp";
    const positionTitle = "Software Engineer";

    cy.get("h3").contains(companyName).click();
    cy.get("h3").contains(positionTitle).click();
    cy.get(".Mui-expanded button").contains("Delete Position").click();
    cy.get("button").contains("Yes, Delete").click(); // Confirmation dialog.

    cy.contains(positionTitle).should("not.exist");
  });

  it("should delete a company", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/experience`);

    const companyName = "Acme Corp";

    cy.get("h3").contains(companyName).click();
    cy.get(".Mui-expanded button").contains("Delete Company").click();
    cy.get("button").contains("Yes, Delete").click(); // Confirmation dialog.

    cy.contains(companyName).should("not.exist");
  });
});
