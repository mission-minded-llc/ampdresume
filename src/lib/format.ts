export const formatDate = (dateStr: string | null | undefined) => {
  if (!dateStr) return "";

  // If dateStr is in YYYY-MM format, convert it to a timestamp.
  if (dateStr.includes("-")) {
    const [year, month] = dateStr.split("-");
    dateStr = new Date(parseInt(year, 10), parseInt(month, 10) - 1).getTime().toString();
  }

  const intTimestamp = parseInt(dateStr, 10);

  // This is a workaround to fix the issue where the date is off by one month.
  // The issue is caused by the date being in UTC.
  const twoDays = 2 * 24 * 60 * 60 * 1000;

  const date = new Date(intTimestamp + twoDays).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return date.toString();
};
