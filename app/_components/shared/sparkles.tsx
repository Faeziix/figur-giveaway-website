"use client";

import Image from "next/image";
import { motion } from "motion/react";

const SPRITES = [
  "/images/pixar/sparkle-01.png",
  "/images/pixar/sparkle-02.png",
  "/images/pixar/sparkle-03.png",
  "/images/pixar/sparkle-04.png",
];

interface SparklesProps {
  count?: number;
  className?: string;
}

export function Sparkles({ count = 8, className }: SparklesProps) {
  const items = Array.from({ length: count }, (_, i) => {
    const angle = (i * 137.508) % 360;
    const radius = 20 + ((i * 37) % 70);
    const x = 50 + Math.cos((angle * Math.PI) / 180) * radius;
    const y = 50 + Math.sin((angle * Math.PI) / 180) * radius;
    const size = 16 + ((i * 13) % 24);
    const sprite = SPRITES[i % SPRITES.length];
    const delay = (i * 0.4) % 3;
    const duration = 2.5 + ((i * 0.7) % 2);
    const rotation = (i * 47) % 360;
    const opacity = 0.35 + ((i * 0.11) % 0.45);

    return { x, y, size, sprite, delay, duration, rotation, opacity };
  });

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
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
          animate={{ opacity: [item.opacity * 0.6, item.opacity, item.opacity * 0.6] }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image src={item.sprite} alt="" width={item.size} height={item.size} loading="eager" />
        </motion.div>
      ))}
    </div>
  );
}
