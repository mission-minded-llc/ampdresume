/// <reference types="cypress" />

/**
 * Skills can be attached to a work-experience project, described, and removed
 * without leaving the Skills section.
 */
describe("Experience project skills", () => {
  const companyName = "Skill Project Labs";
  const positionTitle = "Skill Project Engineer";
  const projectTitle = `Shipped the search index ${Date.now()}`;
  const skill = "JavaScript";
  const description = "Indexed the catalog for the search page.";

  beforeEach(() => {
    cy.loginWithMagicLink();
  });

  it("should add, describe, and remove a skill on a project", () => {
    cy.visit("/edit/skills");
    cy.skipOnboardingIfPresent();
    cy.get("body").then(($body) => {
      const alreadyAdded = [...$body.find("button")].some(
        (button) => button.textContent?.trim() === skill,
      );
      if (alreadyAdded) return;

      cy.get("input[name='searchSkills']").type(skill);
      cy.get("span").contains(skill).click();
      cy.get("input[name='autoCalculate']").uncheck();
      cy.get("input[name='totalYears']").clear().type("4");
      cy.get("button").contains("Add Skill").click();
    });
    cy.get("button").contains(skill).should("be.visible");

    cy.visit("/edit/experience");
    cy.skipOnboardingIfPresent();
    cy.get("button").contains("Add New Company").click();
    cy.get(".MuiDialog-container input[name='companyName']").type(companyName);
    cy.get(".MuiDialog-container input[name='location']").type("Remote");
    cy.fillMonthYear(".MuiDialog-container", "dateStarted", "January", "2021");
    cy.fillMonthYear(".MuiDialog-container", "dateEnded", "March", "2023");
    cy.get(".MuiDialog-container button").contains("Save Company").click();

    cy.get("h3").contains(companyName).click();
    cy.get("button").contains("Add New Position").click();
    cy.get(".position-form input[name='positionTitle']").type(positionTitle);
    cy.fillMonthYear(".position-form", "dateStarted", "January", "2021");
    cy.fillMonthYear(".position-form", "dateEnded", "March", "2023");
    cy.get("button").contains("Save Position").click();
    cy.get(".MuiAccordionSummary-root").filter(`:contains("${positionTitle}")`).eq(0).click();
    cy.get("input[name=project]").filter(":visible").type(projectTitle);
    cy.get("button").filter(":visible").contains("Add").click();
    cy.contains(projectTitle).should("be.visible");

    cy.contains(projectTitle).closest("[role='button']").find("button").first().click();
    cy.contains("Edit Project").should("be.visible");
    cy.contains(".MuiDialog-container", "Edit Project")
      .find(".MuiSelect-select")
      .first()
      .click({ force: true });
    cy.get("[role=listbox]").contains(skill).click();
    cy.get(".MuiDialog-container").contains("button", skill).should("be.visible").click();

    cy.contains("Edit Project Skill").should("be.visible");
    cy.get(".MuiDialog-container [contenteditable='true']").last().click().type(description);
    cy.contains(".MuiDialog-container", "Edit Project Skill")
      .contains("button", "Save & Close")
      .click({ force: true });

    cy.get(".MuiDialog-container").contains("button", skill).click();
    cy.contains(description).should("be.visible");
    cy.contains(".MuiDialog-container", "Edit Project Skill")
      .contains("button", "Delete from Project")
      .click({ force: true });
    cy.contains("button", "Yes, Delete").click();
    cy.get(".MuiDialog-container").contains("button", skill).should("not.exist");

    cy.visit("/edit/skills");
    cy.skipOnboardingIfPresent();
    cy.get("button").contains(skill).should("be.visible");
  });
});
