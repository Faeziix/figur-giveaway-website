import { NextRequest, NextResponse } from "next/server";
import { createOrFindShopifyCustomer } from "@/app/_lib/shopify";
import { createDraftEntry } from "@/app/_lib/airtable";
import type { EntryPayload } from "@/app/_lib/validators";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Omit<EntryPayload, "prizeId">;

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    createOrFindShopifyCustomer(body.email ?? "", body.firstName, body.lastName, body.phone).catch(
      (err) => console.error("[shopify customer]", err)
    );

    await createDraftEntry(body, ip);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[/api/sync-customer]", err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
