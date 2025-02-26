import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", __dirname],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      // required due to custom location of tsconfig.json configuration file
      // https://kulshekhar.github.io/ts-jest/docs/getting-started/options/tsconfig
      { tsconfig: "./tsconfig.jest.json", isolatedModules: true },
    ],
  },
  transformIgnorePatterns: ["node_modules"],

  // Coverage settings.
  collectCoverageFrom: [
    "src/**/*.ts",
    "src/**/*.tsx",
    "!src/graphql/**", // GraphQL gets tested in integration tests.
    "!src/app/api/graphql/**", // GraphQL gets tested in integration tests.
    "!src/app/api/auth/**", // Auth gets tested in integration tests.
    "!src/app/api/icons/**", // Icons get tested in integration tests.
    "!src/app/api/user-asset/**", // User assets get tested in integration tests.
    "!src/types/**", // Ignore types.
    "!**/node_modules/**",
  ],
  coverageThreshold: {
    global: {
      branches: 1,
      functions: 1,
      lines: 1,
      statements: 1,
    },
  },
};

export default jestConfig;
