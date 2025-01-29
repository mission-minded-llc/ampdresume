export const formatDate = (dateStr: object | string | null | undefined) => {
  if (!dateStr) return "";

  if (typeof dateStr !== "string") {
    dateStr = dateStr.toString();
  }

  // If dateStr is in YYYY-MM format, convert it to a timestamp.
  if (dateStr.includes("-")) {
    const [year, month] = dateStr.split("-");
    dateStr = new Date(parseInt(year, 10), parseInt(month, 10) - 1).getTime().toString();
  }

  const date = new Date(parseInt(dateStr, 10)).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return date.toString();
};
