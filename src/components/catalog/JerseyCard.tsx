"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Fire, Tag } from "@phosphor-icons/react";
import { JerseyProduct } from "@/data/jerseys";
import {
  COMBO_UNIT_PRICE,
  formatBRL,
  formatInstallment,
  getDiscountPercent,
} from "@/lib/format";
import { getTeamLogoSrc } from "@/lib/teamLogo";
import { JerseyGraphic } from "./JerseyGraphic";

interface JerseyCardProps {
  jersey: JerseyProduct;
}

export function JerseyCard({ jersey }: JerseyCardProps) {
  const logoSrc = getTeamLogoSrc(jersey.teamId);
  const discountPercent = getDiscountPercent(jersey.originalPrice, jersey.price);
  const isCommemorative = jersey.edition === "Throwback";

  return (
    <article className="group bg-[#FFFFFF] border border-[#E1E4E8] hover:border-[#111317] rounded-[3px] flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_-14px_rgba(17,19,23,0.16)]">
      <Link
        href={`/produto/${jersey.slug}`}
        className="relative bg-[#FFFFFF] border-b border-[#E1E4E8] p-3 sm:p-5 aspect-[4/4.2] flex items-center justify-center overflow-hidden"
      >
        {/* Team color indicator bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ backgroundColor: jersey.primaryColor }}
        />

        {/* Team logo badge — top-left */}
        {logoSrc && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
            <div className="w-7 h-7 sm:w-9 sm:h-9 bg-white rounded-[2px] border border-[#E1E4E8] flex items-center justify-center p-1 shadow-sm">
              <Image
                src={logoSrc}
                alt={`Logo ${jersey.teamName}`}
                width={28}
                height={28}
                className="w-5 h-5 sm:w-7 sm:h-7 object-contain"
              />
            </div>
          </div>
        )}

        {/* Discount % or Commemorative badge near the jersey — top-right */}
        {discountPercent > 0 ? (
          <span className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-[2px] bg-[#D61F26] text-white font-mono-tabular text-[9px] sm:text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
            <Tag size={11} weight="fill" className="hidden sm:inline" />
            <span>-{discountPercent}% OFF</span>
          </span>
        ) : (
          <span className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-[2px] bg-[#111317] text-[#FDE047] font-mono-tabular text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow-sm">
            Consultar
          </span>
        )}

        <div className="w-32 h-32 sm:w-48 sm:h-48 transition-transform duration-300 group-hover:scale-105">
          <JerseyGraphic jersey={jersey} />
        </div>
      </Link>

      <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between gap-2 sm:gap-3">
        <div className="space-y-1 sm:space-y-1.5">
          <div className="flex items-center justify-between gap-1.5">
            <span className="font-mono-tabular text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#5A6270] truncate">
              {jersey.divisionName}
            </span>
            <span
              className={`font-mono-tabular text-[9px] sm:text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-[2px] border shrink-0 ${
                isCommemorative
                  ? "bg-[#111317] text-white border-[#111317]"
                  : "bg-[#F6F7F8] text-[#111317] border-[#E1E4E8]"
              }`}
            >
              {isCommemorative ? "Comem." : "Oficial"}
            </span>
          </div>

          <Link
            href={`/produto/${jersey.slug}`}
            className="block font-bold text-xs sm:text-[15px] leading-snug text-[#111317] group-hover:text-[#D61F26] transition-colors line-clamp-2"
          >
            {jersey.title}
          </Link>
        </div>

        <div className="pt-2 border-t border-[#F0F2F4] space-y-1 sm:space-y-1.5">
          {jersey.originalPrice && (
            <div className="flex items-center gap-1.5">
              <span className="font-mono-tabular text-[10px] sm:text-xs text-[#8A93A2] line-through">
                De {formatBRL(jersey.originalPrice)}
              </span>
              {discountPercent > 0 && (
                <span className="font-mono-tabular text-[9px] sm:text-[10px] font-extrabold text-[#D61F26] bg-[#FFF1F1] px-1 py-0.5 rounded-[2px]">
                  -{discountPercent}%
                </span>
              )}
            </div>
          )}

          <div className="flex items-baseline gap-1.5">
            <span className="font-mono-tabular text-base sm:text-xl font-extrabold text-[#111317]">
              {formatBRL(jersey.price)}
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#5A6270]">
              à vista
            </span>
          </div>

          {isCommemorative ? (
            <p className="text-[10px] sm:text-[11px] font-semibold text-[#92400E] bg-[#FEF3C7] border border-[#FDE68A] px-1.5 sm:px-2 py-1 rounded-[2px] leading-tight">
              Consultar disp.
            </p>
          ) : (
            <p className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-[#15803D] bg-[#ECFDF3] border border-[#BBF7D0] px-1.5 sm:px-2 py-1 rounded-[2px] w-full leading-tight">
              <Fire size={12} weight="fill" className="shrink-0" />
              <span className="truncate">2+: {formatBRL(COMBO_UNIT_PRICE)}/un</span>
            </p>
          )}

          <p className="hidden sm:block text-[11px] text-[#5A6270]">
            ou {formatInstallment(jersey.price)}
          </p>

          <Link
            href={`/produto/${jersey.slug}`}
            className="mt-1 w-full py-2 sm:py-2.5 px-2 sm:px-3 rounded-[2px] bg-[#111317] group-hover:bg-[#D61F26] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-colors whitespace-nowrap"
          >
            <span>{isCommemorative ? "Detalhes" : "Comprar"}</span>
            <ArrowRight size={13} weight="bold" />
          </Link>
        </div>
      </div>
    </article>
  );
}
