export interface EntryFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  residency: "resident" | "tourist";
  preferredLanguage: "english" | "arabic";
  figurPurpose: string;
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
  shopifyProductHandle?: string;
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
  | "form"
  | "prize-selection"
  | "confirmation";
