import { Company } from "@/types";
import { firmLineTrailing, formatTenure } from "./tenure";
import { expect } from "@jest/globals";

describe("formatTenure", () => {
  it("uses an en dash and Present when the role is open", () => {
    expect(formatTenure("1705825877364", null)).toBe("January 2024 \u2013 Present");
  });

  it("returns an empty string when the start date is missing", () => {
    expect(formatTenure(null, null)).toBe("");
  });
});

describe("firmLineTrailing", () => {
  const company = {
    location: "San Francisco, CA",
    startDate: "1705825877364",
    endDate: null,
    positions: [{ id: "role" }],
  } as Company;

  it("keeps the office location when roles carry their own dates", () => {
    expect(firmLineTrailing(company)).toBe("San Francisco, CA");
  });

  it("adds the firm tenure when there are no roles", () => {
    expect(firmLineTrailing({ ...company, positions: [] })).toBe(
      "San Francisco, CA \u00b7 January 2024 \u2013 Present",
    );
  });
});
