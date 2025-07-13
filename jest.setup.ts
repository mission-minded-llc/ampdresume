import "@testing-library/jest-dom";
import React from "react";

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
