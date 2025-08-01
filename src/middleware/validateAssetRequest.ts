import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { objectExists } from "@/lib/s3";

export type AssetAction = (srcPathDecoded: string) => Promise<void>;

export async function handleAssetRequest(req: NextRequest, action: AssetAction) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!req.body) {
    return NextResponse.json({ error: "No body" }, { status: 400 });
  }

  try {
    const { src } = await req.json();

    if (!src) {
      return NextResponse.json({ error: "src is required" }, { status: 400 });
    }

    if (!src.startsWith("https://")) {
      return NextResponse.json({ error: "src must be an absolute URL" }, { status: 400 });
    }

    const bucketUrl = `https://${process.env.AWS_S3_BUCKET_NAME}/`;
    if (!src.startsWith(bucketUrl)) {
      return NextResponse.json(
        { error: "src must be an absolute URL to the user's asset" },
        { status: 400 },
      );
    }

    const srcPath = src.replace(bucketUrl, "");
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

    await action(srcPathDecoded);

    return NextResponse.json({ success: true, path: srcPathDecoded }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
