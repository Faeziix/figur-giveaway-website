import { z } from "zod";

// Arabic keyboards can prepend U+200F (RTL mark) to form fields, which causes
// Zod's .email() to reject otherwise valid addresses, surfacing as "something
// went wrong" on chest selection. Strip all invisible/directional Unicode.
// eslint-disable-next-line no-control-regex
const INVISIBLE_CHARS = /[​-‏‪-‮﻿­]/g;

const cleanStr = (v: unknown) =>
  typeof v === "string" ? v.replace(INVISIBLE_CHARS, "").trim() : v;

export const entrySchema = z.object({
  firstName: z.preprocess(cleanStr, z.string().min(1, "First name is required").max(80, "First name is too long")),
  lastName: z.preprocess(cleanStr, z.string().min(1, "Last name is required").max(80, "Last name is too long")),
  phone: z.preprocess(
    cleanStr,
    z.string().min(5, "Phone number is required").max(30).refine((val) => {
      const digits = val.replace(/\D/g, "");
      if (digits.startsWith("971")) return digits.length === 12;
      return true;
    }, "UAE phone numbers must be 9 digits after +971")
  ),
  email: z.preprocess(
    cleanStr,
    z.string().email("Please enter a valid email address").toLowerCase().optional().or(z.literal(""))
  ),
  preferredLanguage: z.enum(["english", "arabic"]),
  visitorType: z.enum(["resident", "tourist"]),
  prizeId: z.number().int().min(1).max(6),
});

export type EntryPayload = z.infer<typeof entrySchema>;
