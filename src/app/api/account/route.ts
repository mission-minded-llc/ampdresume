// Accept POST request that contains the form data and save it to the database.
// The data should have a name and slug field.

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"; // Use NextResponse to send responses

export async function POST(req: Request) {
  try {
    // Get current user session from the request.
    // If there's no user session, return an error.
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, slug } = await req.json();
    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
    }

    // Save the form data to the database
    // For now, just return the form data
    return NextResponse.json({ name, slug }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
