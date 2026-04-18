export interface EntryFormData {
  firstName: string;
  lastName: string;
  email: string;
  residency: "resident" | "tourist";
  nationality: string;
}

export type PrizeType = "discount" | "points";

export interface Prize {
  id: number;
  type: PrizeType;
  headline: string;
  description: string;
  value: string;
  pointsAwarded?: number;
  discountPercent?: number;
}

export interface EntryResult {
  prize: Prize;
  code?: string;
  pointsAwarded?: number;
  alreadyClaimed: boolean;
}

export type JourneyAct =
  | "earth"
  | "liftoff"
  | "figland"
  | "form"
  | "prize-selection"
  | "confirmation";
