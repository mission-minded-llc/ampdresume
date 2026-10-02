import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/node";
import {
  getRecruiterAccess,
  parseRecruiterProfileInput,
  saveRecruiterProfile,
} from "@/lib/recruiter";

async function readJson(req: NextRequest) {
  try {
    return await req.json();
  } catch (error) {
    Sentry.captureException(error);
    return null;
  }
}

export async function GET() {
  const access = await getRecruiterAccess();

  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  return NextResponse.json({ profile: access.profile });
}

export async function POST(req: NextRequest) {
  try {
    const access = await getRecruiterAccess();

    if (!access.ok) {
      return NextResponse.json({ error: access.error }, { status: access.status });
    }

    const parsed = parseRecruiterProfileInput(await readJson(req));

    if ("error" in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const profile = await saveRecruiterProfile(access.userId, parsed);

    return NextResponse.json({ profile });
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json({ error: "Could not save recruiter profile" }, { status: 500 });
  }
}
