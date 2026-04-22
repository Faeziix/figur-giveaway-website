"use client";

import { useState, useRef, useMemo } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import axios from "axios";
import posthog from "posthog-js";
import { SectionEyebrow } from "@/app/_components/shared/section-eyebrow";
import { Sparkles } from "@/app/_components/shared/sparkles";
import { PRIZES } from "@/app/_lib/prize-catalog";
import type { EntryFormData, EntryResult } from "@/app/_types";

const CHEST_LABELS = [
  "Golden",
  "Crimson",
  "Jade",
  "Sapphire",
  "Twilight",
  "Ember",
];

interface ActPrizeSelectionProps {
  formData: EntryFormData;
  onRevealed: (result: EntryResult) => void;
}

export function ActPrizeSelection({ formData, onRevealed }: ActPrizeSelectionProps) {
  const shuffledPrizes = useMemo(() => {
    const copy = [...PRIZES];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }, []);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pendingResult = useRef<EntryResult | null>(null);

  const handlePickChest = async (prizeId: number) => {
    if (selectedId !== null || isLoading) return;
    setSelectedId(prizeId);
    setIsLoading(true);

    const chestLabel = CHEST_LABELS[PRIZES.findIndex((p) => p.id === prizeId)];
    posthog.capture("chest_selected", { prize_id: prizeId, chest_label: chestLabel });

    try {
      const { data } = await axios.post<EntryResult>("/api/entry", { ...formData, prizeId });
      pendingResult.current = data;
      setRevealed(true);
    } catch (err) {
      posthog.captureException(err);
      posthog.capture("chest_selection_error", { prize_id: prizeId });
      setError("Something went wrong. Please refresh and try again.");
      setSelectedId(null);
      setIsLoading(false);
    }
  };

  const handleRevealComplete = () => {
    if (pendingResult.current) onRevealed(pendingResult.current);
  };

  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden bg-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-cream-peach to-transparent"
      />
      <Sparkles count={12} />

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3"
        >
          <SectionEyebrow light>Your Gift Awaits</SectionEyebrow>
          <h2
            className="text-plum-deep leading-tight tracking-[-0.03em]"
            style={{ fontSize: "clamp(2rem, 1.5rem + 3vw, 3.5rem)" }}
          >
            Pick Your Lucky Chest
          </h2>
          <p className="font-body text-ink-soft text-sm">
            One chest holds your treasure. Choose wisely.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-5 w-full">
          {shuffledPrizes.map((prize, i) => {
            const isSelected = selectedId === prize.id;
            const isOther = selectedId !== null && !isSelected;

            return (
              <motion.div
                key={prize.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{
                  opacity: isOther ? 0.2 : 1,
                  y: isOther ? 16 : 0,
                  scale: isSelected ? 1.12 : 1,
                  filter: isOther ? "blur(2px)" : "none",
                }}
                transition={{
                  duration: 0.5,
                  delay: revealed ? 0 : i * 0.08,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="flex justify-center"
              >
                <TreasureChest
                  chestIndex={i + 1}
                  label={CHEST_LABELS[i]}
                  isSelected={isSelected}
                  isLoading={isSelected && isLoading}
                  isRevealed={isSelected && revealed}
                  isDisabled={isOther || isLoading}
                  onPick={() => handlePickChest(prize.id)}
                  onRevealComplete={isSelected ? handleRevealComplete : undefined}
                />
              </motion.div>
            );
          })}
        </div>

        {error && <p className="text-red-500 text-sm font-body">{error}</p>}
      </div>
    </section>
  );
}

interface TreasureChestProps {
  chestIndex: number;
  label: string;
  isSelected: boolean;
  isLoading: boolean;
  isRevealed: boolean;
  isDisabled: boolean;
  onPick: () => void;
  onRevealComplete?: () => void;
}

function TreasureChest({ chestIndex, label, isSelected, isLoading, isRevealed, isDisabled, onPick, onRevealComplete }: TreasureChestProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.button
        onClick={onPick}
        disabled={isDisabled}
        aria-label={`${label} Chest`}
        className="relative cursor-pointer disabled:cursor-default outline-none rounded-2xl"
        whileHover={!isDisabled && !isSelected ? { y: -6, rotate: 1 } : {}}
        animate={isLoading ? { x: [0, -4, 4, -4, 4, 0, 0, 0, 0, 0] } : { x: 0 }}
        transition={
          isLoading
            ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
        }
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
              src={`/images/ghibli/chest-${chestIndex}.png`}
              alt={`${label} treasure chest`}
              width={96}
              height={96}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <div
            onTransitionEnd={(e) => {
              if (e.propertyName === "opacity") onRevealComplete?.();
            }}
            style={{
              position: "absolute", inset: 0,
              transition: "transform 0.3s ease-out 0.3s, opacity 0.3s ease-out 0.3s",
              transform: isRevealed ? "rotateY(0deg)" : "rotateY(-90deg)",
              opacity: isRevealed ? 1 : 0,
            }}
          >
            <Image
              src={`/images/ghibli/chest-open-${chestIndex}.png`}
              alt={`Open ${label} treasure chest`}
              width={96}
              height={96}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        </div>
      </motion.button>
      <span className="font-body text-ink-soft text-xs">{label}</span>
    </div>
  );
}
