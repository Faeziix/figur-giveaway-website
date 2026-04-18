import type { Prize } from "@/app/_types";

export const PRIZES: Prize[] = [
  {
    id: 1,
    type: "discount",
    headline: "15% Off Any Stufig",
    description: "A taste of Figland — 15% off our entire Coated Stufig collection.",
    value: "15% off Coated Stufig",
    discountPercent: 15,
  },
  {
    id: 2,
    type: "discount",
    headline: "20% Off the Firuz Gift Box",
    description: "Our flagship piece. The Persian-turquoise treasure chest, yours at 20% off.",
    value: "20% off Firuz Gift Box",
    discountPercent: 20,
  },
  {
    id: 3,
    type: "discount",
    headline: "Free Pistachio Dipping Sauce",
    description: "Complimentary with any order — our hand-crafted pistachio sauce awaits.",
    value: "Free Pistachio Dipping Sauce",
    discountPercent: 100,
  },
  {
    id: 4,
    type: "discount",
    headline: "25% Off Large Heritage Box",
    description: "The grandest gift in our collection, generously discounted.",
    value: "25% off Large Heritage Gift Box",
    discountPercent: 25,
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
