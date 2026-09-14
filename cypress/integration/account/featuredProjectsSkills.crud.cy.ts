/// <reference types="cypress" />

import {
  clearFeaturedProjectSkills,
  openFeaturedProject,
  openSkillsCombobox,
  setupFeaturedProjectSkills,
  visitFeaturedProjects,
} from "../../support/featuredProjectSkills";

describe("Featured project skills CRUD", () => {
  before(() => {
    setupFeaturedProjectSkills();
  });

  beforeEach(() => {
    visitFeaturedProjects();
  });

  it("should add a skill to a featured project", () => {
    openFeaturedProject();
    clearFeaturedProjectSkills();

    openSkillsCombobox();
    cy.get("li[role='option']", { timeout: 5000 }).should("have.length.at.least", 1);
    cy.get("li[role='option']").first().click();
    cy.get(".Mui-expanded button").should("have.length.at.least", 1);
  });

  it("should add multiple skills to a featured project", () => {
    openFeaturedProject();
    clearFeaturedProjectSkills();

    openSkillsCombobox();
    cy.get("li[role='option']", { timeout: 5000 }).should("have.length.at.least", 1);
    cy.get("li[role='option']").first().click();
    cy.wait(500);

    openSkillsCombobox();
    cy.get("li[role='option']", { timeout: 5000 }).should("have.length.at.least", 1);
    cy.get("li[role='option']").first().click();
    cy.wait(500);

    cy.get(".Mui-expanded button").should("have.length.at.least", 2);
  });

  it("should not show already added skills in the dropdown", () => {
    openFeaturedProject();
    clearFeaturedProjectSkills();

    openSkillsCombobox();
    cy.get("li[role='option']", { timeout: 5000 }).should("have.length.at.least", 1);

    cy.get("li[role='option']")
      .first()
      .then(($option) => {
        const addedSkillText = $option.text().trim();
        cy.wrap($option).click();
        cy.wait(500);

        openSkillsCombobox();
        cy.get("li[role='option']").contains(addedSkillText).should("not.exist");
      });
  });

  it("should delete a skill from a featured project", () => {
    openFeaturedProject();
    clearFeaturedProjectSkills();

    openSkillsCombobox();
    cy.get("li[role='option']", { timeout: 5000 }).should("have.length.at.least", 1);

    cy.get("li[role='option']")
      .first()
      .then(($option) => {
        const skillText = $option.text().trim();
        cy.wrap($option).click();
        cy.wait(500);

        cy.get(".Mui-expanded button").contains(skillText).should("be.visible");
        cy.get(".Mui-expanded button").contains(skillText).click();
        cy.get(".MuiDialog-container button").contains("Delete from Featured Project").click();
        cy.get("button").contains("Yes, Delete").click();
        cy.wait(500);

        cy.get(".Mui-expanded button").contains(skillText).should("not.exist");

        openSkillsCombobox();
        cy.get("li[role='option']", { timeout: 5000 }).should("have.length.at.least", 1);
        cy.get("li[role='option']").contains(skillText).should("be.visible");
      });
  });
});
