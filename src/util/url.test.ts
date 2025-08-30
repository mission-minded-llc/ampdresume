import { getBaseUrl } from "@/util/url";
import { expect, describe, it } from "@jest/globals";

describe("getBaseUrl", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("should return the NEXT_PUBLIC_BASE_URL from environment variables", () => {
    process.env.NEXT_PUBLIC_BASE_URL = "https://example.com";
    expect(getBaseUrl()).toBe("https://example.com");
  });

  it("should return the default URL if NEXT_PUBLIC_BASE_URL is not set", () => {
    delete process.env.NEXT_PUBLIC_BASE_URL;
    expect(getBaseUrl()).toBe("https://www.ampdresume.com");
  });
});
