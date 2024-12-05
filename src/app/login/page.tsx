"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

export default function SignIn() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn("email", { email, callbackUrl: "/" });
  };

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
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: 400,
          bgcolor: "background.paper",
          boxShadow: 3,
          borderRadius: 2,
          p: 3,
        }}
      >
        <Typography variant="h5" component="h1" textAlign="center">
          Sign In
        </Typography>
        <TextField
          type="email"
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign in with Email
        </Button>
      </Box>
    </Box>
  );
}
