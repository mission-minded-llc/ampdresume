import dayjs from "dayjs";
import { parseDateString, validateAndConvertDate } from "./dateUtils";
import { expect } from "@jest/globals";

describe("dateUtils", () => {
  describe("validateAndConvertDate", () => {
    it("should convert a valid date to ISO string", () => {
      const validDate = dayjs("2024-03-15");
      const result = validateAndConvertDate(validDate);
      expect(result).toBe(validDate.toISOString());
    });

    it("should return empty string for null input", () => {
      const result = validateAndConvertDate(null);
      expect(result).toBe("");
    });

    it("should return empty string for invalid date", () => {
      const invalidDate = dayjs("invalid-date");
      const result = validateAndConvertDate(invalidDate);
      expect(result).toBe("");
    });

    it("should handle dates with time components", () => {
      const dateWithTime = dayjs("2024-03-15T14:30:00");
      const result = validateAndConvertDate(dateWithTime);
      expect(result).toBe(dateWithTime.toISOString());
    });
  });

  describe("parseDateString", () => {
    it("should parse a valid date string", () => {
      const dateString = "2024-03-15";
      const result = parseDateString(dateString);
      expect(result?.isValid()).toBe(true);
      expect(result?.format("YYYY-MM-DD")).toBe(dateString);
    });

    it("should return null for null input", () => {
      const result = parseDateString(null);
      expect(result).toBeNull();
    });

    it("should return null for undefined input", () => {
      const result = parseDateString(undefined);
      expect(result).toBeNull();
    });

    it("should return null for empty string", () => {
      const result = parseDateString("");
      expect(result).toBeNull();
    });

    it("should return null for invalid date string", () => {
      const result = parseDateString("invalid-date");
      expect(result).toBeNull();
    });

    it("should handle ISO date strings", () => {
      const isoString = "2024-03-15T14:30:00.000Z";
      const result = parseDateString(isoString);
      expect(result?.isValid()).toBe(true);
      expect(result?.toISOString()).toBe(isoString);
    });

    it("should handle dates with different formats", () => {
      const formats = ["2024-03-15", "03/15/2024", "15-03-2024", "2024/03/15"];

      formats.forEach((format) => {
        const result = parseDateString(format);
        expect(result?.isValid()).toBe(true);
      });
    });
  });
});
