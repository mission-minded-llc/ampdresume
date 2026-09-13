"use client";

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import * as Sentry from "@sentry/react";
import { LoadingOverlay } from "@/components/LoadingOverlay";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!window?.location) return;

    const errParam = new URLSearchParams(window.location.search).get("error");

    if (errParam) setError(errParam);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);

    e.preventDefault();

    await signIn("email", { email, callbackUrl: "/edit/profile" }).catch((error) => {
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
            borderRadius: "24px",
            p: { xs: 3, sm: 4 },
            border: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h5" component="h1" sx={{ fontWeight: 750, textAlign: "center" }}>
            Sign In
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: -1, textAlign: "center" }}>
            Magic link or social — it&apos;s free either way.
          </Typography>
          <TextField
            type="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            error={!!error}
            helperText={error}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)}
          >
            Sign in with Email
          </Button>
          {error ? (
            <Typography color="error" sx={{ textAlign: "center" }}>
              An error occurred. Please try again later.
            </Typography>
          ) : null}

          <Divider />
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Or sign in with a social account:
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => signIn("google", { callbackUrl: "/edit/profile" })}
          >
            <Icon
              icon="flat-color-icons:google"
              width={24}
              height={24}
              style={{ marginRight: 8 }}
            />
            Google
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => signIn("linkedin", { callbackUrl: "/edit/profile" })}
          >
            <Icon icon="devicon:linkedin" width={24} height={24} style={{ marginRight: 8 }} />
            LinkedIn
          </Button>
        </Box>
      </Box>
    </>
  );
}
