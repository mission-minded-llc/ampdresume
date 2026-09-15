/**
 * Onboarding preference endpoint.
 * Tracks whether the signed-in user still needs the first-run tutorial.
 */
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/node";
import { authOptions } from "@/lib/auth";
import { isFeatureEnabledForUser, setFeatureEnabledForUser } from "@/lib/featureFlags";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const pending = await isFeatureEnabledForUser("onboarding_pending");
    return NextResponse.json({ pending }, { status: 200 });
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json({ error: "Failed to load onboarding status" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as { pending?: unknown };
    if (typeof body.pending !== "boolean") {
      return NextResponse.json({ error: "pending must be a boolean" }, { status: 400 });
    }

    await setFeatureEnabledForUser("onboarding_pending", body.pending, session.user.id);
    return NextResponse.json({ pending: body.pending }, { status: 200 });
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json({ error: "Failed to update onboarding status" }, { status: 500 });
  }
}
