"use client";

import { createContext, useContext } from "react";

export type OnboardingContextValue = {
  isOnboardingActive: boolean;
  isOnboardingStatusResolved: boolean;
  didImport: boolean;
  restartOnboarding: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
  notifyImported: () => void;
};

const defaultValue: OnboardingContextValue = {
  isOnboardingActive: false,
  isOnboardingStatusResolved: true,
  didImport: false,
  restartOnboarding: async () => {},
  completeOnboarding: async () => {},
  notifyImported: () => {},
};

export const OnboardingContext = createContext<OnboardingContextValue>(defaultValue);

export const useOnboarding = () => useContext(OnboardingContext);
