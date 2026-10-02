import { expect } from "@jest/globals";
import { safeCallbackUrl } from "./safeCallbackUrl";

describe("safeCallbackUrl", () => {
  it("falls back when the value is missing", () => {
    expect(safeCallbackUrl(null)).toBe("/edit/profile");
    expect(safeCallbackUrl("")).toBe("/edit/profile");
  });

  it("allows a same-site path", () => {
    expect(safeCallbackUrl("/recruit")).toBe("/recruit");
  });

  it("rejects off-site targets", () => {
    expect(safeCallbackUrl("https://evil.example")).toBe("/edit/profile");
    expect(safeCallbackUrl("//evil.example")).toBe("/edit/profile");
    expect(safeCallbackUrl("/\\evil.example")).toBe("/edit/profile");
  });
});
