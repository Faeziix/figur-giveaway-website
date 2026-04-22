"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import axios from "axios";
import { ActEarth } from "@/app/_components/act-earth";
import { ActLiftoff } from "@/app/_components/act-liftoff";
import { ActForm } from "@/app/_components/act-form";
import { ActPrizeSelection } from "@/app/_components/act-prize-selection";
import { ActConfirmation } from "@/app/_components/act-confirmation";
import { getRandomPrizeId } from "@/app/_lib/prize-catalog";
import type { EntryFormData, EntryResult, JourneyAct } from "@/app/_types";


export default function GiveawayPage() {
  const [act, setAct] = useState<JourneyAct>("earth");
  const [formData, setFormData] = useState<EntryFormData | null>(null);
  const [selectedPrizeId, setSelectedPrizeId] = useState<number | null>(null);
  const [result, setResult] = useState<EntryResult | null>(null);

  const advance = (next: JourneyAct) => setAct(next);

  return (
    <main className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={act}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {act === "earth" && (
            <ActEarth onBegin={() => advance("form")} />
          )}

          {act === "form" && (
            <ActForm
              onSubmitted={(data) => {
                setFormData(data);
                setSelectedPrizeId(getRandomPrizeId());
                axios.post("/api/sync-customer", data).catch((err) =>
                  console.error("[sync-customer]", err)
                );
                advance("liftoff");
              }}
            />
          )}

          {act === "liftoff" && (
            <ActLiftoffWithAuto onDone={() => advance("prize-selection")} />
          )}

          {act === "prize-selection" && formData && selectedPrizeId && (
            <ActPrizeSelection
              formData={formData}
              selectedPrizeId={selectedPrizeId}
              onRevealed={(res) => {
                setResult(res);
                advance("confirmation");
              }}
            />
          )}

          {act === "confirmation" && result && formData && (
            <ActConfirmation result={result} email={formData.email} firstName={formData.firstName} />
          )}
        </motion.div>
      </AnimatePresence>

      {act !== "earth" && act !== "liftoff" && act !== "confirmation" && (
        <JourneyProgressDots current={act} />
      )}
    </main>
  );
}

function ActLiftoffWithAuto({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3200);
    return () => clearTimeout(t);
  }, [onDone]);
  return <ActLiftoff />;
}

function JourneyProgressDots({ current }: { current: JourneyAct }) {
  const steps: JourneyAct[] = ["form", "liftoff", "prize-selection"];
  const currentIndex = steps.indexOf(current);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2">
      {steps.map((step, i) => (
        <motion.div
          key={step}
          className="rounded-full"
          animate={{
            width: i === currentIndex ? 20 : 6,
            height: 6,
            backgroundColor:
              i <= currentIndex
                ? "oklch(0.88 0.14 85)"
                : "oklch(0.88 0.14 85 / 0.3)",
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  );
}
