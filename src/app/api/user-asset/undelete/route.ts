import { NextRequest } from "next/server";

import { revertFlagForDeletion } from "@/lib/s3";
import { handleAssetRequest } from "@/middleware/validateAssetRequest";

export async function POST(req: NextRequest) {
  return handleAssetRequest(req, revertFlagForDeletion);
}
