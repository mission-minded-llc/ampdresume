import { Box } from "@mui/material";
import { getLegalPalette } from "../styles";

/**
 * Heavy rule over a hairline, the stationery rule under a law-firm letterhead.
 *
 * @param color Ink used for both rules. When omitted, the chambers rule colour is used.
 * @returns The paired rules.
 */
export const OxfordRule = ({ color }: { color?: string }) => (
  <Box aria-hidden="true" sx={{ mt: 1.5 }}>
    <Box
      sx={(theme) => ({
        borderTop: `3px solid ${color ?? getLegalPalette(theme.palette.mode).rule}`,
      })}
    />
    <Box
      sx={(theme) => ({
        borderTop: `1px solid ${color ?? getLegalPalette(theme.palette.mode).rule}`,
        mt: "3px",
      })}
    />
  </Box>
);
