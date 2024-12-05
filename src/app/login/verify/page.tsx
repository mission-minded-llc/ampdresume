"use client";

import { Box, Typography } from "@mui/material";

export default function SignIn() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 3,
      }}
    >
      <Typography variant="h5" component="h1" textAlign="center">
        Check Your Email
      </Typography>
      <br />
      <Typography component="p" textAlign="center">
        We&apos;ve sent you a sign in link to your email address. Click the link in your email to
        sign in.
      </Typography>
    </Box>
  );
}
