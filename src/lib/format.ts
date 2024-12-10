export const formatDate = (timestamp: string | null | undefined) => {
  if (!timestamp) return "";

  const intTimestamp = parseInt(timestamp, 10);

  const date = new Date(intTimestamp).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return date.toString();
};
