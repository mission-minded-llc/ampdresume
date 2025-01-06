import { NextRequest } from "next/server";
import { handleAssetRequest } from "@/middleware/validateAssetRequest";
import { revertFlagForDeletion } from "@/lib/s3";

export async function POST(req: NextRequest) {
  return handleAssetRequest(req, revertFlagForDeletion);
}
