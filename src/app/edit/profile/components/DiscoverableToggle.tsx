"use client";

import { useState } from "react";
import { Box, FormControlLabel, Switch, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

/**
 * A toggle that allows recruiters to find the user in the talent pool.
 *
 * @param enabled Whether the user is discoverable.
 * @returns A toggle that allows recruiters to find the user in the talent pool.
 */
export function DiscoverableToggle({ enabled }: { enabled: boolean }) {
  const [checked, setChecked] = useState(enabled);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const update = async (next: boolean) => {
    setChecked(next);
    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/recruiter/discoverable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: next }),
      });

      if (!response.ok) {
        setChecked(!next);
        setError("Could not update recruiter visibility");
      }
    } catch {
      setChecked(!next);
      setError("Could not update recruiter visibility");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box
      sx={(theme) => ({
        mb: 4,
        p: 2,
        borderRadius: "16px",
        border: `1px solid ${checked ? theme.palette.success.main : theme.palette.divider}`,
        bgcolor: checked ? alpha(theme.palette.success.main, 0.12) : undefined,
        width: { xs: "100%", sm: 360 },
        flexShrink: 0,
      })}
    >
      <Typography variant="h6" component="h2" sx={{ mb: 0.5 }}>
        Recruiter search
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1, lineHeight: 1.6 }}>
        Your public resume link works either way. This only controls whether you show up in search.
        Any signed-in user with a recruiter desk can search the pool. It stays off until you turn it
        on.
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            color="success"
            disabled={saving}
            onChange={(event) => {
              void update(event.target.checked);
            }}
          />
        }
        label="Allow recruiters to find me"
      />
      {error ? (
        <Typography color="error" variant="body2" role="alert">
          {error}
        </Typography>
      ) : null}
    </Box>
  );
}
