describe("Skills Section", () => {
  before(() => {
    cy.loginWithMagicLink();
  });

  beforeEach(() => {
    cy.setNextAuthCookies();
  });

  it("should access protected skills section", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/skills`);
    cy.contains("Add a Skill").should("be.visible");
  });

  it("should add a skill", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/skills`);

    const skill = "JavaScript";
    const yearStarted = 2010;
    cy.get("input[name='searchSkills']").type(skill);
    cy.get("span").contains(skill).click();
    cy.get("h2").contains("Enter Proficiency Level").should("be.visible");
    cy.get("input[name='yearStarted']")
      .clear({ force: true })
      .type(yearStarted.toString(), { delay: 50 });
    cy.get("input[name='totalYears']").clear({ force: true });

    cy.get("button").contains("Add Skill").click();
    cy.get("button").contains(skill).should("be.visible");

    const totalYears = new Date().getFullYear() - yearStarted;
    cy.contains(`${totalYears} years`).should("be.visible");

    cy.visit(`${Cypress.env("BASE_URL") || ""}/r/test-user`);
    cy.contains(skill).should("be.visible");
    cy.contains(`${totalYears} years`).should("be.visible");
  });

  it("should edit a skill", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/skills`);

    const skill = "JavaScript";
    cy.get("button").contains(skill).click();
    cy.get("h2").contains(skill).should("be.visible");
    cy.get("input[name='yearStarted']").clear({ force: true }).type("2011", { delay: 50 });
    cy.get("input[name='totalYears']").clear({ force: true }).type("9", { delay: 50 });
    cy.get("button").contains("Save & Close").click();

    cy.get("button").contains(skill).should("be.visible");
    cy.contains("9 years").should("be.visible");
  });

  it("should delete a skill", () => {
    cy.visit(`${Cypress.env("BASE_URL") || ""}/edit/skills`);

    const skill = "JavaScript";
    cy.get("button").contains(skill).click();
    cy.get("button").contains("Delete Skill").click();
    cy.get("button").contains("Yes, Delete").click(); // Confirmation dialog.

    cy.get("button").contains(skill).should("not.exist");
  });
});
