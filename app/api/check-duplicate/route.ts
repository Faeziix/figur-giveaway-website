import { NextRequest, NextResponse } from "next/server";
import { findClaimedByEmail } from "@/app/_lib/airtable";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const existing = await findClaimedByEmail(email.toLowerCase().trim());
    if (existing) {
      return NextResponse.json({ exists: true }, { status: 409 });
    }

    return NextResponse.json({ exists: false }, { status: 200 });
  } catch (err) {
    console.error("[/api/check-duplicate]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
