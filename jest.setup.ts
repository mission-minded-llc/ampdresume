import "@testing-library/jest-dom";
import dotenv from "dotenv";
import React from "react";

// Load environment variables
dotenv.config();

// Polyfill fetch for tests
if (!global.fetch) {
  global.fetch = jest.fn();
}

// Mock @iconify/react Icon component
jest.mock("@iconify/react", () => ({
  Icon: ({ icon, ...props }: any) => {
    return React.createElement("span", {
      "data-testid": "icon",
      "data-icon": icon,
      ...props,
    });
  },
}));
