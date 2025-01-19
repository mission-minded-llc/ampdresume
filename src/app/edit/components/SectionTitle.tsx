import { Box, Divider, Typography } from "@mui/material";

export const SectionTitle = ({ title }: { title: string }) => (
  <>
    <Divider sx={{ mb: 2 }} />
    <Box>
      <Typography variant="h5" component="h1">
        {title}
      </Typography>
    </Box>
    <Divider sx={{ mb: 4, mt: 2 }} />
  </>
);
