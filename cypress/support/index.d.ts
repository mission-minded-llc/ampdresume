/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      loginWithMagicLink(email?: string): Chainable<void>;
      setNextAuthCookies(): Chainable<void>;
      closeMessageDialog(options?: { required?: boolean }): Chainable<void>;
    }
  }
}

export {};
