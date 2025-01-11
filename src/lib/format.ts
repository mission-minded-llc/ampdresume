export const formatDate = (timestamp: string | null | undefined) => {
  if (!timestamp) return "";

  const intTimestamp = parseInt(timestamp, 10);

  // This is a workaround to fix the issue where the date is off by one month.
  // The issue is caused by the date being in UTC.
  const twoDays = 2 * 24 * 60 * 60 * 1000;

  const date = new Date(intTimestamp + twoDays).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return date.toString();
};
