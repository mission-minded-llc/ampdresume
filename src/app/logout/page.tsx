"use client";

import { Container, Typography } from "@mui/material";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function LogoutPage() {
  useEffect(() => {
    // Trigger sign-out on page load
    signOut({ callbackUrl: "/" }); // Redirect to the home page after logging out
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography component="h1" variant="h4">
        Logging out...
      </Typography>
      <Typography sx={{ mt: "1rem" }}>You will be redirected shortly.</Typography>
    </Container>
  );
}
