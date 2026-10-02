import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/node";
import {
  consumeRecruiterSearch,
  getRecruiterAccess,
  parseCandidateSearchInput,
  searchCandidates,
} from "@/lib/recruiter";

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

    const parsed = parseCandidateSearchInput(body);

    if ("error" in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const limit = consumeRecruiterSearch(access.userId);

    if (!limit.ok) {
      return NextResponse.json({ error: limit.error }, { status: 429 });
    }

    const candidates = await searchCandidates(parsed);

    return NextResponse.json({ candidates });
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json({ error: "Could not search candidates" }, { status: 500 });
  }
}
