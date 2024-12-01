module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.cjs"],
  transformIgnorePatterns: ["node_modules/(?!(@testing-library/jest-dom)/)"],
  collectCoverageFrom: ["src/**/*.ts", "src/**/*.tsx", "!**/node_modules/**"],
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 10,
      lines: 10,
      statements: 10,
    },
  },
};
