import React from "react";
import { Typography } from "@mui/material";

interface AccordionSummaryContentProps {
  primary: string;
  secondary?: string;
  dateRange?: string;
}

/**
 * Renders summary content for both desktop and mobile views in an accordion.
 * - primary: Main label (e.g., company name, school, position title)
 * - secondary: Sub label (e.g., location, degree)
 * - dateRange: Date or date range string
 */
export const AccordionSummaryContent: React.FC<AccordionSummaryContentProps> = ({
  primary,
  secondary,
  dateRange,
}) => (
  <>
    {/* Desktop */}
    <Typography
      component="p"
      variant="body1"
      sx={{
        display: { xs: "none", sm: "block" },
        fontSize: { xs: "1rem", sm: "1.25rem" },
      }}
    >
      <strong>{primary}</strong>
      {secondary ? (
        <>
          &nbsp;-&nbsp;<span>({secondary})</span>&nbsp;
        </>
      ) : (
        " "
      )}
      {dateRange && <> &mdash; {dateRange}</>}
    </Typography>
    {/* Mobile */}
    <Typography
      component="p"
      variant="body1"
      sx={{
        display: { xs: "block", sm: "none" },
        fontSize: { xs: "1rem", sm: "1.25rem" },
        width: "100%",
      }}
    >
      <strong>{primary}</strong>
      {secondary && (
        <>
          <br />
          {secondary}
        </>
      )}
      {dateRange && (
        <>
          <br />
          <em>{dateRange}</em>
        </>
      )}
    </Typography>
  </>
);
