/// <reference types="cypress" />

export class ThemeDavidsPage {
  getDavidsThemePage() {
    cy.visit("/demo/davids");
  }

  getSkillFilter() {
    return cy.get('input[type="text"]').scrollIntoView().should("be.visible");
  }

  getSkillFilterDropDown() {
    return cy.get('[data-testid="ArrowDropDownIcon"]').closest("button");
  }

  getSkillFilterItem(skill: string) {
    return cy.contains("li", skill);
  }

  selectFilter(skill: string) {
    this.getSkillFilterDropDown().click();
    this.getSkillFilterItem(skill).click();
  }
}
