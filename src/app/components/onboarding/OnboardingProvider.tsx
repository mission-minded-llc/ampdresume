"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  onboardingEntryForPath,
  visibleOnboardingTutorial,
  type OnboardingStatus,
  type OnboardingTutorial,
} from "@/lib/onboardingTutorial";
import { OnboardingContext } from "./OnboardingContext";
import { OnboardingTour } from "./OnboardingTour";
import { RECRUITER_ONBOARDING_STEPS } from "./steps";

const AUTH_PREFIXES = ["/login", "/logout"];

/**
 * Loads the signed-in user's tutorial flags for the workspace they are in.
 * The entry header lets a first visit keep one tutorial and clear the other.
 *
 * @param entry Workspace asking for the flags.
 * @returns Pending flags for the resume and recruiter tutorials.
 */
const fetchOnboarding = async (entry: OnboardingTutorial): Promise<OnboardingStatus> => {
  const res = await fetch("/api/onboarding", {
    headers: { "X-Onboarding-Entry": entry },
  });
  if (!res.ok) throw new Error("Failed to load onboarding");
  const body = (await res.json()) as Partial<OnboardingStatus>;
  return {
    pending: body.pending === true,
    recruiterPending: body.recruiterPending === true,
  };
};

/**
 * Shows the resume tutorial or the recruiter tutorial, and remembers when each is finished.
 *
 * @param children App content rendered behind the tutorial.
 * @returns The app content and the active tutorial, when one should be open.
 */
export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [tourKey, setTourKey] = useState(0);
  const [forcedTutorial, setForcedTutorial] = useState<OnboardingTutorial | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [didImport, setDidImport] = useState(false);

  const isAuthPage = AUTH_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  const sessionReady = status !== "loading";
  const isLoggedIn = status === "authenticated" && !!session?.user?.id;
  const entry = onboardingEntryForPath(pathname);

  const { data, isFetched } = useQuery({
    queryKey: ["onboarding", entry],
    queryFn: () => fetchOnboarding(entry),
    enabled: isLoggedIn && !isAuthPage,
    staleTime: 30_000,
  });

  const onboardingStatus = data ?? { pending: false, recruiterPending: false };
  const tutorial = dismissed
    ? null
    : visibleOnboardingTutorial(pathname, onboardingStatus, forcedTutorial);
  const isOnboardingStatusResolved = sessionReady && (!isLoggedIn || isAuthPage || isFetched);
  const isOnboardingActive = isLoggedIn && !isAuthPage && isFetched && tutorial !== null;

  const setPendingMutation = useMutation({
    mutationFn: async (body: Partial<OnboardingStatus>) => {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to update onboarding");
      return (await res.json()) as Partial<OnboardingStatus>;
    },
    onSuccess: (result) => {
      const apply = (current: OnboardingStatus | undefined): OnboardingStatus => ({
        pending: typeof result.pending === "boolean" ? result.pending : (current?.pending ?? false),
        recruiterPending:
          typeof result.recruiterPending === "boolean"
            ? result.recruiterPending
            : (current?.recruiterPending ?? false),
      });
      queryClient.setQueryData(["onboarding", "resume"], apply);
      queryClient.setQueryData(["onboarding", "recruiter"], apply);
    },
  });

  /**
   * Closes the open tutorial and marks that workspace's tour finished.
   *
   * @returns A promise that settles when the finished flag has been saved.
   */
  const completeOnboarding = useCallback(async () => {
    const finishing = tutorial;
    setDismissed(true);
    setForcedTutorial(null);
    try {
      await setPendingMutation.mutateAsync(
        finishing === "recruiter" ? { recruiterPending: false } : { pending: false },
      );
    } catch {
      // Keep the tour closed locally even if the flag write fails.
    }

    if (finishing === "recruiter") return;

    if (didImport) {
      router.push("/edit/experience");
      return;
    }

    if (pathname === "/edit/import") {
      router.push("/edit/profile");
    }
  }, [setPendingMutation, didImport, router, pathname, tutorial]);

  /**
   * Opens a tutorial again from the menu or the page that owns it.
   *
   * @param nextTutorial Workspace tutorial to replay. Resume when omitted.
   * @returns A promise that settles when that tutorial is marked unfinished.
   */
  const restartOnboarding = useCallback(
    async (nextTutorial: OnboardingTutorial = "resume") => {
      setDidImport(false);
      setDismissed(false);
      setForcedTutorial(nextTutorial);
      setTourKey((key) => key + 1);

      if (nextTutorial === "recruiter" && !pathname.startsWith("/recruit")) {
        router.push("/recruit");
      }

      if (nextTutorial === "resume" && pathname.startsWith("/recruit")) {
        router.push("/edit/profile");
      }

      await setPendingMutation.mutateAsync(
        nextTutorial === "recruiter" ? { recruiterPending: true } : { pending: true },
      );
    },
    [setPendingMutation, pathname, router],
  );

  /**
   * Remembers that the viewer imported a PDF so the resume tour can skip ahead.
   */
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
      {isOnboardingActive && tutorial ? (
        <OnboardingTour
          key={`${tutorial}-${tourKey}`}
          steps={tutorial === "recruiter" ? RECRUITER_ONBOARDING_STEPS : undefined}
          didImport={didImport}
          onComplete={completeOnboarding}
        />
      ) : null}
    </OnboardingContext.Provider>
  );
};
