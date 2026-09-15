/// <reference types="cypress" />

import {
  addCatalogSkill,
  addFirstAvailableSkill,
  clearFeaturedProjectSkills,
  featuredProjectName,
  featuredSkill1,
  featuredSkill2,
  featuredSkill3,
  openFeaturedProject,
  setupFeaturedProjectSkills,
  visitFeaturedProjects,
} from "../../support/featuredProjectSkills";

describe("Featured project skills editing", () => {
  before(() => {
    setupFeaturedProjectSkills();
  });

  beforeEach(() => {
    visitFeaturedProjects();
    openFeaturedProject();
    clearFeaturedProjectSkills();
  });

  it("should edit a skill description for a featured project", () => {
    addFirstAvailableSkill();
    cy.get<string>("@addedSkill").then((skillText) => {
      cy.get(".Mui-expanded button").contains(skillText).click();
      cy.contains("Edit Featured Project Skill").should("be.visible");
      cy.contains(skillText).should("be.visible");

      cy.aliasGraphql("updateSkillForFeaturedProject");
      const description = "Used this skill extensively in the featured project";
      cy.get(".MuiDialog-container [contenteditable='true']").first().click().type(description);
      cy.get(".MuiDialog-container button").contains("Save & Close").click();
      cy.wait("@updateSkillForFeaturedProject");

      cy.get(".Mui-expanded button").contains(skillText).should("be.visible");
    });
  });

  it("should persist skills after closing and reopening the featured project", () => {
    addFirstAvailableSkill();
    cy.get<string>("@addedSkill").then((skillText) => {
      cy.contains(featuredProjectName).click();
      cy.get(".Mui-expanded").should("not.exist");
      cy.contains(featuredProjectName).click();
      cy.get(".Mui-expanded button").contains(skillText).should("be.visible");
    });
  });

  it("should allow editing skill description and saving without closing", () => {
    addFirstAvailableSkill();
    cy.get<string>("@addedSkill").then((skillText) => {
      cy.get(".Mui-expanded button").contains(skillText).click();

      cy.aliasGraphql("updateSkillForFeaturedProject");
      cy.get(".MuiDialog-container [contenteditable='true']")
        .first()
        .click()
        .type("Test description for skill");
      cy.get(".MuiDialog-container button").contains("Save").click();
      cy.wait("@updateSkillForFeaturedProject");

      cy.contains("Edit Featured Project Skill").should("be.visible");
      cy.get(".MuiDialog-container button[aria-label='close']").click();
    });
  });

  it("should maintain skill order when multiple skills are added", () => {
    [featuredSkill1, featuredSkill2, featuredSkill3].forEach((skill) => {
      addCatalogSkill(skill);
    });

    cy.get(".Mui-expanded button").contains(featuredSkill1).should("be.visible");
    cy.get(".Mui-expanded button").contains(featuredSkill2).should("be.visible");
    cy.get(".Mui-expanded button").contains(featuredSkill3).should("be.visible");
  });

  it("should show skill buttons that are clickable to edit", () => {
    addFirstAvailableSkill();
    cy.get<string>("@addedSkill").then((skillText) => {
      cy.get(".Mui-expanded button")
        .contains(skillText)
        .should("be.visible")
        .should("not.be.disabled")
        .click();
      cy.contains("Edit Featured Project Skill").should("be.visible");
      cy.get(".MuiDialog-container button[aria-label='close']").click();
    });
  });
});
