"use client";

import { Button, Paper, Typography, Box } from "@mui/material";
import { OnboardingStep } from "./steps";

export const OnboardingCoachCard = ({
  step,
  stepNumber,
  stepCount,
  onPrimary,
  onSecondary,
  onSkipTour,
  onBack,
  showBack,
}: {
  step: OnboardingStep;
  stepNumber: number;
  stepCount: number;
  onPrimary: () => void;
  onSecondary?: () => void;
  onSkipTour: () => void;
  onBack?: () => void;
  showBack: boolean;
}) => {
  const secondaryAction = step.secondaryLabel
    ? onSecondary
    : step.id === "welcome"
      ? undefined
      : onSkipTour;
  const secondaryLabel =
    step.secondaryLabel ?? (step.id === "welcome" ? undefined : "Skip tutorial");

  return (
    <Paper
      elevation={8}
      data-testid="OnboardingCoachCard"
      sx={{
        width: { xs: "calc(100vw - 32px)", sm: 420 },
        maxWidth: "100%",
        p: 2.5,
        borderRadius: 3,
      }}
    >
      <Typography variant="overline" sx={{ color: "text.secondary", letterSpacing: 1 }}>
        {stepNumber} of {stepCount}
      </Typography>
      <Typography
        variant="h6"
        component="h2"
        id="onboarding-dialog-title"
        sx={{ mt: 0.5, mb: 1, fontWeight: 700 }}
      >
        {step.title}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
        {step.body}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          {showBack && onBack ? (
            <Button color="inherit" onClick={onBack} data-testid="OnboardingBack">
              Back
            </Button>
          ) : null}
          {secondaryLabel && secondaryAction ? (
            <Button color="inherit" onClick={secondaryAction} data-testid="OnboardingSkip">
              {secondaryLabel}
            </Button>
          ) : null}
        </Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={onPrimary}
          data-testid="OnboardingNext"
        >
          {step.primaryLabel}
        </Button>
      </Box>
    </Paper>
  );
};
