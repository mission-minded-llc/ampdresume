import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  // [...]
  // Replace `ts-jest` with the preset you want to use
  // from the above list
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", __dirname],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      // required due to custom location of tsconfig.json configuration file
      // https://kulshekhar.github.io/ts-jest/docs/getting-started/options/tsconfig
      { tsconfig: "./tsconfig.jest.json" },
    ],
  },
  // transformIgnorePatterns: ["node_modules/(?!(@testing-library/jest-dom)/)"],
  collectCoverageFrom: ["src/**/*.ts", "src/**/*.tsx", "!**/node_modules/**"],
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
