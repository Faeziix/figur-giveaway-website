"use client";

import Image from "next/image";
import { motion } from "motion/react";

const SPRITES = [
  "/images/pixar/sparkle-01.png",
  "/images/pixar/sparkle-02.png",
  "/images/pixar/sparkle-03.png",
  "/images/pixar/sparkle-04.png",
];

interface BackgroundStarsProps {
  count?: number;
}

export function BackgroundStars({ count = 20 }: BackgroundStarsProps) {
  const items = Array.from({ length: count }, (_, i) => ({
    x: ((i * 137.508) % 97) + 1.5,
    y: ((i * 97.3) % 92) + 2,
    size: 12 + (i % 5) * 7,
    sprite: SPRITES[i % SPRITES.length],
    delay: (i * 0.35) % 3,
    duration: 2 + ((i * 0.8) % 2.5),
    rotation: (i * 53) % 360,
    opacity: 0.3 + ((i * 0.13) % 0.5),
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            width: item.size,
            height: item.size,
            rotate: item.rotation,
          }}
          animate={{ opacity: [item.opacity * 0.5, item.opacity, item.opacity * 0.5] }}
          transition={{ duration: item.duration, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src={item.sprite} alt="" width={item.size} height={item.size} />
        </motion.div>
      ))}
    </div>
  );
}
