"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Box, Dialog, DialogContent, Modal } from "@mui/material";
import { OnboardingAnchoredCard } from "./OnboardingAnchoredCard";
import { OnboardingCoachActions, OnboardingCoachCard } from "./OnboardingCoachCard";
import { OnboardingSpotlight } from "./OnboardingSpotlight";
import { ExperienceDemo } from "./demos/ExperienceDemo";
import { SkillsDemo } from "./demos/SkillsDemo";
import { TipsSlide } from "./demos/TipsSlide";
import { NavTourId, useNavPrimary } from "./NavPrimaryContext";
import { ONBOARDING_STEPS } from "./steps";

const isNavTourId = (value: string | undefined): value is NavTourId =>
  value === "nav-menu-button" ||
  value === "edit-resume-section" ||
  value === "import-pdf" ||
  value === "restart-tutorial";

export const OnboardingTour = ({
  didImport,
  onComplete,
}: {
  didImport: boolean;
  onComplete: () => void;
}) => {
  const nav = useNavPrimary();
  const router = useRouter();
  const pathname = usePathname();
  const [stepIndex, setStepIndex] = useState(0);
  const importNavigated = useRef(false);

  const visibleSteps = useMemo(
    () => ONBOARDING_STEPS.filter((step) => !(step.skipWhenImported && didImport)),
    [didImport],
  );

  const safeIndex = Math.min(stepIndex, visibleSteps.length - 1);
  const step = visibleSteps[safeIndex];

  useEffect(() => {
    if (!nav) return;

    const shouldLock = Boolean(step.openNav);
    nav.setLockOpen(shouldLock);
    nav.setOpen(shouldLock);
    nav.setHighlightId(isNavTourId(step.target) ? step.target : null);

    return () => {
      nav.setLockOpen(false);
      nav.setHighlightId(null);
    };
  }, [nav, step.openNav, step.target]);

  useEffect(() => {
    if (step.id !== "import" || importNavigated.current) return;
    if (pathname === "/edit/import") return;

    importNavigated.current = true;
    router.push("/edit/import");
  }, [step.id, pathname, router]);

  useEffect(() => {
    if (didImport && step.id === "import") {
      const tipsIndex = visibleSteps.findIndex((item) => item.id === "tips");
      if (tipsIndex >= 0) setStepIndex(tipsIndex);
    }
  }, [didImport, step.id, visibleSteps]);

  const goNext = () => {
    if (safeIndex >= visibleSteps.length - 1) {
      onComplete();
      return;
    }
    setStepIndex(safeIndex + 1);
  };

  const goBack = () => {
    setStepIndex((current) => Math.max(0, current - 1));
  };

  const handleSecondary = () => {
    if (step.id === "welcome") {
      onComplete();
      return;
    }
    goNext();
  };

  const coachActionProps = {
    step,
    onPrimary: goNext,
    onSecondary: step.secondaryLabel ? handleSecondary : undefined,
    onSkipTour: onComplete,
    onBack: goBack,
    showBack: safeIndex > 0 && step.id !== "welcome",
  };

  const isPanel = step.kind === "demo" || step.id === "tips";

  const coach = (
    <OnboardingCoachCard
      {...coachActionProps}
      stepNumber={safeIndex + 1}
      stepCount={visibleSteps.length}
      variant={isPanel ? "header" : "card"}
    />
  );
  const panelChromeSx = (theme: { palette: { mode: string } }) => ({
    bgcolor: theme.palette.mode === "dark" ? "#16131B" : "#F3F0EC",
    px: 3,
    borderColor: "divider",
    flexShrink: 0,
  });

  return (
    <>
      {step.kind === "spotlight" && step.target ? (
        <OnboardingSpotlight
          targetId={step.target}
          zIndex={step.openNav ? 1100 : 1300}
          showRing={
            step.target !== "edit-resume-section" &&
            step.target !== "nav-menu-button" &&
            step.target !== "import-pdf"
          }
        />
      ) : null}

      {isPanel ? (
        <Dialog
          open
          fullWidth
          maxWidth={step.kind === "demo" ? "md" : "sm"}
          onClose={() => {}}
          aria-labelledby="onboarding-dialog-title"
          slotProps={{
            paper: {
              sx: {
                maxHeight: "80vh",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              },
            },
          }}
        >
          <Box
            data-testid="OnboardingDemoHeader"
            sx={(theme) => ({
              ...panelChromeSx(theme),
              pt: 2.5,
              pb: 2,
              borderBottom: 1,
            })}
          >
            {coach}
          </Box>
          <DialogContent data-testid="OnboardingRoot" sx={{ p: 0, flex: 1, overflowY: "auto" }}>
            <Box sx={{ px: 3, py: 2 }}>
              {step.id === "skills-demo" ? <SkillsDemo /> : null}
              {step.id === "experience-demo" ? <ExperienceDemo /> : null}
              {step.id === "tips" ? <TipsSlide /> : null}
            </Box>
          </DialogContent>
          <Box
            data-testid="OnboardingDemoFooter"
            sx={(theme) => ({
              ...panelChromeSx(theme),
              py: 2,
              borderTop: 1,
            })}
          >
            <OnboardingCoachActions {...coachActionProps} />
          </Box>
        </Dialog>
      ) : step.kind === "modal" ? (
        <Modal open onClose={() => {}} aria-labelledby="onboarding-dialog-title">
          <Box
            data-testid="OnboardingRoot"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              outline: "none",
            }}
          >
            {coach}
          </Box>
        </Modal>
      ) : (
        <OnboardingAnchoredCard targetId={step.target} placement={step.placement}>
          {coach}
        </OnboardingAnchoredCard>
      )}
    </>
  );
};
