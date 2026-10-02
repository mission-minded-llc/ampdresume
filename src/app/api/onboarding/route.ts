/**
 * Onboarding preference endpoint.
 * Tracks which first-run tutorial the signed-in user still needs.
 */
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/node";
import { authOptions } from "@/lib/auth";
import { isFeatureEnabledForUser, setFeatureEnabledForUser } from "@/lib/featureFlags";
import { claimFirstTutorial, type OnboardingStatus } from "@/lib/onboardingTutorial";

/**
 * Reads both tutorial flags. When a new account still has both unfinished,
 * the workspace that asked keeps its tutorial and clears the other one.
 *
 * @param req Request whose `X-Onboarding-Entry` header is `resume` or `recruiter`.
 * @returns The pending flags after any first-visit choice.
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const current = await readOnboardingStatus();
    const claimed = claimFirstTutorial(req.headers.get("x-onboarding-entry"), current);

    if (claimed.changed) {
      await writeOnboardingStatus(session.user.id, claimed.status);
    }

    return NextResponse.json(claimed.status, { status: 200 });
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json({ error: "Failed to load onboarding status" }, { status: 500 });
  }
}

/**
 * Turns a tutorial back on or marks it finished. Omitted flags stay as they are.
 *
 * @param req JSON body with optional `pending` and `recruiterPending` booleans.
 * @returns Both pending flags after the update.
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as { pending?: unknown; recruiterPending?: unknown };
    const pending = readFlag(body.pending);
    const recruiterPending = readFlag(body.recruiterPending);

    if (pending === "invalid" || recruiterPending === "invalid") {
      return NextResponse.json(
        { error: "pending and recruiterPending must be booleans" },
        { status: 400 },
      );
    }

    if (pending === undefined && recruiterPending === undefined) {
      return NextResponse.json(
        { error: "pending or recruiterPending is required" },
        { status: 400 },
      );
    }

    if (pending !== undefined) {
      await setFeatureEnabledForUser("onboarding_pending", pending, session.user.id);
    }

    if (recruiterPending !== undefined) {
      await setFeatureEnabledForUser(
        "recruiter_onboarding_pending",
        recruiterPending,
        session.user.id,
      );
    }

    return NextResponse.json(await readOnboardingStatus(), { status: 200 });
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json({ error: "Failed to update onboarding status" }, { status: 500 });
  }
}

/**
 * Accepts a tutorial flag from JSON, or reports that the field was unusable.
 *
 * @param value Raw JSON field. Missing fields stay unset.
 * @returns The boolean, undefined when the field was omitted, or invalid.
 */
function readFlag(value: unknown): boolean | undefined | "invalid" {
  if (value === undefined) return undefined;
  if (typeof value === "boolean") return value;
  return "invalid";
}

/**
 * Loads whether each first-run tutorial is still unfinished.
 *
 * @returns Resume and recruiter pending flags for the signed-in user.
 */
async function readOnboardingStatus(): Promise<OnboardingStatus> {
  const [pending, recruiterPending] = await Promise.all([
    isFeatureEnabledForUser("onboarding_pending"),
    isFeatureEnabledForUser("recruiter_onboarding_pending"),
  ]);

  return { pending, recruiterPending };
}

/**
 * Stores the tutorial choice made on a first visit.
 *
 * @param userId Account whose flags are being claimed.
 * @param status Flags to persist.
 */
async function writeOnboardingStatus(userId: string, status: OnboardingStatus) {
  await setFeatureEnabledForUser("onboarding_pending", status.pending, userId);
  await setFeatureEnabledForUser("recruiter_onboarding_pending", status.recruiterPending, userId);
}
