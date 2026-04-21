"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { CharacterFloat } from "@/app/_components/shared/character-float";
import { Sparkles } from "@/app/_components/shared/sparkles";

export function ActLiftoff() {
  return (
    <section
      className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(to bottom, oklch(0.18 0.09 345), oklch(0.42 0.11 345), oklch(0.92 0.035 15))" }}
    >
      <Sparkles count={16} />

      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {[12, 30, 52, 68, 84].map((x, i) => (
          <motion.div
            key={i}
            className="absolute w-px"
            style={{
              left: `${x}%`,
              height: "35%",
              top: `${8 + i * 12}%`,
              background: "linear-gradient(to bottom, transparent, oklch(0.88 0.14 85 / 0.4), transparent)",
            }}
            animate={{ opacity: [0, 0.8, 0], y: ["-20%", "130%"] }}
            transition={{
              duration: 1.2 + i * 0.25,
              delay: i * 0.18,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <CharacterFloat amplitude={16} duration={2.8} rock>
            <Image
              src="/images/ghibli/rocket-flight.png"
              alt="Figur rocket ascending through the Solar Fig universe"
              width={240}
              height={320}
            />
          </CharacterFloat>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3"
        >
          <h2
            className="text-cream leading-tight tracking-[-0.03em]"
            style={{ fontSize: "clamp(2rem, 1.5rem + 4vw, 4.5rem)" }}
          >
            Bound for Figur
          </h2>
          <p className="font-body text-cream/60 text-sm max-w-xs mx-auto">
            The fig-rocket ascends through the stars.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
