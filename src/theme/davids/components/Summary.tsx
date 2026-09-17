import { Box, useTheme } from "@mui/material";
import { RichTextBlock } from "@/theme/components/RichTextBlock";
import { User } from "@/types";
import { getProfessionalSummaryTitle, hasRichTextContent } from "@/lib/professionalSummary";
import { DavidsSectionTitle } from "./DavidsSectionTitle";

interface SummaryProps {
  user?: User;
}

export const Summary = ({ user }: SummaryProps) => {
  const theme = useTheme();

  if (!hasRichTextContent(user?.summary)) {
    return null;
  }

  return (
    <Box sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 0 } }}>
      <DavidsSectionTitle>{getProfessionalSummaryTitle(user?.summaryTitle)}</DavidsSectionTitle>

      <Box
        sx={{
          color: theme.palette.mode === "dark" ? "#94a3b8" : "#6b7280",
          lineHeight: 1.7,
          textAlign: "justify",
          maxWidth: "800px",
          margin: "0 auto",
          fontSize: "1rem",
        }}
      >
        <RichTextBlock content={user?.summary ?? null} />
      </Box>
    </Box>
  );
};
