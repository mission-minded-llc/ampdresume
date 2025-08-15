import { getServerSession } from "next-auth";
import sharp from "sharp";
import { NextRequest, NextResponse } from "next/server";
import { ALLOWED_USER_IMAGE_TYPES, MAX_USER_IMAGE_SIZE } from "@/constants";
import { authOptions } from "@/lib/auth";
import { uploadObject } from "@/lib/s3";

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
        { status: 400 }
      );
    }

    // Generate a unique filename to prevent overwrites
    const timestamp = Date.now();
    const extension = file.type.split("/")[1];
    const uniqueFilename = `${timestamp}-${file.name.replace(/\.[^/.]+$/, "")}.${extension}`;

    // Convert File to Buffer for S3 upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const objectLocation = `assets/user/${session.user.id}/${uniqueFilename}`;

    // Validate that the file is actually an image using Sharp
    try {
      const metadata = await sharp(buffer).metadata();

      // Check if the file has valid image dimensions
      if (!metadata.width || !metadata.height) {
        return NextResponse.json(
          { error: "Invalid image file" },
          { status: 400 }
        );
      }

      // Optional: You can add additional checks here
      // For example, minimum/maximum dimensions:
      if (metadata.width < 10 || metadata.height < 10) {
        return NextResponse.json(
          { error: "Image dimensions too small" },
          { status: 400 }
        );
      }

      // Verify format matches the claimed mime type
      const formatToMime: Record<string, string> = {
        jpeg: "image/jpeg",
        png: "image/png",
        gif: "image/gif",
      };

      if (metadata.format && formatToMime[metadata.format] !== file.type) {
        return NextResponse.json(
          { error: "Image format doesn't match the declared type" },
          { status: 400 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { error: `Invalid image file: ${(error as Error).message}` },
        { status: 400 }
      );
    }

    if (file.size > MAX_USER_IMAGE_SIZE) {
      return NextResponse.json(
        { error: "File size must be less than 1MB" },
        { status: 400 }
      );
    }

    await uploadObject(objectLocation, buffer, file.type);

    return NextResponse.json(
      {
        url: `https://${process.env.AWS_S3_BUCKET_NAME}/${objectLocation}`,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
