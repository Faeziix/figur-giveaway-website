import { NextRequest, NextResponse } from "next/server";
import { getPrizeById } from "@/app/_lib/prize-catalog";
import type { EntryResult } from "@/app/_types";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const prizeId = body.prizeId ?? 1;
  const prize = getPrizeById(prizeId) ?? getPrizeById(1)!;

  const result: EntryResult = {
    prize,
    code: prize.type === "discount" ? "FIGUR-DEMO" : undefined,
    pointsAwarded: prize.pointsAwarded,
    alreadyClaimed: false,
  };

  return NextResponse.json(result, { status: 201 });
}
