import "@testing-library/jest-dom";
import dotenv from "dotenv";
import React from "react";
import { TextEncoder, TextDecoder } from "util";

// Load environment variables
dotenv.config();

// Polyfill TextEncoder/TextDecoder for tests (required by pg package)
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;

// Polyfill fetch for tests
if (!global.fetch) {
  global.fetch = jest.fn();
}

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
  revalidateTag: jest.fn(),
}));

jest.mock("@/lib/revalidatePublicResume", () => ({
  revalidatePublicResumeBySlug: jest.fn(),
  revalidatePublicResumeForUserId: jest.fn().mockResolvedValue(undefined),
}));

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
