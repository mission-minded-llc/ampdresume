/// <reference types="cypress" />

export class NavigationMenuPage {
  visitNavPrimaryMenu() {
    cy.visit("/");
    return cy.get("[data-testid=NavPrimaryMenuIcon]");
  }

  getDavidsThemeItem() {
    return cy.get("a[href='/demo/davids']");
  }

  getCloseView() {
    return cy.get("button[data-testid='nav-primary-menu-close-button']");
  }
}
