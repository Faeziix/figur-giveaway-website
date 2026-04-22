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
  phone: z
    .string()
    .min(5, "Phone number is required")
    .max(30)
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim()
    .optional()
    .or(z.literal("")),
  prizeId: z.number().int().min(1).max(6),
});

export type EntryPayload = z.infer<typeof entrySchema>;
