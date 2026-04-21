"use client";

import { useState } from "react";
import { ActConfirmation } from "@/app/_components/act-confirmation";
import { PRIZES, getPrizeById } from "@/app/_lib/prize-catalog";
import { Sparkles } from "@/app/_components/shared/sparkles";
import { SectionEyebrow } from "@/app/_components/shared/section-eyebrow";
import { motion } from "motion/react";
import Image from "next/image";
import type { EntryResult } from "@/app/_types";

const CHEST_LABELS = ["Golden", "Crimson", "Jade", "Sapphire", "Twilight", "Ember"];

const MOCK_EMAIL = "test@figur.ae";
const MOCK_FIRST_NAME = "Faez";
const MOCK_CODE = "FIGUR-TEST-40OFF";

export default function TestPage() {
  const [result, setResult] = useState<EntryResult | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handlePick = (prizeId: number) => {
    if (selectedId !== null) return;
    setSelectedId(prizeId);
    setTimeout(() => {
      setRevealed(true);
      const prize = getPrizeById(prizeId)!;
      setTimeout(() => {
        setResult({
          prize,
          code: prize.discountPercent ? MOCK_CODE : undefined,
          alreadyClaimed: false,
        });
      }, 1400);
    }, 900);
  };

  const reset = () => {
    setSelectedId(null);
    setRevealed(false);
    setResult(null);
  };

  if (result) {
    return (
      <div>
        <button
          onClick={reset}
          className="fixed top-4 right-4 z-50 bg-black text-white text-xs px-3 py-1.5 rounded-lg"
        >
          ← Reset
        </button>
        <ActConfirmation result={result} email={MOCK_EMAIL} firstName={MOCK_FIRST_NAME} />
      </div>
    );
  }

  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden bg-cream">
      <Sparkles count={12} />
      <button
        onClick={reset}
        className="fixed top-4 right-4 z-50 bg-black text-white text-xs px-3 py-1.5 rounded-lg"
      >
        Reset
      </button>

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center w-full max-w-lg">
        <div className="space-y-3">
          <SectionEyebrow light>Your Gift Awaits</SectionEyebrow>
          <h2
            className="text-plum-deep leading-tight tracking-[-0.03em]"
            style={{ fontSize: "clamp(2rem, 1.5rem + 3vw, 3.5rem)" }}
          >
            Pick a Chest
          </h2>
          <p className="font-body text-ink-soft text-sm">
            One chest holds your treasure. Choose wisely.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-5 w-full">
          {PRIZES.map((prize, i) => {
            const isSelected = selectedId === prize.id;
            const isOther = selectedId !== null && !isSelected;
            const isRevealed = isSelected && revealed;

            return (
              <motion.div
                key={prize.id}
                animate={{
                  opacity: isOther ? 0.2 : 1,
                  y: isOther ? 16 : 0,
                  scale: isSelected ? 1.12 : 1,
                  filter: isOther ? "blur(2px)" : "none",
                }}
                transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                className="flex flex-col items-center gap-2"
              >
                <motion.button
                  onClick={() => handlePick(prize.id)}
                  disabled={selectedId !== null}
                  aria-label={`${CHEST_LABELS[i]} Chest`}
                  className="relative cursor-pointer disabled:cursor-default outline-none rounded-2xl"
                  whileHover={!selectedId && !isSelected ? { y: -6, rotate: 1 } : {}}
                  transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                  style={{ width: 96, height: 96 }}
                >
                  <div style={{ width: "100%", height: "100%", position: "relative", perspective: "400px" }}>
                    <div
                      style={{
                        position: "absolute", inset: 0,
                        transition: "transform 0.3s ease-in, opacity 0.3s ease-in",
                        transform: isRevealed ? "rotateY(90deg)" : "rotateY(0deg)",
                        opacity: isRevealed ? 0 : 1,
                      }}
                    >
                      <Image
                        src={`/images/ghibli/chest-${i + 1}.png`}
                        alt={`${CHEST_LABELS[i]} chest`}
                        width={96} height={96}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    </div>
                    <div
                      style={{
                        position: "absolute", inset: 0,
                        transition: "transform 0.3s ease-out 0.3s, opacity 0.3s ease-out 0.3s",
                        transform: isRevealed ? "rotateY(0deg)" : "rotateY(-90deg)",
                        opacity: isRevealed ? 1 : 0,
                      }}
                    >
                      <Image
                        src={`/images/ghibli/chest-open-${i + 1}.png`}
                        alt={`Open ${CHEST_LABELS[i]} chest`}
                        width={96} height={96}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    </div>
                  </div>
                </motion.button>
                <span className="font-body text-ink-soft text-xs">{CHEST_LABELS[i]}</span>
                <span className="font-body text-butter text-[10px] font-medium">{prize.headline}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
