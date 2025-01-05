import { NextRequest, NextResponse } from "next/server";
import { flagForDeletion, objectExists } from "../s3";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!req.body) {
    return NextResponse.json({ error: "No body" }, { status: 400 });
  }

  try {
    const data = await req.json();
    const { src } = data;

    if (!src) {
      return NextResponse.json({ error: "src is required" }, { status: 400 });
    }

    if (!src.startsWith("https://")) {
      return NextResponse.json({ error: "src must be an absolute URL" }, { status: 400 });
    }

    if (!src.startsWith(`https://${process.env.AWS_S3_BUCKET_NAME}/`)) {
      return NextResponse.json(
        { error: "src must be an absolute URL to the user's asset" },
        { status: 400 },
      );
    }

    const srcPath = src.replace(`https://${process.env.AWS_S3_BUCKET_NAME}/`, "");
    const srcPathDecoded = decodeURIComponent(srcPath);

    const srcParts = src.split("assets/user/");
    const objectLocation = srcParts[srcParts.length - 1];
    const userId = objectLocation.split("/")[0];

    if (userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const exists = await objectExists(srcPathDecoded);
    if (!exists) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    await flagForDeletion(srcPathDecoded);

    return NextResponse.json({ deleted: srcPathDecoded }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
