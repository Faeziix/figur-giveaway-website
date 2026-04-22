import Airtable from "airtable";
import type { EntryPayload } from "@/app/_lib/validators";
import type { Prize } from "@/app/_types";

const base = new Airtable({ apiKey: process.env.AIRTABLE_PAT }).base(
  process.env.AIRTABLE_BASE_ID!
);

const TABLE = "tblYsG727GXqlo7QW";

export async function findClaimedByEmail(email: string) {
  const records = await base(TABLE)
    .select({
      filterByFormula: `AND({Email} = "${email.replace(/"/g, '\\"')}", {Status} = "claimed")`,
      maxRecords: 1,
    })
    .firstPage();
  return records.length > 0 ? records[0] : null;
}

export async function findClaimedByPhone(phone: string) {
  const normalized = phone.replace(/\s+/g, "");
  const records = await base(TABLE)
    .select({
      filterByFormula: `AND(SUBSTITUTE({Phone}, " ", "") = "${normalized.replace(/"/g, '\\"')}", {Status} = "claimed")`,
      maxRecords: 1,
    })
    .firstPage();
  return records.length > 0 ? records[0] : null;
}

export async function findClaimedByIP(ip: string) {
  const records = await base(TABLE)
    .select({
      filterByFormula: `AND({IP} = "${ip.replace(/"/g, '\\"')}", {Status} = "claimed")`,
      maxRecords: 1,
    })
    .firstPage();
  return records.length > 0 ? records[0] : null;
}

export async function findPendingByPhone(phone: string) {
  const normalized = phone.replace(/\s+/g, "");
  const records = await base(TABLE)
    .select({
      filterByFormula: `AND(SUBSTITUTE({Phone}, " ", "") = "${normalized.replace(/"/g, '\\"')}", {Status} = "pending")`,
      maxRecords: 1,
    })
    .firstPage();
  return records.length > 0 ? records[0] : null;
}

export async function createDraftEntry(
  payload: Omit<EntryPayload, "prizeId">,
  ip: string
) {
  return base(TABLE).create({
    "Name": `${payload.firstName} ${payload.lastName}`,
    "First Name": payload.firstName,
    "Last Name": payload.lastName,
    "Email": payload.email ?? "",
    "Phone": payload.phone,
    "Preferred Language": payload.preferredLanguage === "arabic" ? "Arabic — عربي" : "English",
    "Submitted At": new Date().toISOString(),
    "IP": ip,
    "Status": "pending",
  });
}

export async function claimEntry(
  phone: string,
  prize: Prize,
  code: string | null
) {
  const pending = await findPendingByPhone(phone);
  if (!pending) return;

  await base(TABLE).update(pending.id, {
    "Prize": prize.headline,
    "Prize Type": "Discount Code",
    "Discount Code": code ?? "",
    "Status": "claimed",
  });
}
