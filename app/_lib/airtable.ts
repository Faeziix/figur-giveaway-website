import Airtable from "airtable";
import type { EntryPayload } from "@/app/_lib/validators";
import type { Prize } from "@/app/_types";

const base = new Airtable({ apiKey: process.env.AIRTABLE_PAT }).base(
  process.env.AIRTABLE_BASE_ID!
);

const TABLE = "tblYsG727GXqlo7QW";


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
    "Email": payload.email ?? "",
    "Phone": payload.phone,
    "Prize": prize.headline,
    "Prize Type": "Discount Code",
    "Discount Code": code ?? "",
    "Submitted At": new Date().toISOString(),
    "IP": ip,
  });

  return record;
}
