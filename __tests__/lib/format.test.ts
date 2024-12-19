import { formatDate } from "@/lib/format";

describe("formatDate", () => {
  it("should return an empty string for null or undefined timestamp", () => {
    expect(formatDate(null)).toBe("");
    expect(formatDate(undefined)).toBe("");
  });

  it("should format the timestamp correctly", () => {
    const timestamp = "1633046400000"; // October 1, 2021
    expect(formatDate(timestamp)).toBe("October 2021");
  });
});
