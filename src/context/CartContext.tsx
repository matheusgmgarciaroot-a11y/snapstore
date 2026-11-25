"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { JerseyProduct, JerseySize } from "@/data/jerseys";
import { COMBO_UNIT_PRICE } from "@/lib/format";

export interface CartItem {
  cartKey: string;
  jersey: JerseyProduct;
  size: JerseySize;
  quantity: number;
  customName?: string;
  customNumber?: string;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  subtotal: number;
  comboActive: boolean;
  comboSavings: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (params: {
    jersey: JerseyProduct;
    size: JerseySize;
    quantity?: number;
    customName?: string;
    customNumber?: string;
  }) => void;
  updateQuantity: (cartKey: string, quantity: number) => void;
  removeItem: (cartKey: string) => void;
  clearCart: () => void;
}

const STORAGE_KEY = "snap-store-cart-v1";
const CUSTOMIZATION_FEE = 39.9;

const CartContext = createContext<CartContextValue | null>(null);

export function getItemUnitPrice(item: CartItem, comboActive = false): number {
  const hasCustom = Boolean(item.customName?.trim() || item.customNumber?.trim());
  const isCommemorative = item.jersey.edition === "Throwback";
  const basePrice = !isCommemorative && comboActive ? COMBO_UNIT_PRICE : item.jersey.price;
  return basePrice + (hasCustom ? CUSTOMIZATION_FEE : 0);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as CartItem[];
          if (Array.isArray(parsed)) {
            setItems(parsed);
          }
        }
      } catch {
        // Ignore malformed storage entries
      } finally {
        setHydrated(true);
      }
    });
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage quota errors
    }
  }, [items, hydrated]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(
    ({
      jersey,
      size,
      quantity = 1,
      customName = "",
      customNumber = "",
    }: {
      jersey: JerseyProduct;
      size: JerseySize;
      quantity?: number;
      customName?: string;
      customNumber?: string;
    }) => {
      const normalizedName = customName.trim().toUpperCase();
      const normalizedNumber = customNumber.trim();
      const cartKey = `${jersey.id}__${size}__${normalizedName}__${normalizedNumber}`;

      setItems((prev) => {
        const existing = prev.find((item) => item.cartKey === cartKey);
        if (existing) {
          return prev.map((item) =>
            item.cartKey === cartKey
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [
          ...prev,
          {
            cartKey,
            jersey,
            size,
            quantity,
            customName: normalizedName || undefined,
            customNumber: normalizedNumber || undefined,
          },
        ];
      });
      setIsOpen(true);
    },
    []
  );

  const updateQuantity = useCallback((cartKey: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.cartKey !== cartKey));
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.cartKey === cartKey ? { ...item, quantity } : item
      )
    );
  }, []);

  const removeItem = useCallback((cartKey: string) => {
    setItems((prev) => prev.filter((item) => item.cartKey !== cartKey));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const comboActive = totalItems >= 2;

  const subtotalWithoutCombo = items.reduce(
    (acc, item) => acc + getItemUnitPrice(item, false) * item.quantity,
    0
  );
  const subtotal = items.reduce(
    (acc, item) => acc + getItemUnitPrice(item, comboActive) * item.quantity,
    0
  );
  const comboSavings = Math.max(0, subtotalWithoutCombo - subtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        totalItems,
        subtotal,
        comboActive,
        comboSavings,
        openCart,
        closeCart,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}

export { CUSTOMIZATION_FEE };
