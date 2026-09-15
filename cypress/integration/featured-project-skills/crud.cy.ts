/// <reference types="cypress" />

import {
  addFirstAvailableSkill,
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
    openFeaturedProject();
    clearFeaturedProjectSkills();
  });

  it("should add a skill to a featured project", () => {
    addFirstAvailableSkill();
    cy.get(".Mui-expanded button").should("have.length.at.least", 1);
  });

  it("should add multiple skills to a featured project", () => {
    addFirstAvailableSkill();
    addFirstAvailableSkill();
    cy.get(".Mui-expanded button").should("have.length.at.least", 2);
  });

  it("should not show already added skills in the dropdown", () => {
    addFirstAvailableSkill();
    cy.get<string>("@addedSkill").then((skillText) => {
      openSkillsCombobox();
      cy.get("li[role='option']").contains(skillText).should("not.exist");
    });
  });

  it("should delete a skill from a featured project", () => {
    addFirstAvailableSkill();
    cy.get<string>("@addedSkill").then((skillText) => {
      cy.get(".Mui-expanded button").contains(skillText).click();
      cy.get(".MuiDialog-container button").contains("Delete from Featured Project").click();
      cy.get("button").contains("Yes, Delete").click();
      cy.get(".Mui-expanded button").contains(skillText).should("not.exist");

      openSkillsCombobox();
      cy.get("li[role='option']").contains(skillText).should("be.visible");
    });
  });
});
