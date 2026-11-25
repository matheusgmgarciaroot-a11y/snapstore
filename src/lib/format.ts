export const STORE_INSTAGRAM_HANDLE = "@snap_storebr";
export const STORE_INSTAGRAM_URL = "https://instagram.com/snap_storebr";

export const STANDARD_ORIGINAL_PRICE = 350;
export const STANDARD_PRICE = 280;
export const COMBO_UNIT_PRICE = 250;
export const COMMEMORATIVE_PRICE = 400;

/**
 * Formats a numeric amount in Brazilian Reais (BRL).
 */
export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/**
 * Calculates percentage discount between original and current price.
 */
export function getDiscountPercent(originalPrice?: number, currentPrice?: number): number {
  if (!originalPrice || !currentPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

/**
 * Calculates Pix discounted price (5% off).
 */
export function getPixPrice(value: number): number {
  return Math.round(value * 0.95 * 100) / 100;
}

/**
 * Formats 6x interest-free installment text.
 */
export function formatInstallment(value: number, installments = 6): string {
  const part = value / installments;
  return `${installments}x de ${formatBRL(part)} sem juros`;
}
