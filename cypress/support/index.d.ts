/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      loginWithMagicLink(options?: { skipOnboarding?: boolean }): Chainable<void>;
      skipOnboardingIfPresent(): Chainable<void>;
      closeMessageDialog(options?: { required?: boolean }): Chainable<void>;
      fillMonthYear(
        parentSelector: string,
        fieldName: string,
        month: string,
        year: string,
      ): Chainable<void>;
      aliasGraphql(operationName: string): Chainable<null>;
      enableFeatureFlag(name: string): Chainable<null>;
      disableFeatureFlag(name: string): Chainable<null>;
    }
  }
}

export {};
