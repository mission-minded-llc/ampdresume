import { Typography } from "@mui/material";
import dayjs from "dayjs";

interface AccordionHeaderProps {
  title: string;
  subtitle?: string;
  startDate?: string;
  endDate?: string;
  isExpanded: boolean;
}

export const AccordionHeader = ({
  title,
  subtitle,
  startDate,
  endDate,
  isExpanded,
}: AccordionHeaderProps) => {
  return (
    <Typography sx={{ display: "flex", flexDirection: "row", gap: 2, alignItems: "center" }}>
      <strong>{title}</strong>
      <span
        style={{
          opacity: !isExpanded ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
          display: "flex",
          flexDirection: "row",
          gap: 2,
          alignItems: "center",
        }}
      >
        {subtitle && <span>{subtitle}</span>}
        <em style={{ marginLeft: "auto", display: "flex", flexDirection: "row", gap: 2 }}>
          {startDate ? `${dayjs(startDate).format("MMM YYYY")}` : ""}
          {endDate ? ` - ${dayjs(endDate).format("MMM YYYY")}` : startDate ? " - Present" : ""}
        </em>
      </span>
    </Typography>
  );
};
