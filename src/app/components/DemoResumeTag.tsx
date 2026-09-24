import { Box, Chip } from "@mui/material";
import { appBrand } from "@/app/theme/createAppTheme";

/** Compact Demo chip used next to View PDF and Generate PDF. */
export const DemoResumeChip = () => (
  <Chip
    label="Demo"
    size="small"
    aria-label="Demo resume"
    data-testid="demo-resume-tag"
    sx={{
      bgcolor: appBrand.orange,
      color: "#2A2430",
      fontWeight: 600,
      "& .MuiChip-label": { color: "#2A2430" },
    }}
  />
);

/**
 * Page-chrome label for PDF previews. Kept out of PDF document
 * content so html2pdf and print do not include it.
 */
export const DemoResumeTag = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      mb: 2,
      "@media print": { display: "none" },
    }}
  >
    <DemoResumeChip />
  </Box>
);
