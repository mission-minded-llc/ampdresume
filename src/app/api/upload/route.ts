import { ALLOWED_USER_IMAGE_TYPES, MAX_USER_IMAGE_SIZE } from "@/constants";
import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, we'll handle the multipart data
  },
};

export async function POST(req: NextRequest) {
  if (
    !process.env?.AWS_REGION ||
    !process.env?.AWS_S3_USER_ACCESS_KEY_ID ||
    !process.env?.AWS_S3_USER_SECRET_ACCESS_KEY ||
    !process.env?.AWS_S3_BUCKET_NAME
  ) {
    return NextResponse.json({ error: "AWS environment variables are required." }, { status: 500 });
  }

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

    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_S3_USER_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_USER_SECRET_ACCESS_KEY,
      },
    });

    const objectLocation = `assets/user/${session.user.id}/${uniqueFilename}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: objectLocation,
        Body: buffer,
        ContentType: file.type,
      }),
    );

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
