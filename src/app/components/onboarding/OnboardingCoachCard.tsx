"use client";

import { Button, Paper, Typography, Box } from "@mui/material";
import { Icon } from "@iconify/react";
import { OnboardingStep } from "./steps";

type CoachActionsProps = {
  step: OnboardingStep;
  onPrimary: () => void;
  onSecondary?: () => void;
  onSkipTour: () => void;
  onBack?: () => void;
  showBack: boolean;
};

export const OnboardingCoachActions = ({
  step,
  onPrimary,
  onSecondary,
  onSkipTour,
  onBack,
  showBack,
}: CoachActionsProps) => {
  const secondaryAction = step.secondaryLabel
    ? onSecondary
    : step.id === "welcome" || step.id === "tips"
      ? undefined
      : onSkipTour;
  const secondaryLabel =
    step.secondaryLabel ??
    (step.id === "welcome" || step.id === "tips" ? undefined : "Skip tutorial");
  const isDone = step.id === "tips";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
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
        color={isDone ? "success" : "secondary"}
        startIcon={
          isDone ? (
            <Icon icon="fluent-color:checkmark-circle-20" width={20} height={20} aria-hidden />
          ) : undefined
        }
        onClick={onPrimary}
        data-testid="OnboardingNext"
        sx={
          isDone
            ? {
                "&:hover": {
                  boxShadow: "0 8px 22px rgba(46, 125, 50, 0.32)",
                },
              }
            : undefined
        }
      >
        {step.primaryLabel}
      </Button>
    </Box>
  );
};

export const OnboardingCoachCard = ({
  step,
  stepNumber,
  stepCount,
  onPrimary,
  onSecondary,
  onSkipTour,
  onBack,
  showBack,
  variant = "card",
}: CoachActionsProps & {
  stepNumber: number;
  stepCount: number;
  variant?: "card" | "header";
}) => {
  const instructions = (
    <>
      <Typography variant="overline" sx={{ color: "text.secondary", letterSpacing: 1 }}>
        {stepNumber} of {stepCount}
      </Typography>
      <Typography
        variant="h6"
        component="h2"
        id="onboarding-dialog-title"
        sx={{ mt: 0.5, mb: variant === "header" ? 0 : 1, fontWeight: 700 }}
      >
        {step.title}
      </Typography>
      <Typography
        variant="body2"
        sx={{ mb: variant === "header" ? 0 : 2, color: "text.secondary" }}
      >
        {step.body}
      </Typography>
    </>
  );

  const actions = (
    <OnboardingCoachActions
      step={step}
      onPrimary={onPrimary}
      onSecondary={onSecondary}
      onSkipTour={onSkipTour}
      onBack={onBack}
      showBack={showBack}
    />
  );

  if (variant === "header") {
    return <Box data-testid="OnboardingCoachCard">{instructions}</Box>;
  }

  return (
    <Paper
      elevation={8}
      data-testid="OnboardingCoachCard"
      sx={{
        width: { xs: "calc(100vw - 32px)", sm: 420 },
        maxWidth: "calc(100vw - 32px)",
        maxHeight: "calc(100dvh - 32px)",
        overflow: "auto",
        p: 2.5,
        borderRadius: 3,
        boxSizing: "border-box",
      }}
    >
      {instructions}
      {actions}
    </Paper>
  );
};
