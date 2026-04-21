import { NextRequest, NextResponse } from "next/server";
import { entrySchema } from "@/app/_lib/validators";
import { findEntryByEmail, findEntryByPhone, findEntryByIP, createEntry } from "@/app/_lib/airtable";
import { createDiscountCode, createOrFindShopifyCustomer } from "@/app/_lib/shopify";
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

    const posthog = getPostHogClient();

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    const cookieEntry = req.cookies.get("figur_entry")?.value;

    const [existingByCookie, existingByEmail, existingByPhone, existingByIP] = await Promise.all([
      cookieEntry ? findEntryByEmail(cookieEntry) : Promise.resolve(null),
      findEntryByEmail(fields.email),
      findEntryByPhone(fields.phone),
      ip !== "unknown" ? findEntryByIP(ip) : Promise.resolve(null),
    ]);

    const alreadyClaimed = !!(existingByCookie || existingByEmail || existingByPhone || existingByIP);

    if (alreadyClaimed) {
      posthog?.capture({
        distinctId: fields.email,
        event: "entry_already_claimed",
        properties: {
          email: fields.email,
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

    let code: string | null = null;
    const [, resolvedCode] = await Promise.all([
      createOrFindShopifyCustomer(fields.email, fields.firstName, fields.lastName, fields.phone).catch((err) =>
        console.error("[shopify customer]", err)
      ),
      prize.type === "discount" && prize.discountPercent
        ? createDiscountCode(prize.discountPercent, prize.id, prize.shopifyProductHandle)
        : Promise.resolve(null),
    ]);
    code = resolvedCode;

    await createEntry(fields, prize, code, ip);

    await sendPrizeEmail(fields.email, fields.firstName, prize, code);

    const result: EntryResult = {
      prize,
      code: code ?? undefined,
      pointsAwarded: prize.pointsAwarded,
      alreadyClaimed: false,
    };

    posthog?.identify({
      distinctId: fields.email,
      properties: {
        email: fields.email,
        first_name: fields.firstName,
        last_name: fields.lastName,
        residency: fields.residency,
        preferred_language: fields.preferredLanguage,
        figur_purpose: fields.figurPurpose,
      },
    });
    posthog?.capture({
      distinctId: fields.email,
      event: "entry_submitted",
      properties: {
        prize_id: prize.id,
        prize_type: prize.type,
        residency: fields.residency,
        preferred_language: fields.preferredLanguage,
        figur_purpose: fields.figurPurpose,
        has_discount_code: !!code,
      },
    });
    await posthog?.shutdown();

    const response = NextResponse.json(result, { status: 201 });
    response.cookies.set("figur_entry", fields.email, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 90,
      path: "/",
      sameSite: "lax",
    });

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
