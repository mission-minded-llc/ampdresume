"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Box, Dialog, DialogContent } from "@mui/material";
import { OnboardingCoachCard } from "./OnboardingCoachCard";
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

  const coach = (
    <OnboardingCoachCard
      step={step}
      stepNumber={safeIndex + 1}
      stepCount={visibleSteps.length}
      onPrimary={goNext}
      onSecondary={step.secondaryLabel ? handleSecondary : undefined}
      onSkipTour={onComplete}
      onBack={goBack}
      showBack={safeIndex > 0 && step.id !== "welcome"}
    />
  );

  return (
    <>
      {step.kind === "spotlight" && step.target ? (
        <OnboardingSpotlight targetId={step.target} zIndex={step.openNav ? 1100 : 1300} />
      ) : null}

      {step.kind === "modal" || step.kind === "demo" ? (
        <Dialog
          open
          fullWidth
          maxWidth={step.kind === "demo" ? "md" : "sm"}
          onClose={() => {}}
          aria-labelledby="onboarding-dialog-title"
        >
          <DialogContent
            data-testid="OnboardingRoot"
            sx={{ pt: 3, pb: 2, maxHeight: "80vh" }}
          >
            {step.id === "skills-demo" ? <SkillsDemo /> : null}
            {step.id === "experience-demo" ? <ExperienceDemo /> : null}
            {step.id === "tips" ? <TipsSlide /> : null}
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>{coach}</Box>
          </DialogContent>
        </Dialog>
      ) : (
        <Box
          data-testid="OnboardingRoot"
          sx={{
            position: "fixed",
            zIndex: 1400,
            left: "50%",
            bottom: { xs: 16, sm: 24 },
            transform: "translateX(-50%)",
            pointerEvents: "auto",
          }}
        >
          {coach}
        </Box>
      )}
    </>
  );
};
