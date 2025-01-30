import dayjs, { Dayjs } from "dayjs";

/**
 * Helper to format a date string to a long date string.
 *
 * @param {string} dateStr the date string to format.
 * @returns {string} the formatted date string with long month and year.
 */
export const formatLongDate = (dateStr: Dayjs | string | null | undefined) => {
  if (!dateStr) return "";

  // If dateStr is already a Dayjs object, format it.
  if (dayjs.isDayjs(dateStr)) {
    return (dateStr as Dayjs).format("MMMM YYYY");
  }

  // If dateStr is all numeric, convert it to a date string.
  if (!isNaN(dateStr as unknown as number)) {
    return dayjs(new Date(parseInt(dateStr as string, 10))).format("MMMM YYYY");
  }

  // Handle all other cases.
  return dayjs(dateStr).format("MMMM YYYY");
};

/**
 * Helper to format a date string to a short date string.
 *
 * @param {string} dateStr the date string to format.
 * @returns {string} the formatted date string with short month and year in numeric format.
 */
export const formatShortDate = (dateStr: Dayjs | string | null | undefined) => {
  if (!dateStr) return "";

  // If dateStr is already a Dayjs object, format it.
  if (dayjs.isDayjs(dateStr)) {
    return (dateStr as Dayjs).format("YYYY-MM");
  }

  // If dateStr is all numeric, convert it to a date string.
  if (!isNaN(dateStr as unknown as number)) {
    return dayjs(new Date(parseInt(dateStr as string, 10))).format("YYYY-MM");
  }

  // Handle all other cases.
  return dayjs(dateStr).format("YYYY-MM");
};

/**
 * Helper to convert a timestamp to a date.
 *
 * @param {string} timestamp the timestamp to convert.
 * @returns {Date} the date object.
 */
export const timestampToDate = (timestamp: string | number | null | undefined) => {
  if (!timestamp) return null;

  if (typeof timestamp === "number") return new Date(timestamp);

  return new Date(parseInt(timestamp, 10));
};
