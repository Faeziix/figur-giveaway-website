import { NextRequest, NextResponse } from "next/server";
import { entrySchema } from "@/app/_lib/validators";
import { findEntryByEmail, createEntry } from "@/app/_lib/airtable";
import { createDiscountCode } from "@/app/_lib/shopify";
import { sendPrizeEmail } from "@/app/_lib/resend";
import { getPrizeById } from "@/app/_lib/prize-catalog";
import type { EntryResult } from "@/app/_types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = entrySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { prizeId, ...entryData } = parsed.data;

    const existing = await findEntryByEmail(entryData.email);
    if (existing) {
      const prize = getPrizeById(existing.get("prize_id") as number)!;
      const code = (existing.get("prize_code") as string) || null;
      const result: EntryResult = {
        prize,
        code: code || undefined,
        pointsAwarded: (existing.get("points_awarded") as number) || undefined,
        alreadyClaimed: true,
      };
      return NextResponse.json(result, { status: 200 });
    }

    const prize = getPrizeById(prizeId);
    if (!prize) {
      return NextResponse.json({ error: "Invalid prize selection" }, { status: 400 });
    }

    let code: string | null = null;
    if (prize.type === "discount" && prize.discountPercent) {
      code = await createDiscountCode(prize.discountPercent, prize.id);
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

    await createEntry(entryData, prize, code, ip);
    await sendPrizeEmail(entryData.email, entryData.firstName, prize, code);

    const result: EntryResult = {
      prize,
      code: code ?? undefined,
      pointsAwarded: prize.pointsAwarded,
      alreadyClaimed: false,
    };

    const response = NextResponse.json(result, { status: 201 });
    response.cookies.set("figur_giveaway_entry", entryData.email, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 90,
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (err) {
    console.error("[/api/entry]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
