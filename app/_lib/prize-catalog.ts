import type { Prize } from "@/app/_types";

export const PRIZES: Prize[] = [
  {
    id: 1,
    type: "discount",
    headline: "20% Off Your Order",
    description: "20% off your entire order — treat yourself to something extraordinary.",
    value: "20% off your order",
    discountPercent: 20,
  },
  {
    id: 2,
    type: "points",
    headline: "2,000 Figur Points",
    description: "2,000 loyalty points added to your account — redeemable on your next order.",
    value: "2,000 loyalty points",
    pointsAwarded: 2000,
  },
  {
    id: 3,
    type: "discount",
    headline: "20% Off Your Order",
    description: "20% off your entire order — treat yourself to something extraordinary.",
    value: "20% off your order",
    discountPercent: 20,
  },
  {
    id: 4,
    type: "points",
    headline: "5,000 Figur Points",
    description: "5,000 loyalty points added to your account — a grand reward from Figur.",
    value: "5,000 loyalty points",
    pointsAwarded: 5000,
  },
  {
    id: 5,
    type: "discount",
    headline: "30% Off Your Order",
    description: "30% off your entire order — a generous reward from Figur.",
    value: "30% off your order",
    discountPercent: 30,
  },
  {
    id: 6,
    type: "discount",
    headline: "40% Off Your Order",
    description: "40% off your entire order — the grandest discount in this giveaway.",
    value: "40% off your order",
    discountPercent: 40,
  },
];

export function getPrizeById(id: number): Prize | undefined {
  return PRIZES.find((p) => p.id === id);
}

export function getRandomPrizeId(): number {
  return PRIZES[Math.floor(Math.random() * PRIZES.length)].id;
}
