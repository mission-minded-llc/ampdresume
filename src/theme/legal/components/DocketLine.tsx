import { ReactNode } from "react";
import { Box } from "@mui/material";

/**
 * One line of a legal resume: the fact on the left, the place or date on the right.
 *
 * @param primary The school, firm, degree, or role.
 * @param trailing Location or date, kept from wrapping onto its own line on wide screens.
 * @param emphasize When true, the primary fact is set as a heading line (school or firm).
 * @returns The two-column line.
 */
export const DocketLine = ({
  primary,
  trailing,
  emphasize = false,
}: {
  primary: ReactNode;
  trailing?: ReactNode;
  emphasize?: boolean;
}) => (
  <Box
    sx={(theme) => ({
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: 2,
      mt: emphasize ? 0 : 0.25,
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 0.25,
      },
    })}
  >
    <Box
      sx={{
        flex: "1 1 auto",
        minWidth: 0,
        fontWeight: emphasize ? 700 : 400,
        fontSize: emphasize ? "1.05rem" : "1rem",
      }}
    >
      {primary}
    </Box>
    {trailing ? (
      <Box sx={{ flex: "0 0 auto", textAlign: "right", color: "text.secondary" }}>{trailing}</Box>
    ) : null}
  </Box>
);
