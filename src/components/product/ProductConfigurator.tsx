"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Fire, InstagramLogo, ShieldCheck, ShoppingBag, Tag, Truck } from "@phosphor-icons/react";
import { JERSEY_SIZES, JerseyProduct, JerseySize } from "@/data/jerseys";
import { CUSTOMIZATION_FEE, useCart } from "@/context/CartContext";
import {
  COMBO_UNIT_PRICE,
  formatBRL,
  formatInstallment,
  getDiscountPercent,
  STORE_INSTAGRAM_HANDLE,
  STORE_INSTAGRAM_URL,
} from "@/lib/format";
import { JerseyGraphic } from "@/components/catalog/JerseyGraphic";
import { JerseyCard } from "@/components/catalog/JerseyCard";

interface ProductConfiguratorProps {
  jersey: JerseyProduct;
  related: JerseyProduct[];
}

export function ProductConfigurator({ jersey, related }: ProductConfiguratorProps) {
  const { addItem } = useCart();

  const [selectedSize, setSelectedSize] = useState<JerseySize>("G");
  const [viewSide, setViewSide] = useState<"front" | "back">("front");
  const [enableCustom, setEnableCustom] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customNumber, setCustomNumber] = useState("");
  const [addedFeedback, setAddedFeedback] = useState(false);

  const hasCustomValues =
    enableCustom && (customName.trim().length > 0 || customNumber.trim().length > 0);
  const finalPrice = jersey.price + (hasCustomValues ? CUSTOMIZATION_FEE : 0);
  const discountPercent = getDiscountPercent(jersey.originalPrice, jersey.price);
  const isCommemorative = jersey.edition === "Throwback";

  const handleAdd = () => {
    addItem({
      jersey,
      size: selectedSize,
      quantity: 1,
      customName: enableCustom ? customName : "",
      customNumber: enableCustom ? customNumber : "",
    });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1800);
  };

  const leaguePath = jersey.league === "nfl" ? "/nfl" : "/nba";

  return (
    <div className="flex-1 bg-[#F6F7F8] text-[#111317] py-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#5A6270]">
          <Link href="/" className="hover:text-[#111317]">
            Início
          </Link>
          <span>/</span>
          <Link href={leaguePath} className="uppercase hover:text-[#111317]">
            {jersey.league.toUpperCase()}
          </Link>
          <span>/</span>
          <span>{jersey.conferenceName}</span>
          <span>/</span>
          <span>{jersey.divisionName}</span>
          <span>/</span>
          <span className="text-[#111317] font-semibold">{jersey.teamName}</span>
        </nav>

        {/* Product Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 items-start">
          {/* Left Jersey Studio Preview */}
          <div className="bg-[#FFFFFF] border border-[#E1E4E8] rounded-[2px] p-6 md:p-10 space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-mono-tabular text-xs uppercase tracking-wider px-2.5 py-1 rounded-[2px] bg-[#F6F7F8] border border-[#E1E4E8] text-[#111317] font-bold">
                SKU: {jersey.sku}
              </span>
              {!jersey.image && (
              <div className="inline-flex rounded-[2px] border border-[#E1E4E8] bg-[#F6F7F8] p-0.5">
                <button
                  type="button"
                  onClick={() => setViewSide("front")}
                  className={`px-3 py-1.5 rounded-[2px] text-xs font-bold uppercase cursor-pointer ${
                    viewSide === "front"
                      ? "bg-[#111317] text-white"
                      : "text-[#5A6270] hover:text-[#111317]"
                  }`}
                >
                  Frente
                </button>
                <button
                  type="button"
                  onClick={() => setViewSide("back")}
                  className={`px-3 py-1.5 rounded-[2px] text-xs font-bold uppercase cursor-pointer ${
                    viewSide === "back"
                      ? "bg-[#111317] text-white"
                      : "text-[#5A6270] hover:text-[#111317]"
                  }`}
                >
                  Costas
                </button>
              </div>
              )}
            </div>

            <div className="relative aspect-square max-h-[440px] mx-auto flex items-center justify-center p-4 bg-[#FFFFFF] border border-[#E1E4E8] rounded-[2px]">
              {discountPercent > 0 ? (
                <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 px-3 py-1.5 rounded-[2px] bg-[#D61F26] text-white font-mono-tabular text-xs font-extrabold uppercase tracking-wider shadow-sm">
                  <Tag size={14} weight="fill" />
                  <span>-{discountPercent}% OFF</span>
                </span>
              ) : (
                <span className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-[2px] bg-[#111317] text-[#FDE047] font-mono-tabular text-xs font-bold uppercase tracking-wider">
                  Comemorativa · Sob Consulta
                </span>
              )}
              <div className="w-72 h-72 sm:w-80 sm:h-80">
                <JerseyGraphic
                  jersey={jersey}
                  viewSide={viewSide}
                  displayName={
                    enableCustom && customName.trim()
                      ? customName
                      : jersey.playerName
                  }
                  displayNumber={
                    enableCustom && customNumber.trim()
                      ? customNumber
                      : jersey.playerNumber
                  }
                />
              </div>
            </div>

            <p className="text-xs text-[#5A6270] text-center">
              {jersey.fabricNote}
            </p>
          </div>

          {/* Right Purchase & Customizer Panel */}
          <div className="bg-[#FFFFFF] border border-[#E1E4E8] rounded-[2px] p-6 md:p-8 space-y-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular uppercase tracking-wider text-[#5A6270]">
                <span>{jersey.league.toUpperCase()}</span>
                <span>/</span>
                <span>{jersey.conferenceName}</span>
                <span>/</span>
                <span>{jersey.divisionName}</span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#111317] leading-tight">
                {jersey.title}
              </h1>
            </div>

            {/* Pricing */}
            <div className="p-4 rounded-[2px] bg-[#F6F7F8] border border-[#E1E4E8] space-y-2">
              {jersey.originalPrice && (
                <div className="flex items-center gap-2">
                  <span className="font-mono-tabular text-sm text-[#8A93A2] line-through">
                    De {formatBRL(jersey.originalPrice)}
                  </span>
                  {discountPercent > 0 && (
                    <span className="font-mono-tabular text-xs font-extrabold text-white bg-[#D61F26] px-2 py-0.5 rounded-[2px]">
                      -{discountPercent}% OFF
                    </span>
                  )}
                </div>
              )}
              <div className="flex items-baseline gap-2.5">
                <span className="font-mono-tabular text-3xl font-extrabold text-[#111317]">
                  {formatBRL(finalPrice)}
                </span>
                <span className="text-xs font-bold uppercase text-[#5A6270]">
                  à vista ou {formatInstallment(finalPrice)}
                </span>
              </div>
              {!isCommemorative ? (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] bg-[#ECFDF3] border border-[#BBF7D0] text-xs font-bold text-[#15803D]">
                  <Fire size={15} weight="fill" />
                  <span>
                    Promoção Combo: a partir de 2 camisas sai por {formatBRL(COMBO_UNIT_PRICE)} cada uma!
                  </span>
                </div>
              ) : (
                <p className="text-xs font-semibold text-[#92400E]">
                  Edição Comemorativa — valor fixo de {formatBRL(jersey.price)} mediante consulta de estoque.
                </p>
              )}
            </div>

            {/* Size Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#111317]">
                  Escolha o Tamanho
                </span>
                <span className="font-mono-tabular text-xs text-[#5A6270]">
                  Selecionado: {selectedSize}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {JERSEY_SIZES.map((size) => {
                  const active = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded-[2px] font-mono-tabular text-sm font-bold border transition-colors cursor-pointer ${
                        active
                          ? "bg-[#111317] text-white border-[#111317]"
                          : "bg-[#FFFFFF] text-[#111317] border-[#E1E4E8] hover:border-[#111317]"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional Custom Name & Number */}
            <div className="border border-[#E1E4E8] rounded-[2px] p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-bold text-[#111317]">
                    Personalizar Nome e Número
                  </p>
                  <p className="text-xs text-[#5A6270]">
                    Opcional (+ {formatBRL(CUSTOMIZATION_FEE)}){" "}
                    {jersey.image ? "- aplicado na produção da sua camisa" : "- visualize nas costas"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const next = !enableCustom;
                    setEnableCustom(next);
                    if (next) setViewSide("back");
                  }}
                  className={`px-3 py-1.5 rounded-[2px] text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                    enableCustom
                      ? "bg-[#D61F26] text-white"
                      : "bg-[#F6F7F8] text-[#111317] border border-[#E1E4E8] hover:border-[#111317]"
                  }`}
                >
                  {enableCustom ? "Ativado" : "Personalizar"}
                </button>
              </div>

              {enableCustom && (
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_110px] gap-3 pt-1">
                  <div className="space-y-1">
                    <label
                      htmlFor="custom-name"
                      className="block text-xs font-semibold text-[#111317]"
                    >
                      Nome nas costas
                    </label>
                    <input
                      id="custom-name"
                      type="text"
                      maxLength={12}
                      value={customName}
                      onChange={(e) => {
                        setCustomName(e.target.value.toUpperCase());
                        setViewSide("back");
                      }}
                      placeholder="Ex: SILVA"
                      className="w-full px-3 py-2 rounded-[2px] border border-[#E1E4E8] text-sm font-mono-tabular uppercase text-[#111317] placeholder:text-[#5A6270] focus:outline-none focus:border-[#111317]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label
                      htmlFor="custom-number"
                      className="block text-xs font-semibold text-[#111317]"
                    >
                      Número
                    </label>
                    <input
                      id="custom-number"
                      type="text"
                      maxLength={2}
                      inputMode="numeric"
                      value={customNumber}
                      onChange={(e) => {
                        setCustomNumber(e.target.value.replace(/\D/g, "").slice(0, 2));
                        setViewSide("back");
                      }}
                      placeholder="Ex: 10"
                      className="w-full px-3 py-2 rounded-[2px] border border-[#E1E4E8] text-sm font-mono-tabular text-[#111317] placeholder:text-[#5A6270] focus:outline-none focus:border-[#111317]"
                    />
                  </div>
                </div>
              )}
            </div>

            {jersey.onRequest && (
              <div className="p-4 rounded-[2px] border border-[#F2C94C] bg-[#FFF8E1] space-y-2.5">
                <p className="text-xs font-bold text-[#7A5B00]">
                  Camisa comemorativa sob consulta: confirme a disponibilidade do seu tamanho antes de finalizar o pedido.
                </p>
                <a
                  href={STORE_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[2px] bg-[#111317] hover:bg-[#D61F26] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <InstagramLogo size={15} weight="bold" />
                  <span>Consultar no Instagram {STORE_INSTAGRAM_HANDLE}</span>
                </a>
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAdd}
              className="w-full py-4 px-6 rounded-[2px] bg-[#D61F26] hover:bg-[#B3171D] text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-[0.98] cursor-pointer whitespace-nowrap"
            >
              {addedFeedback ? (
                <>
                  <Check size={18} weight="bold" />
                  <span>Adicionado à Sacola</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={18} weight="bold" />
                  <span>Adicionar à Sacola</span>
                </>
              )}
            </button>

            <p className="text-sm text-[#5A6270] leading-relaxed">
              {jersey.description}
            </p>

            <div className="pt-2 border-t border-[#E1E4E8] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#111317]">
              <div className="flex items-center gap-2">
                <Truck size={18} weight="bold" className="text-[#D61F26]" />
                <span>Frete grátis acima de R$ 499,00</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} weight="bold" className="text-[#D61F26]" />
                <span>Troca fácil em até 7 dias</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Jerseys in Division */}
        {related.length > 0 && (
          <section className="space-y-5 pt-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight">
                Mais de {jersey.divisionName}
              </h2>
              <Link
                href={leaguePath}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D61F26] hover:underline"
              >
                <ArrowLeft size={14} weight="bold" />
                <span>Voltar ao catálogo {jersey.league.toUpperCase()}</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((item) => (
                <JerseyCard key={item.id} jersey={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
