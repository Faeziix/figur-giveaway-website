export async function createDiscountCode(
  _discountPercent: number,
  prizeId: number
): Promise<string> {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `FIGLAND-${prizeId}-${random}`;
}
