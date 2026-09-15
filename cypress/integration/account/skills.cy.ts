/// <reference types="cypress" />

/**
 * The Skills section is a simple section that allows users to add, edit, and delete skills.
 */
describe("Skills Section", () => {
  beforeEach(() => {
    cy.loginWithMagicLink();
    cy.visit("/edit/skills");
  });

  it("should add a skill with year started", () => {
    const skill = "JavaScript";
    const yearStarted = "2010";
    cy.get("input[name='searchSkills']").type(skill);
    cy.get("span").contains(skill).click();
    cy.get("h2").contains("Enter Proficiency Level").should("be.visible");

    // The text field defaults to having a "0" when it's cleared, then Cypress
    // begins typing at the beginning, before the "0" which pushes it back. This
    // typing results in a year of "2010"
    cy.get("input[name='yearStarted']").clear().type(yearStarted.substring(0, 3));

    cy.get("button").contains("Add Skill").click();
    cy.get("button").contains(skill).should("be.visible");

    const totalYears = new Date().getFullYear() - parseInt(yearStarted, 10);
    cy.contains(`${totalYears} years`).should("be.visible");
  });

  it("should add a skill with no year started", () => {
    const skill = "TypeScript";
    const totalYears = "5";
    cy.get("input[name='searchSkills']").type(skill);
    cy.get("span").contains(skill).click();

    cy.get("input[name='autoCalculate']").uncheck();
    cy.get("input[name='totalYears']").clear().type(totalYears);

    cy.get("button").contains("Add Skill").click();
    cy.get("button").contains(skill).should("be.visible");

    cy.contains(`${totalYears}0 years`).should("be.visible");
  });

  it("should edit a skill", () => {
    const skill = "JavaScript";
    cy.get("button").contains(skill).click();
    cy.get("h2").contains(skill).should("be.visible");

    cy.get("input[name='autoCalculate']").uncheck();

    // When editing, the yearStarted field is a number input, so we need to clear
    // the field before typing in the new year. This results in a "0" being the first
    // character in the field, which gets pushed back when Cypress types.
    // This value results in a "10" below.
    cy.get("input[name='totalYears']").clear().type("1");

    cy.aliasGraphql("updateSkillForUser");
    cy.get("button").contains("Save & Close").click();
    cy.wait("@updateSkillForUser");

    cy.get("button").contains(skill).should("be.visible");
    cy.contains("10 years").should("be.visible");
  });

  it("should delete a skill", () => {
    const skill = "JavaScript";
    cy.get("button").contains(skill).click();
    cy.get("button").contains("Delete Skill").click();
    cy.get("button").contains("Yes, Delete").click();

    cy.get("button").contains(skill).should("not.exist");
  });
});
