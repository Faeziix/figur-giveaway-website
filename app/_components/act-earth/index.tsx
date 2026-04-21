"use client";

import { motion } from "motion/react";
import Image from "next/image";
import posthog from "posthog-js";
import { Button } from "@/components/ui/button";
import { SectionEyebrow } from "@/app/_components/shared/section-eyebrow";
import { CharacterFloat } from "@/app/_components/shared/character-float";
import { HeroTriptych } from "@/app/_components/shared/hero-triptych";
import { Sparkles } from "@/app/_components/shared/sparkles";

const UAE_HERO_IMAGES = [
  { src: "/images/ghibli/hero-burj-khalifa.png", alt: "" },
  { src: "/images/ghibli/hero-burj-al-arab.png", alt: "" },
  { src: "/images/ghibli/hero-museum-future.png", alt: "" },
];

interface ActEarthProps {
  onBegin: () => void;
}

export function ActEarth({ onBegin }: ActEarthProps) {
  return (
    <section className="relative min-h-dvh flex flex-col items-center justify-center bg-cream overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-blush/60 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-cream-peach/40 to-transparent"
      />

      <Sparkles count={10} />

      <div className="relative z-10 flex flex-col items-center gap-8 text-center px-6 max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/Figur logo/PNG/03 Figur logo-v2.png"
            alt="Figur"
            width={140}
            height={38}
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.75, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <CharacterFloat amplitude={14} duration={3.5} rock>
            <HeroTriptych
              images={UAE_HERO_IMAGES}
              width={280}
              height={373}
              interval={4000}
            />
          </CharacterFloat>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionEyebrow light className="mb-3">The Journey Begins</SectionEyebrow>
          <h1
            className="text-plum-deep leading-[1.0] tracking-[-0.04em] mb-4"
            style={{ fontSize: "clamp(3rem, 2rem + 6vw, 7rem)" }}
          >
            A Gift From<br />Figùr
          </h1>
          <p className="font-body text-ink-soft text-base max-w-sm mx-auto leading-relaxed">
            Answer a few questions. Pick your chest. Claim your treasure.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <Button
            variant="butter"
            size="lg"
            onClick={() => {
              posthog.capture("journey_started");
              onBegin();
            }}
          >
            Begin the Journey
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
