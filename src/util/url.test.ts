import { getBaseUrl, getEnvironmentName, validateUrl } from "@/util/url";
import { expect, describe, it } from "@jest/globals";

describe("url helpers", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("returns NEXT_PUBLIC_BASE_URL when set", () => {
    process.env.NEXT_PUBLIC_BASE_URL = "https://example.com";
    expect(getBaseUrl()).toBe("https://example.com");
  });

  it("returns the default URL if NEXT_PUBLIC_BASE_URL is not set", () => {
    delete process.env.NEXT_PUBLIC_BASE_URL;
    expect(getBaseUrl()).toBe("https://www.ampdresume.com");
  });

  it("returns NEXT_PUBLIC_ENVIRONMENT_NAME when set", () => {
    process.env.NEXT_PUBLIC_ENVIRONMENT_NAME = "staging";
    expect(getEnvironmentName()).toBe("staging");
  });

  it("defaults the environment name to production", () => {
    delete process.env.NEXT_PUBLIC_ENVIRONMENT_NAME;
    expect(getEnvironmentName()).toBe("production");
  });

  it("validates complete URLs and the https:// stub", () => {
    expect(validateUrl("https://")).toBe(true);
    expect(validateUrl("https://www.ampdresume.com/edit")).toBe(true);
    expect(validateUrl("www.example.com")).toBe(true);
    expect(validateUrl("not a url")).toBe(false);
  });
});
