import { z } from "zod";

export const entrySchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(80, "First name is too long")
    .trim(),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(80, "Last name is too long")
    .trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),
  phone: z
    .string()
    .min(5, "Phone number is required")
    .max(30)
    .trim(),
  residency: z.enum(["resident", "tourist"], {
    errorMap: () => ({ message: "Please select resident or tourist" }),
  }),
  preferredLanguage: z.enum(["english", "arabic"], {
    errorMap: () => ({ message: "Please select a language" }),
  }),
  figurPurpose: z
    .string()
    .min(1, "Please select an option")
    .trim(),
  prizeId: z.number().int().min(1).max(6),
});

export type EntryPayload = z.infer<typeof entrySchema>;
