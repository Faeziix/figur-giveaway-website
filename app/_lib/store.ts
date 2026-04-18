"use client";

import { create } from "zustand";
import type { EntryFormData, EntryResult, JourneyAct } from "@/app/_types";

interface GiveawayStore {
  act: JourneyAct;
  formData: EntryFormData | null;
  result: EntryResult | null;
  selectedCardId: number | null;

  setAct: (act: JourneyAct) => void;
  setFormData: (data: EntryFormData) => void;
  setResult: (result: EntryResult) => void;
  setSelectedCardId: (id: number) => void;
}

export const useGiveawayStore = create<GiveawayStore>((set) => ({
  act: "earth",
  formData: null,
  result: null,
  selectedCardId: null,

  setAct: (act) => set({ act }),
  setFormData: (formData) => set({ formData }),
  setResult: (result) => set({ result }),
  setSelectedCardId: (selectedCardId) => set({ selectedCardId }),
}));
