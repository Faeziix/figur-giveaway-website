import { NextRequest, NextResponse } from "next/server";
import { entrySchema } from "@/app/_lib/validators";
import { findClaimedByEmail, findClaimedByPhone, findClaimedByIP, claimEntry } from "@/app/_lib/airtable";
import { createDiscountCode } from "@/app/_lib/shopify";
import { sendPrizeEmail } from "@/app/_lib/resend";
import { getPrizeById, getRandomPrizeId } from "@/app/_lib/prize-catalog";
import { getPostHogClient } from "@/app/_lib/posthog-server";
import type { EntryResult } from "@/app/_types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = entrySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const { prizeId: clientPrizeId, ...fields } = parsed.data;
    const email = fields.email || null;
    const distinctId = email ?? fields.phone;

    const posthog = getPostHogClient();

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    const cookieEntry = req.cookies.get("figur_entry")?.value;

    const [existingByCookie, existingByEmail, existingByPhone, existingByIP] = await Promise.all([
      cookieEntry ? findClaimedByEmail(cookieEntry) : Promise.resolve(null),
      email ? findClaimedByEmail(email) : Promise.resolve(null),
      findClaimedByPhone(fields.phone),
      ip !== "unknown" ? findClaimedByIP(ip) : Promise.resolve(null),
    ]);

    const alreadyClaimed = !!(existingByCookie || existingByEmail || existingByPhone || existingByIP);

    if (alreadyClaimed) {
      posthog?.capture({
        distinctId,
        event: "entry_already_claimed",
        properties: {
          email,
          matched_cookie: !!existingByCookie,
          matched_email: !!existingByEmail,
          matched_phone: !!existingByPhone,
          matched_ip: !!existingByIP,
        },
      });
      await posthog?.shutdown();
      const result: EntryResult = { alreadyClaimed: true };
      return NextResponse.json(result, { status: 200 });
    }

    const prizeId = clientPrizeId ?? getRandomPrizeId();
    const prize = getPrizeById(prizeId) ?? getPrizeById(getRandomPrizeId())!;

    const code = prize.discountPercent
      ? await createDiscountCode(prize.discountPercent, prize.id, fields.phone, prize.shopifyProductHandle)
      : null;

    await claimEntry(fields.phone, prize, code);

    if (email) {
      await sendPrizeEmail(email, fields.firstName, prize, code);
    }

    const result: EntryResult = {
      prize,
      code: code ?? undefined,
      alreadyClaimed: false,
    };

    posthog?.identify({
      distinctId,
      properties: { email, first_name: fields.firstName, last_name: fields.lastName },
    });
    posthog?.capture({
      distinctId,
      event: "entry_submitted",
      properties: {
        prize_id: prize.id,
        prize_type: prize.type,
        has_discount_code: !!code,
        has_email: !!email,
      },
    });
    await posthog?.shutdown();

    const response = NextResponse.json(result, { status: 201 });
    if (email) {
      response.cookies.set("figur_entry", email, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 90,
        path: "/",
        sameSite: "lax",
      });
    }

    return response;
  } catch (err) {
    console.error("[/api/entry]", err);
    try {
      const posthog = getPostHogClient();
      posthog?.capture({
        distinctId: "anonymous",
        event: "entry_api_error",
        properties: { error: String(err) },
      });
      await posthog?.shutdown();
    } catch {}
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
