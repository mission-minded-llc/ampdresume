import * as Sentry from "@sentry/nextjs";

import { NextRequest, NextResponse } from "next/server";

import { promises as fs } from "fs";
import path from "path";

// Types for better type safety
interface IconifyJSON {
  prefix: string;
  icons: Record<string, unknown>;
}

async function searchIcons(searchTerm: string, limit: number = 50): Promise<string[]> {
  // Get all JSON files from @iconify/json/json directory
  const iconifyPath =
    process.env.NODE_ENV === "production"
      ? path.join(process.cwd(), "data/iconify")
      : path.join(process.cwd(), "node_modules/@iconify/json/json");

  const files = await fs.readdir(iconifyPath);
  const results: string[] = [];

  const searchTermWithoutPrefix = searchTerm.includes(":")
    ? searchTerm.split(":")?.[1]
    : searchTerm;

  const searchTermPrefix = searchTerm.includes(":") ? searchTerm.split(":")?.[0] : "";

  // If a prefix is provided, only search its file
  let filesToSearch: string[] = files;

  if (searchTermPrefix) {
    const prefixedFile = `${searchTermPrefix}.json`;
    if (files.includes(prefixedFile)) {
      filesToSearch = [prefixedFile];
    }
  }

  for (const file of filesToSearch) {
    if (!file.endsWith(".json")) continue;

    const filePath = path.join(iconifyPath, file);
    const content = await fs.readFile(filePath, "utf8");
    const iconSet: IconifyJSON = JSON.parse(content);

    const prefix = iconSet.prefix;
    const icons = Object.keys(iconSet.icons || {});

    // Find matching icons and add them with their prefix
    icons.forEach((iconName) => {
      if (results.length >= limit) {
        return;
      }

      if (iconName.includes(searchTermWithoutPrefix)) {
        results.push(`${prefix}:${iconName}`);
      }
    });

    if (results.length >= limit) {
      break;
    }
  }

  return results.sort();
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");
  const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 50;

  if (!query || query.length < 3) {
    return NextResponse.json(
      { error: "Search term must be at least 3 characters long" },
      { status: 400 },
    );
  }

  try {
    const results = await searchIcons(query, limit);
    return NextResponse.json({ icons: results });
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json({ error: "Failed to search icons" }, { status: 500 });
  }
}
