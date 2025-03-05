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
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "./tsconfig.jest.json", isolatedModules: true }],
  },
  transformIgnorePatterns: ["node_modules"],
  testPathIgnorePatterns: ["/node_modules/", "/openresume-theme/"],

  // Coverage settings.
  collectCoverageFrom: [
    "src/**/*.ts",
    "src/**/*.tsx",
    "!src/graphql/**",
    "!src/app/api/graphql/**",
    "!src/app/api/auth/**",
    "!src/app/api/icons/**",
    "!src/app/api/user-asset/**",
    "!src/types/**",
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
