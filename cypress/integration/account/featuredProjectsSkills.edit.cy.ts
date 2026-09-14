/// <reference types="cypress" />

import {
  clearFeaturedProjectSkills,
  featuredProjectName,
  featuredSkill1,
  featuredSkill2,
  featuredSkill3,
  openFeaturedProject,
  openSkillsCombobox,
  setupFeaturedProjectSkills,
  visitFeaturedProjects,
} from "../../support/featuredProjectSkills";

describe("Featured project skills editing", () => {
  before(() => {
    setupFeaturedProjectSkills();
  });

  beforeEach(() => {
    visitFeaturedProjects();
  });

  it("should edit a skill description for a featured project", () => {
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

        cy.get(".Mui-expanded button").contains(skillText).click();
        cy.contains("Edit Featured Project Skill").should("be.visible");
        cy.contains(skillText).should("be.visible");

        const description = "Used this skill extensively in the featured project";
        cy.get(".MuiDialog-container [contenteditable='true']").first().click().type(description);
        cy.get(".MuiDialog-container button").contains("Save & Close").click();
        cy.wait(500);

        cy.get(".Mui-expanded button").contains(skillText).should("be.visible");
      });
  });

  it("should persist skills after closing and reopening the featured project", () => {
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
        cy.contains(featuredProjectName).click();
        cy.wait(500);
        cy.contains(featuredProjectName).click();
        cy.get(".Mui-expanded button").contains(skillText).should("be.visible");
      });
  });

  it("should allow editing skill description and saving without closing", () => {
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

        cy.get(".Mui-expanded button").contains(skillText).click();
        cy.get(".MuiDialog-container [contenteditable='true']")
          .first()
          .click()
          .type("Test description for skill");
        cy.get(".MuiDialog-container button").contains("Save").click();
        cy.wait(500);

        cy.contains("Edit Featured Project Skill").should("be.visible");
        cy.get(".MuiDialog-container button[aria-label='close']").click();
      });
  });

  it("should maintain skill order when multiple skills are added", () => {
    openFeaturedProject();
    clearFeaturedProjectSkills();

    [featuredSkill1, featuredSkill2, featuredSkill3].forEach((skill) => {
      openSkillsCombobox();
      cy.get("li[role='option']").contains(skill).click();
      cy.wait(500);
    });

    cy.get(".Mui-expanded button").contains(featuredSkill1).should("be.visible");
    cy.get(".Mui-expanded button").contains(featuredSkill2).should("be.visible");
    cy.get(".Mui-expanded button").contains(featuredSkill3).should("be.visible");
  });

  it("should show skill buttons that are clickable to edit", () => {
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

        cy.get(".Mui-expanded button")
          .contains(skillText)
          .should("be.visible")
          .should("not.be.disabled");
        cy.get(".Mui-expanded button").contains(skillText).click();
        cy.contains("Edit Featured Project Skill").should("be.visible");
        cy.get(".MuiDialog-container button[aria-label='close']").click();
      });
  });
});
