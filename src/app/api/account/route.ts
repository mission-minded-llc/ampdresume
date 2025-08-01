/**
 * Account management endpoint - kept as REST API due to:
 * - Complex validation logic (slug format, uniqueness checks)
 * - Session-based user updates (not typical GraphQL pattern)
 * - Distinct from resume data management (GraphQL's primary focus)
 */

import * as Sentry from "@sentry/node";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, slug, displayEmail, title, location, siteTitle, siteDescription, siteImage } =
      await req.json();
    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
    }

    // Ensure the slug is alphanumeric and lowercase, with hyphens for spaces.
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        { error: "Slug must be alphanumeric and lowercase. Hyphens allowed." },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
      },
    });

    if (existingUser && existingUser.id !== session.user.id) {
      return NextResponse.json({ error: "Slug is already taken" }, { status: 400 });
    }

    const data = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: name || null,
        slug: slug || null,
        displayEmail: displayEmail || null,
        title: title || null,
        location: location || null,
        siteTitle: siteTitle || null,
        siteDescription: siteDescription || null,
        siteImage: siteImage || null,
      },
    });

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    Sentry.captureException(error);

    return NextResponse.json({ error }, { status: 500 });
  }
}
