import { Typography } from "@mui/material";

export const ResumeTitle = ({ children }: { children: React.ReactNode }) => (
  <Typography
    component="h2"
    variant="h5"
    sx={{
      margin: "40px 0 20px",
      padding: "15px 0",
      borderTop: "1px solid gray",
      borderBottom: "1px solid gray",
      textAlign: "center",
      "@media screen and (max-width: $breakpoint_mobile)": {
        textAlign: "left",
      },
    }}
  >
    {children}
  </Typography>
);
