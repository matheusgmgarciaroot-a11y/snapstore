"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Fire, Minus, Plus, ShoppingBag, Trash, Truck, X } from "@phosphor-icons/react";
import { getItemUnitPrice, useCart } from "@/context/CartContext";
import { COMBO_UNIT_PRICE, formatBRL } from "@/lib/format";
import { JerseyGraphic } from "@/components/catalog/JerseyGraphic";

const FREE_SHIPPING_THRESHOLD = 499;

export function CartDrawer() {
  const { items, isOpen, closeCart, subtotal, totalItems, comboActive, comboSavings, updateQuantity, removeItem } = useCart();
  const reduceMotion = useReducedMotion();

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Sacola de compras">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60"
          />

          <motion.aside
            initial={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className="relative z-10 w-full max-w-md bg-[#FFFFFF] text-[#111317] h-full flex flex-col border-l border-[#E1E4E8] shadow-2xl"
          >
            <div className="px-5 py-4 border-b border-[#E1E4E8] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={20} weight="bold" className="text-[#D61F26]" />
                <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight">
                  Sua Sacola
                </h2>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="p-2 rounded-[2px] text-[#5A6270] hover:text-[#111317] hover:bg-[#F1F3F5] cursor-pointer"
                aria-label="Fechar sacola"
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            <div className="px-5 py-3 bg-[#F6F7F8] border-b border-[#E1E4E8] space-y-2">
              <div className="flex items-center gap-2.5 text-xs font-medium text-[#111317]">
                <Truck size={18} weight="bold" className="text-[#D61F26] shrink-0" />
                {remainingForFreeShipping === 0 ? (
                  <span>Você desbloqueou Frete Grátis para todo o Brasil.</span>
                ) : (
                  <span>
                    Faltam <strong className="font-mono-tabular">{formatBRL(remainingForFreeShipping)}</strong> para ganhar Frete Grátis.
                  </span>
                )}
              </div>
              <div
                className={`flex items-center gap-2 text-xs font-semibold px-2.5 py-1.5 rounded-[2px] border ${
                  comboActive
                    ? "bg-[#ECFDF3] border-[#BBF7D0] text-[#15803D]"
                    : "bg-[#FFF5F5] border-[#FECACA] text-[#B3171D]"
                }`}
              >
                <Fire size={15} weight="fill" className="shrink-0" />
                {comboActive ? (
                  <span>
                    Combo 2+ ativo! Camisas por {formatBRL(COMBO_UNIT_PRICE)} cada
                    {comboSavings > 0 ? ` (-${formatBRL(comboSavings)})` : ""}
                  </span>
                ) : totalItems === 1 ? (
                  <span>
                    Adicione mais 1 camisa e pague {formatBRL(COMBO_UNIT_PRICE)} em cada!
                  </span>
                ) : (
                  <span>
                    Leve 2+ camisas e pague {formatBRL(COMBO_UNIT_PRICE)} cada uma!
                  </span>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 divide-y divide-[#E1E4E8]">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-8 space-y-4">
                  <div className="w-32 h-40 rounded-[4px] overflow-hidden bg-[#0D0F12] border border-[#272C35] flex items-center justify-center p-2">
                    <Image
                      src="/images/mascot/nfl-running.jpg"
                      alt="Mascote Snap Store"
                      width={128}
                      height={160}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="font-display text-2xl font-bold uppercase text-[#111317]">
                      Sua sacola está vazia
                    </p>
                    <p className="text-sm text-[#5A6270] max-w-[28ch]">
                      Escolha uma liga e encontre a jersey do seu time favorito.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <Link
                      href="/nfl"
                      onClick={closeCart}
                      className="px-4 py-2.5 rounded-[2px] bg-[#111317] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#232730]"
                    >
                      Ver NFL
                    </Link>
                    <Link
                      href="/nba"
                      onClick={closeCart}
                      className="px-4 py-2.5 rounded-[2px] bg-[#D61F26] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#B3171D]"
                    >
                      Ver NBA
                    </Link>
                  </div>
                </div>
              ) : (
                items.map((item) => {
                  const unitPrice = getItemUnitPrice(item, comboActive);
                  return (
                    <div key={item.cartKey} className="py-4 flex gap-3.5">
                      <Link
                        href={`/produto/${item.jersey.slug}`}
                        onClick={closeCart}
                        className="w-20 h-24 rounded-[2px] bg-[#F6F7F8] border border-[#E1E4E8] p-1.5 shrink-0 flex items-center justify-center"
                      >
                        <JerseyGraphic
                          jersey={item.jersey}
                          displayName={item.customName || item.jersey.playerName}
                          displayNumber={item.customNumber || item.jersey.playerNumber}
                          compact
                        />
                      </Link>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-[11px] font-mono-tabular uppercase tracking-wider text-[#5A6270]">
                              {item.jersey.league.toUpperCase()} / {item.jersey.divisionName}
                            </p>
                            <Link
                              href={`/produto/${item.jersey.slug}`}
                              onClick={closeCart}
                              className="text-sm font-bold text-[#111317] hover:text-[#D61F26] line-clamp-2"
                            >
                              {item.jersey.title}
                            </Link>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#5A6270]">
                              <span className="font-mono-tabular bg-[#F6F7F8] border border-[#E1E4E8] px-1.5 py-0.5 rounded-[2px] text-[#111317] font-semibold">
                                Tam: {item.size}
                              </span>
                              {(item.customName || item.customNumber) && (
                                <span className="font-mono-tabular bg-[#FFF1F1] border border-[#F6C8CA] px-1.5 py-0.5 rounded-[2px] text-[#B3171D] font-semibold">
                                  Personalizada: {item.customName || "-"} #{item.customNumber || "-"}
                                </span>
                              )}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.cartKey)}
                            className="p-1.5 text-[#5A6270] hover:text-[#DC2626] cursor-pointer"
                            aria-label="Remover item"
                          >
                            <Trash size={16} />
                          </button>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center border border-[#E1E4E8] rounded-[2px]">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                              className="p-1.5 text-[#111317] hover:bg-[#F6F7F8] cursor-pointer"
                              aria-label="Diminuir quantidade"
                            >
                              <Minus size={12} weight="bold" />
                            </button>
                            <span className="px-3 text-xs font-mono-tabular font-bold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                              className="p-1.5 text-[#111317] hover:bg-[#F6F7F8] cursor-pointer"
                              aria-label="Aumentar quantidade"
                            >
                              <Plus size={12} weight="bold" />
                            </button>
                          </div>

                          <p className="font-mono-tabular text-sm font-bold text-[#111317]">
                            {formatBRL(unitPrice * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {items.length > 0 && (
              <div className="p-5 border-t border-[#E1E4E8] bg-[#F6F7F8] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#5A6270]">Subtotal</span>
                  <span className="font-mono-tabular text-xl font-bold text-[#111317]">
                    {formatBRL(subtotal)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full py-3.5 px-5 rounded-[2px] bg-[#D61F26] hover:bg-[#B3171D] text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center transition-transform active:scale-[0.98]"
                >
                  Finalizar Pedido
                </Link>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
