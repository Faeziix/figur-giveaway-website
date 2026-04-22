export interface EntryFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  preferredLanguage: "english" | "arabic";
}

export type PrizeType = "discount";

export interface Prize {
  id: number;
  type: PrizeType;
  headline: string;
  description: string;
  value: string;
  discountPercent?: number;
  shopifyProductHandle?: string;
}

export interface EntryResult {
  prize?: Prize;
  code?: string;
  alreadyClaimed: boolean;
}

export type JourneyAct =
  | "earth"
  | "liftoff"
  | "form"
  | "prize-selection"
  | "confirmation";
