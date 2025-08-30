import dayjs from "dayjs";
import { formatLongDate } from "@/lib/format";
import { expect } from "@jest/globals";

describe("formatDate", () => {
  it("should return an empty string for null or undefined timestamp", () => {
    expect(formatLongDate(null)).toBe("");
    expect(formatLongDate(undefined)).toBe("");
  });

  it("should format the timestamp correctly", () => {
    const timestamp = "1633132800000"; // October 2, 2021
    expect(formatLongDate(timestamp)).toBe("October 2021");
  });

  it("should format a Dayjs object correctly", () => {
    const dayjsObj = dayjs("2021-10-01");
    expect(formatLongDate(dayjsObj)).toBe("October 2021");
  });

  it("should format a numeric string correctly", () => {
    const timestamp = "1633132800000"; // October 2, 2021
    expect(formatLongDate(timestamp)).toBe("October 2021");
  });

  it("should format a standard date string correctly", () => {
    const dateStr = "2021-10-01";
    expect(formatLongDate(dateStr)).toBe("October 2021");
  });
});
