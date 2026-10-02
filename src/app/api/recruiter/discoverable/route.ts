import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/node";
import { authOptions } from "@/lib/auth";
import { parseDiscoverableInput, setRecruiterDiscoverable } from "@/lib/recruiter";

/**
 * Candidate consent. This does not require the recruiter beta flag — any
 * signed-in job seeker can opt in or out of the talent pool.
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let body: unknown = null;

    try {
      body = await req.json();
    } catch {
      body = null;
    }

    const parsed = parseDiscoverableInput(body);

    if ("error" in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    await setRecruiterDiscoverable(session.user.id, parsed.enabled);

    return NextResponse.json({ enabled: parsed.enabled });
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json({ error: "Could not update discoverability" }, { status: 500 });
  }
}
