"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Sparkles } from "@/app/_components/shared/sparkles";
import { SectionEyebrow } from "@/app/_components/shared/section-eyebrow";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import type { EntryResult } from "@/app/_types";

interface ActConfirmationProps {
  result: EntryResult;
  email: string;
  firstName: string;
}

export function ActConfirmation({ result, email, firstName }: ActConfirmationProps) {
  const [copied, setCopied] = useState(false);
  const { prize, code, pointsAwarded } = result;

  const handleCopy = async () => {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      className="relative min-h-dvh flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ background: "linear-gradient(to bottom, oklch(0.18 0.09 345), oklch(0.28 0.12 350))" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 40%, oklch(0.78 0.14 70 / 0.08) 0%, transparent 65%)" }}
      />
      <Sparkles count={20} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative z-10 w-full max-w-md text-center space-y-8"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/images/ghibli/prize-reveal.png"
            alt="Figur astronaut with your prize"
            width={320}
            height={230}
            className="mx-auto"
          />
        </motion.div>

        <div className="space-y-3">
          <SectionEyebrow>Your Gift, {firstName}</SectionEyebrow>
          <h2
            className="text-cream leading-tight tracking-[-0.03em]"
            style={{ fontSize: "clamp(2rem, 1.5rem + 3vw, 3.5rem)" }}
          >
            {prize.headline}
          </h2>
          <p className="font-body text-cream/60 text-sm leading-relaxed">
            {prize.description}
          </p>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-butter/30 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="bg-cream/8 backdrop-blur-sm border border-butter/20 rounded-3xl p-8 space-y-5"
        >
          {prize.type === "discount" && code ? (
            <>
              <p className="font-body text-butter/70 text-xs tracking-widest uppercase">
                Your Discount Code
              </p>
              <div
                className="font-display text-2xl md:text-3xl text-butter tracking-widest bg-plum-deep/60 rounded-2xl py-4 px-6"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {code}
              </div>
              <Button
                variant="butter"
                size="md"
                className="w-full"
                onClick={handleCopy}
              >
                {copied ? "✓ Copied!" : "Copy Code"}
              </Button>
              <p className="font-body text-cream/40 text-xs">
                Also sent to {email}
              </p>
            </>
          ) : (
            <>
              <p className="font-body text-butter/70 text-xs tracking-widest uppercase">
                Figur Loyalty Points
              </p>
              <div
                className="font-display text-6xl text-butter"
                style={{ fontSize: "clamp(3rem, 2rem + 4vw, 5rem)" }}
              >
                {pointsAwarded}
              </div>
              <p className="font-body text-cream/50 text-sm">
                Points banked to your Figur account.
              </p>
              <p className="font-body text-cream/30 text-xs">
                Confirmation sent to {email}
              </p>
            </>
          )}
        </motion.div>

        <div className="h-px bg-gradient-to-r from-transparent via-butter/20 to-transparent" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="space-y-4"
        >
          <Link href="https://figur.ae" external>
            <Button variant="ghost" size="md" className="w-full border-cream/20 text-cream hover:bg-cream/10">
              Shop at Figur.ae →
            </Button>
          </Link>
          <p className="font-decorative italic text-cream/25 text-xs">
            Ancient Fruit. Modern Indulgence.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
