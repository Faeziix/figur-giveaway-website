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
    type: "discount",
    headline: "30% Off Your Order",
    description: "30% off your entire order — a generous reward from Figur.",
    value: "30% off your order",
    discountPercent: 30,
  },
  {
    id: 3,
    type: "discount",
    headline: "40% Off Your Order",
    description: "40% off your entire order — the grandest discount in this giveaway.",
    value: "40% off your order",
    discountPercent: 40,
  },
  {
    id: 4,
    type: "discount",
    headline: "A Free Heritage Box",
    description: "A complimentary Heritage Box — our finest gift, yours to keep or share.",
    value: "Free Heritage Box",
    discountPercent: 100,
    shopifyProductHandle: "small-heritage-gift-box",
  },
  {
    id: 5,
    type: "points",
    headline: "300 Figur Points",
    description: "Founding Member reward — banked for you as our loyalty program launches.",
    value: "300 Figur Loyalty Points",
    pointsAwarded: 300,
  },
  {
    id: 6,
    type: "points",
    headline: "500 Figur Points",
    description: "Grand prize — the highest points reward in this giveaway. A founding treasure.",
    value: "500 Figur Loyalty Points",
    pointsAwarded: 500,
  },
];

export function getPrizeById(id: number): Prize | undefined {
  return PRIZES.find((p) => p.id === id);
}

export function getRandomPrizeId(): number {
  return PRIZES[Math.floor(Math.random() * PRIZES.length)].id;
}
