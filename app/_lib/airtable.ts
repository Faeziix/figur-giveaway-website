import type { EntryPayload } from "@/app/_lib/validators";
import type { Prize } from "@/app/_types";

export async function findEntryByEmail(_email: string) {
  return null;
}

export async function createEntry(
  _payload: Omit<EntryPayload, "prizeId">,
  _prize: Prize,
  _code: string | null,
  _ip: string
) {
  return null;
}
