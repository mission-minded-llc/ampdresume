declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to login with magic link
     */
    loginWithMagicLink(): Chainable<void>;
    setNextAuthCookies(): Chainable<void>;
  }
}
