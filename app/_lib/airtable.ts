import Airtable from "airtable";
import type { EntryPayload } from "@/app/_lib/validators";
import type { Prize } from "@/app/_types";

const base = new Airtable({ apiKey: process.env.AIRTABLE_PAT }).base(
  process.env.AIRTABLE_BASE_ID!
);

const TABLE = "tblYsG727GXqlo7QW";

const RESIDENCY_LABELS: Record<string, string> = {
  resident: "UAE Resident",
  tourist: "Tourist / Visitor",
};

const LANGUAGE_LABELS: Record<string, string> = {
  english: "English",
  arabic: "Arabic — عربي",
};

const PURPOSE_LABELS: Record<string, string> = {
  personal: "Personal treat",
  gift: "Gift for someone",
  corporate: "Corporate gifting",
  occasion: "Special occasion",
  exploring: "Just exploring",
};

export async function findEntryByEmail(email: string) {
  const records = await base(TABLE)
    .select({
      filterByFormula: `{Email} = "${email.replace(/"/g, '\\"')}"`,
      maxRecords: 1,
    })
    .firstPage();

  return records.length > 0 ? records[0] : null;
}

export async function findEntryByPhone(phone: string) {
  const normalized = phone.replace(/\s+/g, "");
  const records = await base(TABLE)
    .select({
      filterByFormula: `SUBSTITUTE({Phone}, " ", "") = "${normalized.replace(/"/g, '\\"')}"`,
      maxRecords: 1,
    })
    .firstPage();

  return records.length > 0 ? records[0] : null;
}

export async function findEntryByIP(ip: string) {
  const records = await base(TABLE)
    .select({
      filterByFormula: `{IP} = "${ip.replace(/"/g, '\\"')}"`,
      maxRecords: 1,
    })
    .firstPage();

  return records.length > 0 ? records[0] : null;
}

export async function createEntry(
  payload: Omit<EntryPayload, "prizeId">,
  prize: Prize,
  code: string | null,
  ip: string
) {
  const record = await base(TABLE).create({
    "Name": `${payload.firstName} ${payload.lastName}`,
    "First Name": payload.firstName,
    "Last Name": payload.lastName,
    "Email": payload.email,
    "Phone": payload.phone,
    "Based in UAE?": RESIDENCY_LABELS[payload.residency] ?? payload.residency,
    "Preferred Language": LANGUAGE_LABELS[payload.preferredLanguage] ?? payload.preferredLanguage,
    "What brings you to Figur?": PURPOSE_LABELS[payload.figurPurpose] ?? payload.figurPurpose,
    "Prize": prize.headline,
    "Prize Type": prize.type === "discount" ? "Discount Code" : "Loyalty Points",
    "Discount Code": code ?? "",
    "Points Awarded": prize.pointsAwarded ?? 0,
    "Submitted At": new Date().toISOString(),
    "IP": ip,
  });

  return record;
}
