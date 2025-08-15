import { Box, Typography } from "@mui/material";
import { SectionTitle } from "../components/SectionTitle";

export const PageHeading = () => (
  <>
    <SectionTitle title="Import from PDF" />
    <Box sx={{ mb: 4 }}>
      <Typography>
        Do you have a PDF resume that you want to import? Upload it here and we will extract the
        information for you. Please note that the extraction may not be perfect, and you may need to
        review and edit the information after import.
      </Typography>
    </Box>
  </>
);
