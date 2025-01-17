import { Box } from "@mui/material";
import { EditPageNav } from "./EditPageNav";

export const EditPageLayout = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ mb: 10 }}>
    <EditPageNav />
    {children}
  </Box>
);
