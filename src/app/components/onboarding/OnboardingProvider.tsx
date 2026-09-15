"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { OnboardingContext } from "./OnboardingContext";
import { OnboardingTour } from "./OnboardingTour";

const AUTH_PREFIXES = ["/login", "/logout"];

const fetchOnboarding = async () => {
  const res = await fetch("/api/onboarding");
  if (!res.ok) throw new Error("Failed to load onboarding");
  return res.json() as Promise<{ pending: boolean }>;
};

export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [tourKey, setTourKey] = useState(0);
  const [forcedActive, setForcedActive] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [didImport, setDidImport] = useState(false);

  const isAuthPage = AUTH_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  const sessionReady = status !== "loading";
  const isLoggedIn = status === "authenticated" && !!session?.user?.id;

  const { data, isFetched } = useQuery({
    queryKey: ["onboarding"],
    queryFn: fetchOnboarding,
    enabled: isLoggedIn && !isAuthPage,
    staleTime: 30_000,
  });

  const pending = data?.pending === true;
  const isOnboardingStatusResolved = sessionReady && (!isLoggedIn || isAuthPage || isFetched);
  const isOnboardingActive =
    isLoggedIn && !isAuthPage && isFetched && !dismissed && (pending || forcedActive);

  const setPendingMutation = useMutation({
    mutationFn: async (pendingValue: boolean) => {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pending: pendingValue }),
      });
      if (!res.ok) throw new Error("Failed to update onboarding");
      return res.json() as Promise<{ pending: boolean }>;
    },
    onSuccess: (result) => {
      queryClient.setQueryData(["onboarding"], result);
    },
  });

  const completeOnboarding = useCallback(async () => {
    setDismissed(true);
    setForcedActive(false);
    try {
      await setPendingMutation.mutateAsync(false);
    } catch {
      // Keep the tour closed locally even if the flag write fails.
    }

    if (didImport) {
      router.push("/edit/experience");
      return;
    }

    if (pathname === "/edit/import") {
      router.push("/edit/profile");
    }
  }, [setPendingMutation, didImport, router, pathname]);

  const restartOnboarding = useCallback(async () => {
    setDidImport(false);
    setDismissed(false);
    setForcedActive(true);
    setTourKey((key) => key + 1);
    await setPendingMutation.mutateAsync(true);
  }, [setPendingMutation]);

  const notifyImported = useCallback(() => {
    setDidImport(true);
  }, []);

  const value = useMemo(
    () => ({
      isOnboardingActive,
      isOnboardingStatusResolved,
      didImport,
      restartOnboarding,
      completeOnboarding,
      notifyImported,
    }),
    [
      isOnboardingActive,
      isOnboardingStatusResolved,
      didImport,
      restartOnboarding,
      completeOnboarding,
      notifyImported,
    ],
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
      {isOnboardingActive ? (
        <OnboardingTour key={tourKey} didImport={didImport} onComplete={completeOnboarding} />
      ) : null}
    </OnboardingContext.Provider>
  );
};
