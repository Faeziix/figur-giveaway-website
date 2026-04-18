"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import axios from "axios";
import { SectionEyebrow } from "@/app/_components/shared/section-eyebrow";
import { Sparkles } from "@/app/_components/shared/sparkles";
import { PRIZES } from "@/app/_lib/prize-catalog";
import type { EntryFormData, EntryResult } from "@/app/_types";

interface ActPrizeSelectionProps {
  formData: EntryFormData;
  onRevealed: (result: EntryResult) => void;
}

export function ActPrizeSelection({ formData, onRevealed }: ActPrizeSelectionProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePickChest = async (prizeId: number) => {
    if (selectedId !== null || isRevealing) return;
    setSelectedId(prizeId);
    setIsRevealing(true);

    try {
      const { data } = await axios.post<EntryResult>("/api/entry", {
        ...formData,
        prizeId,
      });
      setTimeout(() => {
        setRevealed(true);
        setTimeout(() => onRevealed(data), 1400);
      }, 900);
    } catch {
      setError("Something went wrong. Please refresh and try again.");
      setSelectedId(null);
      setIsRevealing(false);
    }
  };

  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden bg-[--color-cream]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[--color-cream-peach] to-transparent"
      />
      <Sparkles count={12} />

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center w-full max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3"
        >
          <SectionEyebrow light>Your Gift Awaits</SectionEyebrow>
          <h2
            className="text-[--color-plum-deep] leading-tight tracking-[-0.03em]"
            style={{ fontSize: "clamp(2rem, 1.5rem + 3vw, 3.5rem)" }}
          >
            Pick a Chest
          </h2>
          <p className="font-body text-[--color-ink-soft] text-sm">
            One chest holds your treasure. Choose wisely.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-5 w-full">
          {PRIZES.map((prize, i) => {
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
                  prizeId={prize.id}
                  isSelected={isSelected}
                  isRevealed={isSelected && revealed}
                  isDisabled={isOther || isRevealing}
                  onPick={() => handlePickChest(prize.id)}
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
  prizeId: number;
  isSelected: boolean;
  isRevealed: boolean;
  isDisabled: boolean;
  onPick: () => void;
}

function TreasureChest({ prizeId, isSelected, isRevealed, isDisabled, onPick }: TreasureChestProps) {
  return (
    <motion.button
      onClick={onPick}
      disabled={isDisabled}
      aria-label={`Chest ${prizeId}`}
      className="relative cursor-pointer disabled:cursor-default focus:outline-none focus-visible:ring-4 focus-visible:ring-[--color-butter]/50 rounded-2xl"
      whileHover={!isDisabled && !isSelected ? { y: -6, rotate: 1 } : {}}
      transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      style={{ width: 96, height: 96, perspective: "600px" }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
          <Image
            src="/images/pixar/chest-closed.png"
            alt="Treasure chest"
            width={96}
            height={96}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <Image
            src="/images/pixar/chest-open.png"
            alt="Open treasure chest"
            width={96}
            height={96}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      </motion.div>

      {isSelected && !isRevealed && (
        <motion.div
          className="absolute inset-0 rounded-2xl ring-4 ring-[--color-butter]"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
}
