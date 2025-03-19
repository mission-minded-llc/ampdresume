declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to login with magic link
     */
    loginWithMagicLink(): Chainable<void>;

    /**
     * Custom command to set next-auth cookies for reusable requests
     */
    setNextAuthCookies(): Chainable<void>;
  }
}
