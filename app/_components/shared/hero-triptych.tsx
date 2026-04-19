"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

interface HeroImage {
  src: string;
  alt: string;
}

interface HeroTriptychProps {
  images: HeroImage[];
  interval?: number;
  width?: number;
  height?: number;
}

export function HeroTriptych({
  images,
  interval = 4000,
  width = 300,
  height = 400,
}: HeroTriptychProps) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [prefersReducedMotion, images.length, interval]);

  const current = images[prefersReducedMotion ? 0 : index];

  return (
    <div
      role="img"
      aria-label="Figur astronaut exploring UAE landmarks"
      style={{ position: "relative", width, height }}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={current.src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Image
            src={current.src}
            alt=""
            width={width}
            height={height}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            priority={index === 0}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
