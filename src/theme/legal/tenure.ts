import { formatLongDate } from "@/lib/format";
import { Company } from "@/types";

/**
 * States a date range the way a legal resume does: month and year, an en dash,
 * and Present when the role is still open.
 *
 * @param startDate Timestamp for the beginning of the role.
 * @param endDate Timestamp for the end, or null when the role is current.
 * @returns The tenure phrase, or an empty string when no start date is available.
 */
export const formatTenure = (
  startDate: string | null | undefined,
  endDate: string | null | undefined,
): string => {
  const start = formatLongDate(startDate);
  if (!start) return "";

  const end = endDate ? formatLongDate(endDate) : "Present";
  return `${start} \u2013 ${end}`;
};

/**
 * Right-hand side of a firm line. Office location stays when roles carry their own
 * dates; otherwise the firm's own tenure stands in.
 *
 * @param company Employer record from the resume.
 * @returns The location, an unscoped tenure, or both. Empty when neither is known.
 */
export const firmLineTrailing = (company: Company): string => {
  const tenure = company.positions?.length ? "" : formatTenure(company.startDate, company.endDate);
  return [company.location, tenure].filter(Boolean).join(" \u00b7 ");
};
