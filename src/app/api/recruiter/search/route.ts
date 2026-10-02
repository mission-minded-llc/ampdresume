import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/node";
import { getRecruiterAccess, parseCandidateSearchInput, searchCandidates } from "@/lib/recruiter";

export async function POST(req: NextRequest) {
  try {
    const access = await getRecruiterAccess();

    if (!access.ok) {
      return NextResponse.json({ error: access.error }, { status: access.status });
    }

    if (!access.profile) {
      return NextResponse.json(
        { error: "Create a recruiter profile before searching" },
        { status: 403 },
      );
    }

    let body: unknown = {};

    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const candidates = await searchCandidates(parseCandidateSearchInput(body));

    return NextResponse.json({ candidates });
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json({ error: "Could not search candidates" }, { status: 500 });
  }
}
