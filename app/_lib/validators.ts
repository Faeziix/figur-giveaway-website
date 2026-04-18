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
  residency: z.enum(["resident", "tourist"], {
    errorMap: () => ({ message: "Please select resident or tourist" }),
  }),
  nationality: z
    .string()
    .min(1, "Nationality is required")
    .trim(),
  prizeId: z.number().int().min(1).max(6),
});

export type EntryPayload = z.infer<typeof entrySchema>;
