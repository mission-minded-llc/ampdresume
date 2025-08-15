import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

// Enable custom parse format plugin
dayjs.extend(customParseFormat);

/**
 * Validates a date and converts it to an ISO string if valid
 * @param date The date to validate and convert
 * @returns An ISO string if the date is valid, empty string otherwise
 */
export const validateAndConvertDate = (date: Dayjs | null): string => {
  if (date && date.isValid()) {
    return date.toISOString();
  }
  return "";
};

/**
 * Converts a date string to a Dayjs object if valid
 * @param dateString The date string to convert
 * @returns A Dayjs object if the date is valid, null otherwise
 */
export const parseDateString = (dateString: string | null | undefined): Dayjs | null => {
  if (!dateString) return null;

  // Try parsing with different formats
  const formats = [
    "YYYY-MM-DD",
    "MM/DD/YYYY",
    "DD-MM-YYYY",
    "YYYY/MM/DD",
    "YYYY-MM-DDTHH:mm:ss.SSSZ", // ISO format
  ];

  for (const format of formats) {
    const parsed = dayjs(dateString, format, true);
    if (parsed.isValid()) {
      return parsed;
    }
  }

  // If no format matches, try default parsing
  const defaultParsed = dayjs(dateString);
  return defaultParsed.isValid() ? defaultParsed : null;
};
