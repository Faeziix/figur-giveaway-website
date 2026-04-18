"use client";

import { motion } from "motion/react";

interface CharacterFloatProps {
  children: React.ReactNode;
  amplitude?: number;
  duration?: number;
  rock?: boolean;
}

export function CharacterFloat({
  children,
  amplitude = 12,
  duration = 3.5,
  rock = false,
}: CharacterFloatProps) {
  return (
    <motion.div
      animate={{
        y: [0, -amplitude, 0],
        rotate: rock ? [0, 2, 0, -2, 0] : 0,
      }}
      transition={{
        y: {
          duration,
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotate: {
          duration: duration * 1.3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      {children}
    </motion.div>
  );
}
