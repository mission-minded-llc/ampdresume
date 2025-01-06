import { ALLOWED_USER_IMAGE_TYPES, MAX_USER_IMAGE_SIZE } from "@/constants";
import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { uploadObject } from "../../../../lib/s3";

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, we'll handle the multipart data
  },
};

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    if (!ALLOWED_USER_IMAGE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "File must be an image (JPEG, PNG, or GIF)" },
        { status: 400 },
      );
    }

    // Use ImageMagick or similar to validate image format.

    if (file.size > MAX_USER_IMAGE_SIZE) {
      return NextResponse.json({ error: "File size must be less than 2MB" }, { status: 400 });
    }

    // Generate a unique filename to prevent overwrites
    const timestamp = Date.now();
    const extension = file.type.split("/")[1];
    const uniqueFilename = `${timestamp}-${file.name.replace(/\.[^/.]+$/, "")}.${extension}`;

    // Convert File to Buffer for S3 upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const objectLocation = `assets/user/${session.user.id}/${uniqueFilename}`;

    await uploadObject(objectLocation, buffer, file.type);

    return NextResponse.json(
      {
        url: `https://${process.env.AWS_S3_BUCKET_NAME}/${objectLocation}`,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
