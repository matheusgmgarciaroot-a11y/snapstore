import {
  COMBO_UNIT_PRICE,
  COMMEMORATIVE_PRICE,
  STANDARD_ORIGINAL_PRICE,
  STANDARD_PRICE,
  STORE_INSTAGRAM_HANDLE,
} from "./format";

export type OrderStatus =
  | "Pendente"
  | "Pago"
  | "Em Produção"
  | "Enviado"
  | "Entregue"
  | "Cancelado";

export const ORDER_STATUSES: OrderStatus[] = [
  "Pendente",
  "Pago",
  "Em Produção",
  "Enviado",
  "Entregue",
  "Cancelado",
];

export interface OrderItemRecord {
  jerseyId: string;
  slug: string;
  title: string;
  teamName: string;
  size: string;
  quantity: number;
  unitPrice: number;
  customName?: string;
  customNumber?: string;
}

export interface OrderRecord {
  id: string;
  code: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  cep: string;
  address: string;
  cityState: string;
  paymentMethod: "pix" | "card";
  items: OrderItemRecord[];
  subtotal: number;
  comboSavings: number;
  shippingCost: number;
  finalTotal: number;
  status: OrderStatus;
  trackingCode?: string;
}

export interface StoreSettings {
  standardOriginalPrice: number;
  standardPrice: number;
  comboUnitPrice: number;
  commemorativePrice: number;
  freeShippingThreshold: number;
  instagramHandle: string;
  nbaUnderConstruction: boolean;
}

export interface JerseyOverride {
  hidden?: boolean;
  onRequest?: boolean;
  customPrice?: number;
}

export const DEFAULT_SETTINGS: StoreSettings = {
  standardOriginalPrice: STANDARD_ORIGINAL_PRICE,
  standardPrice: STANDARD_PRICE,
  comboUnitPrice: COMBO_UNIT_PRICE,
  commemorativePrice: COMMEMORATIVE_PRICE,
  freeShippingThreshold: 499,
  instagramHandle: STORE_INSTAGRAM_HANDLE,
  nbaUnderConstruction: true,
};

export const ORDERS_STORAGE_KEY = "snap-store-orders-v1";
export const SETTINGS_STORAGE_KEY = "snap-store-settings-v1";
export const OVERRIDES_STORAGE_KEY = "snap-store-catalog-overrides-v1";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getStoredOrders(): OrderRecord[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as OrderRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: OrderRecord): OrderRecord[] {
  const current = getStoredOrders();
  const next = [order, ...current];
  if (isBrowser()) {
    try {
      window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage quota errors
    }
  }
  return next;
}

export function updateStoredOrders(orders: OrderRecord[]): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch {
    // Ignore storage quota errors
  }
}

export function getStoreSettings(): StoreSettings {
  if (!isBrowser()) return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<StoreSettings>) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveStoreSettings(settings: StoreSettings): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Ignore storage quota errors
  }
}

export function getCatalogOverrides(): Record<string, JerseyOverride> {
  if (!isBrowser()) return {};
  try {
    const raw = window.localStorage.getItem(OVERRIDES_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, JerseyOverride>;
  } catch {
    return {};
  }
}

export function saveCatalogOverrides(
  overrides: Record<string, JerseyOverride>
): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(OVERRIDES_STORAGE_KEY, JSON.stringify(overrides));
  } catch {
    // Ignore storage quota errors
  }
}
