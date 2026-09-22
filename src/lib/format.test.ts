import dayjs from "dayjs";
import { formatLongDate, formatShortDate, removeLeadingZero, timestampToDate } from "@/lib/format";
import { expect } from "@jest/globals";

describe("formatLongDate", () => {
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

describe("formatShortDate", () => {
  it("returns an empty string for empty values", () => {
    expect(formatShortDate(null)).toBe("");
    expect(formatShortDate(undefined)).toBe("");
  });

  it("formats Dayjs, numeric, and date-string values", () => {
    expect(formatShortDate(dayjs("2021-10-01"))).toBe("2021-10");
    expect(formatShortDate("1633132800000")).toBe("2021-10");
    expect(formatShortDate("2021-10-01")).toBe("2021-10");
  });
});

describe("timestampToDate", () => {
  it("returns null for empty values", () => {
    expect(timestampToDate(null)).toBeNull();
    expect(timestampToDate(undefined)).toBeNull();
    expect(timestampToDate("")).toBeNull();
  });

  it("converts numeric and string timestamps", () => {
    expect(timestampToDate(1633132800000)).toEqual(new Date(1633132800000));
    expect(timestampToDate("1633132800000")).toEqual(new Date(1633132800000));
  });
});

describe("removeLeadingZero", () => {
  it("strips a single leading zero and leaves other strings unchanged", () => {
    expect(removeLeadingZero("01")).toBe("1");
    expect(removeLeadingZero("10")).toBe("10");
  });
});
