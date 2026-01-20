// Temporary workaround: Use a minimal config until eslint-config-next flat config support is fixed
// See: https://github.com/vercel/next.js/issues/64114

import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

export default [
  {
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      "build/**",
      "dist/**",
      "coverage/**",
      ".cypress-temp/**",
    ],
  },
  // JavaScript and JSX files
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "no-console": "error",
    },
  },
  // TypeScript files
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      "no-console": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
  // Allow console in scripts directory
  {
    files: ["scripts/**/*.ts"],
    rules: {
      "no-console": "off",
    },
  },
  // Explicitly allow console in specific script files
  {
    files: ["scripts/generateRobotsTxt.ts", "scripts/cleanupTestUser.ts"],
    rules: {
      "no-console": "off",
    },
  },
  // Allow console in sentry config files
  {
    files: ["sentry*.config.ts", "instrumentation-client.ts"],
    rules: {
      "no-console": "off",
    },
  },
  // Allow console in prisma seed helpers
  {
    files: ["prisma/seed/helpers/ids.ts"],
    rules: {
      "no-console": "off",
    },
  },
  // TypeScript React files
  {
    files: ["**/*.tsx"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
];
