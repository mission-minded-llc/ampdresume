"use client";

import * as Sentry from "@sentry/react";

import { Box, Button, TextField, Typography } from "@mui/material";

import { LoadingOverlay } from "@/components/LoadingOverlay";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(new URLSearchParams(window.location.search).get("error"));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);

    e.preventDefault();

    await signIn("email", { email, callbackUrl: "/" }).catch((error) => {
      Sentry.captureException(error);
      setError(error.message);
      setIsSubmitting(false);
    });
  };

  return (
    <>
      {isSubmitting ? <LoadingOverlay open={isSubmitting} message="Signing in..." /> : null}
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
          {error ? (
            <Typography color="error" textAlign="center">
              An error occurred. Please try again later.
            </Typography>
          ) : null}
        </Box>
      </Box>
    </>
  );
}
