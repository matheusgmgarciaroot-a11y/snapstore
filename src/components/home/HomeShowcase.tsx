"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Fire,
  InstagramLogo,
  ShieldCheck,
  Shuffle,
  Sparkle,
  Tag,
  Truck,
} from "@phosphor-icons/react";
import { JerseyProduct, NFL_JERSEYS } from "@/data/jerseys";
import {
  COMBO_UNIT_PRICE,
  COMMEMORATIVE_PRICE,
  formatBRL,
  getDiscountPercent,
  STANDARD_ORIGINAL_PRICE,
  STANDARD_PRICE,
  STORE_INSTAGRAM_HANDLE,
  STORE_INSTAGRAM_URL,
} from "@/lib/format";
import { getTeamLogoSrc } from "@/lib/teamLogo";
import { JerseyGraphic } from "@/components/catalog/JerseyGraphic";
import { NbaSymbol, NflSymbol } from "@/components/catalog/LeagueSymbols";

interface HomeShowcaseProps {
  featuredJerseys: JerseyProduct[];
}

export function HomeShowcase({ featuredJerseys }: HomeShowcaseProps) {
  const reduceMotion = useReducedMotion();

  const teamTicker = [
    { label: "KANSAS CITY CHIEFS", teamId: "kansas-city-chiefs" },
    { label: "PHILADELPHIA EAGLES", teamId: "philadelphia-eagles" },
    { label: "BUFFALO BILLS", teamId: "buffalo-bills" },
    { label: "DALLAS COWBOYS", teamId: "dallas-cowboys" },
    { label: "SAN FRANCISCO 49ERS", teamId: "san-francisco-49ers" },
    { label: "BALTIMORE RAVENS", teamId: "baltimore-ravens" },
    { label: "ATLANTA FALCONS", teamId: "atlanta-falcons" },
    { label: "GREEN BAY PACKERS", teamId: "green-bay-packers" },
    { label: "DETROIT LIONS", teamId: "detroit-lions" },
    { label: "PITTSBURGH STEELERS", teamId: "pittsburgh-steelers" },
    { label: "NEW ENGLAND PATRIOTS", teamId: "new-england-patriots" },
    { label: "CINCINNATI BENGALS", teamId: "cincinnati-bengals" },
    { label: "SEATTLE SEAHAWKS", teamId: "seattle-seahawks" },
    { label: "TAMPA BAY BUCCANEERS", teamId: "tampa-bay-buccaneers" },
  ];

  return (
    <div className="bg-[#0D0F12] text-[#F4F5F7] arena-grain overflow-x-hidden">
      {/* Dark Arena Hero with Big Store Emblem + Animated Mascots */}
      <section className="relative min-h-[calc(100dvh-110px)] flex items-center overflow-hidden border-b border-[#272C35]">
        <Image
          src="/images/hero-arena.jpg"
          alt="Vestiário Snap Store com camisas de futebol americano e basquete"
          fill
          priority
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F12] via-[#0D0F12]/80 to-[#0D0F12]/65" />
        {/* Subtle Red Arena Spotlight */}
        <div
          className="pointer-events-none absolute -top-24 right-1/4 w-[520px] h-[520px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #D61F26 0%, transparent 70%)" }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-4 md:px-8 pt-10 pb-14 lg:pt-12 lg:pb-16 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-12 items-center">
          {/* Left Editorial Statement + Big Logo Badge */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={reduceMotion ? undefined : { scale: 1.06, rotate: -2 }}
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-[6px] overflow-hidden bg-[#000000] border-2 border-[#D61F26] shadow-[0_0_36px_-6px_rgba(214,31,38,0.65)] shrink-0"
              >
                <Image
                  src="/images/snap-store-logo.jpg"
                  alt="Escudo Oficial Snap Store"
                  width={112}
                  height={112}
                  priority
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-1.5 font-mono-tabular text-[11px] uppercase tracking-[0.2em] text-[#D61F26] font-extrabold bg-[#D61F26]/15 border border-[#D61F26]/35 px-2.5 py-1 rounded-[2px]">
                  <Tag size={12} weight="fill" />
                  <span>20% OFF · 2+ por R$ 250 cada</span>
                </span>
                <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#C8CFD9]">
                  Snap Store Brasil · Exclusivo NFL e NBA
                </p>
                <a
                  href={STORE_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-[#D61F26] transition-colors"
                >
                  <InstagramLogo size={15} weight="bold" className="text-[#D61F26]" />
                  <span>{STORE_INSTAGRAM_HANDLE}</span>
                </a>
              </div>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight leading-[0.94] text-[#F4F5F7]">
              Vista a camisa da sua franquia.
            </h1>

            <p className="text-base sm:text-lg text-[#C8CFD9] max-w-[48ch] leading-relaxed">
              Todas as 32 franquias da NFL e as 30 da NBA separadas por liga, conferência e divisão. De{" "}
              <span className="line-through text-[#8A93A2]">{formatBRL(STANDARD_ORIGINAL_PRICE)}</span> por{" "}
              <strong className="text-white">{formatBRL(STANDARD_PRICE)}</strong> ou{" "}
              <strong className="text-[#4ADE80]">{formatBRL(COMBO_UNIT_PRICE)} cada</strong> levando 2+.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/nfl"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[2px] bg-[#D61F26] hover:bg-[#B3171D] text-white text-sm font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5 active:scale-[0.98] shadow-[0_10px_28px_-8px_rgba(214,31,38,0.7)] whitespace-nowrap"
              >
                <span>Explorar NFL</span>
                <ArrowRight size={16} weight="bold" />
              </Link>
              <Link
                href="/nba"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[2px] bg-[#161A20] hover:bg-[#1F252E] text-[#F4F5F7] border border-[#2F3642] hover:border-white/40 text-sm font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5 active:scale-[0.98] whitespace-nowrap"
              >
                <span>Explorar NBA</span>
                <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </motion.div>

          {/* Right: Animated Mascot Duo + Clickable League Symbol Gateways */}
          <div className="space-y-4">
            {/* Mascot Arena Stage */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-[4px] border border-[#272C35] bg-[#000000] overflow-hidden px-4 pt-4 pb-2 flex items-end justify-around gap-2"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-35"
                style={{
                  background:
                    "radial-gradient(circle at 30% 80%, rgba(214,31,38,0.45), transparent 55%), radial-gradient(circle at 75% 80%, rgba(29,66,138,0.45), transparent 55%)",
                }}
              />
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-44 sm:w-52 h-52 sm:h-60 shrink-0"
              >
                <Image
                  src="/images/mascot/nfl-flag.jpg"
                  alt="Mascote Snap Store NFL com bandeira"
                  fill
                  priority
                  className="object-contain object-bottom"
                />
              </motion.div>
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -9, 0] }}
                transition={{ duration: 4.1, delay: 0.4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-40 sm:w-48 h-48 sm:h-56 shrink-0"
              >
                <Image
                  src="/images/mascot/nba-dribbling.jpg"
                  alt="Mascote Snap Store NBA driblando"
                  fill
                  priority
                  className="object-contain object-bottom"
                />
              </motion.div>
            </motion.div>

            {/* Clickable League Symbol Gateways */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5"
            >
              {/* NFL Symbol Gateway */}
              <Link
                href="/nfl"
                className="group relative overflow-hidden rounded-[3px] border border-[#272C35] hover:border-[#D61F26] bg-[#161A20] p-4 flex items-center justify-between gap-3 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Image
                  src="/images/nfl-banner.jpg"
                  alt="Estádio NFL"
                  fill
                  className="object-cover opacity-20 group-hover:opacity-35 group-hover:scale-105 transition-all duration-300"
                />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="p-1.5 rounded-[2px] bg-white/10 border border-white/15 shrink-0 group-hover:scale-105 transition-transform flex items-center justify-center">
                    <NflSymbol className="w-12 h-12" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-white">
                      NFL
                    </h2>
                    <p className="text-[11px] text-[#C8CFD9]">32 Times · AFC e NFC</p>
                    <p className="font-mono-tabular text-[10px] text-[#D61F26] font-bold uppercase mt-0.5">
                      {NFL_JERSEYS.length} camisas
                    </p>
                  </div>
                </div>
                <div className="relative z-10 w-9 h-9 rounded-[2px] bg-[#0D0F12]/80 border border-white/15 flex items-center justify-center text-white group-hover:bg-[#D61F26] group-hover:border-[#D61F26] transition-colors shrink-0">
                  <ArrowRight size={16} weight="bold" />
                </div>
              </Link>

              {/* NBA Symbol Gateway */}
              <Link
                href="/nba"
                className="group relative overflow-hidden rounded-[3px] border border-[#272C35] hover:border-[#D61F26] bg-[#161A20] p-4 flex items-center justify-between gap-3 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Image
                  src="/images/nba-banner.jpg"
                  alt="Quadra NBA"
                  fill
                  className="object-cover opacity-20 group-hover:opacity-35 group-hover:scale-105 transition-all duration-300"
                />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="p-1.5 rounded-[2px] bg-white/10 border border-white/15 shrink-0 group-hover:scale-105 transition-transform flex items-center justify-center">
                    <NbaSymbol className="w-9 h-12" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight text-white">
                      NBA
                    </h2>
                    <p className="text-[11px] text-[#C8CFD9]">30 Times · Leste e Oeste</p>
                    <p className="font-mono-tabular text-[10px] text-[#FDE047] font-bold uppercase mt-0.5">
                      Em construção
                    </p>
                  </div>
                </div>
                <div className="relative z-10 w-9 h-9 rounded-[2px] bg-[#0D0F12]/80 border border-white/15 flex items-center justify-center text-white group-hover:bg-[#D61F26] group-hover:border-[#D61F26] transition-colors shrink-0">
                  <ArrowRight size={16} weight="bold" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clickable Team Marquee Strip (pauses on hover so clicking is effortless) */}
      <div className="border-b border-[#272C35] bg-[#12151A] py-3 overflow-hidden">
        <div className="flex items-center gap-8 whitespace-nowrap animate-[marquee_34s_linear_infinite] hover:[animation-play-state:paused] w-max">
          {[...teamTicker, ...teamTicker].map((item, idx) => (
            <span key={`${item.teamId}-${idx}`} className="inline-flex items-center">
              <Link
                href={`/nfl?time=${item.teamId}`}
                className="font-display text-lg font-bold tracking-widest uppercase text-[#B8C0CE] hover:text-[#D61F26] transition-colors cursor-pointer"
              >
                {item.label}
              </Link>
              <span className="text-[#D61F26] ml-8 select-none">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* Featured Drops Showcase — BRIGHT WHITE STUDIO CARDS so jerseys look 100% normal & vibrant */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-[60ch]">
            <span className="font-mono-tabular text-xs font-bold uppercase tracking-[0.2em] text-[#D61F26]">
              Oferta Especial · 20% OFF
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold uppercase tracking-tight">
              Destaques da NFL
            </h2>
            <p className="text-sm md:text-base text-[#9AA3B2]">
              De {formatBRL(STANDARD_ORIGINAL_PRICE)} por {formatBRL(STANDARD_PRICE)} cada, ou{" "}
              <strong className="text-[#4ADE80]">{formatBRL(COMBO_UNIT_PRICE)}</strong> levando 2 ou mais camisas.
            </p>
          </div>
          <Link
            href="/nfl"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F4F5F7] hover:text-[#D61F26] transition-colors"
          >
            <span>Ver catálogo completo</span>
            <ArrowRight size={15} weight="bold" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredJerseys.map((jersey, idx) => {
            const discountPercent = getDiscountPercent(jersey.originalPrice, jersey.price);
            const isCommemorative = jersey.edition === "Throwback";
            const logoSrc = getTeamLogoSrc(jersey.teamId);

            return (
              <motion.div
                key={jersey.id}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={`/produto/${jersey.slug}`}
                  className="group block bg-[#FFFFFF] text-[#111317] border border-[#272C35] hover:border-[#D61F26] rounded-[3px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(214,31,38,0.35)]"
                >
                  {/* Clean White Studio Stage so jerseys appear bright & natural */}
                  <div className="p-5 bg-[#FFFFFF] border-b border-[#E1E4E8] flex items-center justify-center aspect-square relative">
                    <div
                      className="absolute top-0 left-0 right-0 h-1.5"
                      style={{ backgroundColor: jersey.primaryColor }}
                    />

                    {logoSrc && (
                      <div className="absolute top-3 left-3 z-10 w-8 h-8 rounded-[2px] bg-white border border-[#E1E4E8] p-1 flex items-center justify-center shadow-sm">
                        <Image
                          src={logoSrc}
                          alt={`Logo ${jersey.teamName}`}
                          width={24}
                          height={24}
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                    )}

                    {discountPercent > 0 ? (
                      <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-[2px] bg-[#D61F26] text-white font-mono-tabular text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                        <Tag size={12} weight="fill" />
                        <span>-{discountPercent}% OFF</span>
                      </span>
                    ) : (
                      <span className="absolute top-3 right-3 z-10 px-2 py-1 rounded-[2px] bg-[#111317] text-[#FDE047] font-mono-tabular text-[10px] font-bold uppercase tracking-wider">
                        Consultar Disp.
                      </span>
                    )}

                    <div className="w-48 h-48 group-hover:scale-105 transition-transform duration-300">
                      <JerseyGraphic jersey={jersey} />
                    </div>
                  </div>

                  <div className="p-4 space-y-2 bg-[#FFFFFF]">
                    <div className="flex items-center justify-between text-[11px] font-mono-tabular uppercase text-[#5A6270]">
                      <span>{jersey.league.toUpperCase()}</span>
                      <span>{jersey.divisionName}</span>
                    </div>
                    <h3 className="font-bold text-sm text-[#111317] group-hover:text-[#D61F26] transition-colors line-clamp-2 min-h-[2.5rem]">
                      {jersey.title}
                    </h3>
                    <div className="pt-1.5 border-t border-[#F0F2F4] space-y-1">
                      {jersey.originalPrice && (
                        <div className="flex items-center gap-2">
                          <span className="font-mono-tabular text-xs text-[#8A93A2] line-through">
                            De {formatBRL(jersey.originalPrice)}
                          </span>
                          <span className="font-mono-tabular text-[10px] font-extrabold text-[#D61F26]">
                            -{discountPercent}%
                          </span>
                        </div>
                      )}
                      <div className="flex items-baseline justify-between">
                        <span className="font-mono-tabular text-lg font-extrabold text-[#111317]">
                          {formatBRL(jersey.price)}
                        </span>
                        {isCommemorative ? (
                          <span className="text-[10px] font-bold uppercase text-[#92400E] bg-[#FEF3C7] px-1.5 py-0.5 rounded-[2px]">
                            Comemorativa
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-[#15803D] bg-[#ECFDF3] px-1.5 py-0.5 rounded-[2px]">
                            2+ por {formatBRL(COMBO_UNIT_PRICE)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Animated Combo Promo & Mascot Celebration Banner */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-8 pb-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[4px] border border-[#D61F26]/50 bg-[#000000] overflow-hidden grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] items-center"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background:
                "linear-gradient(115deg, rgba(214,31,38,0.45) 0%, rgba(13,15,18,0.2) 55%, rgba(29,66,138,0.35) 100%)",
            }}
          />

          <div className="relative z-10 p-7 md:p-10 space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-[#D61F26] text-white font-mono-tabular text-xs font-extrabold uppercase tracking-wider">
              <Fire size={15} weight="fill" />
              <span>Promoção Progressiva Snap Store</span>
            </span>

            <h2 className="font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-tight leading-none text-white">
              Leve 2 ou mais camisas e pague {formatBRL(COMBO_UNIT_PRICE)} cada!
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-[2px] bg-[#161A20]/90 border border-[#272C35]">
                <p className="font-mono-tabular text-[11px] uppercase text-[#9AA3B2]">1 Camisa</p>
                <p className="font-mono-tabular text-xs text-[#8A93A2] line-through">
                  {formatBRL(STANDARD_ORIGINAL_PRICE)}
                </p>
                <p className="font-mono-tabular text-2xl font-extrabold text-white">
                  {formatBRL(STANDARD_PRICE)}{" "}
                  <span className="text-xs text-[#D61F26]">-20%</span>
                </p>
              </div>
              <div className="p-3.5 rounded-[2px] bg-[#15803D]/20 border border-[#4ADE80]/50">
                <p className="font-mono-tabular text-[11px] uppercase text-[#4ADE80] font-bold">
                  A partir de 2 Camisas
                </p>
                <p className="font-mono-tabular text-xs text-[#9AA3B2]">Desconto automático</p>
                <p className="font-mono-tabular text-2xl font-extrabold text-[#4ADE80]">
                  {formatBRL(COMBO_UNIT_PRICE)} <span className="text-xs">/cada</span>
                </p>
              </div>
              <div className="p-3.5 rounded-[2px] bg-[#161A20]/90 border border-[#FDE047]/40">
                <p className="font-mono-tabular text-[11px] uppercase text-[#FDE047] font-bold">
                  Comemorativas
                </p>
                <p className="font-mono-tabular text-xs text-[#9AA3B2]">Sob consulta</p>
                <p className="font-mono-tabular text-2xl font-extrabold text-white">
                  {formatBRL(COMMEMORATIVE_PRICE)}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/nfl"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-[2px] bg-[#D61F26] hover:bg-[#B3171D] text-white text-xs font-bold uppercase tracking-wider transition-transform active:scale-[0.98]"
              >
                <span>Montar meu Combo</span>
                <ArrowRight size={15} weight="bold" />
              </Link>
              <a
                href={STORE_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-[2px] bg-white text-[#111317] hover:bg-[#F1F3F5] text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <InstagramLogo size={16} weight="bold" className="text-[#D61F26]" />
                <span>Consultar no {STORE_INSTAGRAM_HANDLE}</span>
              </a>
            </div>
          </div>

          <div className="relative z-10 flex items-end justify-center p-4 lg:p-6">
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-64 h-72 sm:w-72 sm:h-80"
            >
              <Image
                src="/images/mascot/nfl-celebrating.jpg"
                alt="Mascote Snap Store comemorando touchdown"
                fill
                className="object-contain"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Brand Identity & Store Pillars + Mascot Pointing */}
      <section className="border-t border-[#272C35] bg-[#12151A]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 items-center">
          <div className="bg-[#000000] border border-[#272C35] rounded-[4px] p-6 sm:p-7 flex flex-col sm:flex-row items-center gap-6 overflow-hidden">
            <div className="flex items-center gap-4 shrink-0">
              <Image
                src="/images/snap-store-logo.jpg"
                alt="Escudo Oficial Snap Store"
                width={144}
                height={144}
                className="w-32 h-32 sm:w-36 sm:h-36 object-cover rounded-[4px] border-2 border-[#D61F26]/70 shadow-lg shrink-0"
              />
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-24 h-36 shrink-0"
              >
                <Image
                  src="/images/mascot/nfl-pointing.jpg"
                  alt="Mascote Snap Store apontando"
                  fill
                  className="object-contain"
                />
              </motion.div>
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight">
                Snap Store Oficial
              </h2>
              <p className="text-sm text-[#9AA3B2] leading-relaxed">
                Catálogo 100% focado em futebol americano e basquete americano, organizado pela estrutura oficial das conferências.
              </p>
              <a
                href={STORE_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D61F26] hover:underline pt-1"
              >
                <InstagramLogo size={16} weight="bold" />
                <span>Siga {STORE_INSTAGRAM_HANDLE}</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-[#161A20] border border-[#272C35] hover:border-[#D61F26]/60 transition-colors rounded-[3px] space-y-2">
              <Shuffle size={22} weight="bold" className="text-[#D61F26]" />
              <h3 className="font-display text-xl font-bold uppercase">
                Descoberta Aleatória
              </h3>
              <p className="text-sm text-[#9AA3B2]">
                Cada acesso ao símbolo da NFL ou NBA embaralha as camisas automaticamente, com filtro instantâneo por conferência, divisão e time.
              </p>
            </div>

            <div className="p-5 bg-[#161A20] border border-[#272C35] hover:border-[#D61F26]/60 transition-colors rounded-[3px] space-y-2">
              <Sparkle size={22} weight="bold" className="text-[#D61F26]" />
              <h3 className="font-display text-xl font-bold uppercase">
                Personalização Completa
              </h3>
              <p className="text-sm text-[#9AA3B2]">
                Adicione seu nome e número favorito direto na página da camisa e garanta sua jersey exclusiva.
              </p>
            </div>

            <div className="p-5 bg-[#161A20] border border-[#272C35] hover:border-[#D61F26]/60 transition-colors rounded-[3px] space-y-2">
              <Truck size={22} weight="bold" className="text-[#D61F26]" />
              <h3 className="font-display text-xl font-bold uppercase">
                Envio Nacional
              </h3>
              <p className="text-sm text-[#9AA3B2]">
                Frete grátis automático em compras acima de R$ 499,00 e código de rastreamento em todas as entregas.
              </p>
            </div>

            <div className="p-5 bg-[#161A20] border border-[#272C35] hover:border-[#D61F26]/60 transition-colors rounded-[3px] space-y-2">
              <ShieldCheck size={22} weight="bold" className="text-[#D61F26]" />
              <h3 className="font-display text-xl font-bold uppercase">
                Atendimento Direto
              </h3>
              <p className="text-sm text-[#9AA3B2]">
                Dúvidas ou camisas comemorativas? Fale direto conosco no Instagram{" "}
                <a
                  href={STORE_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-semibold hover:text-[#D61F26] underline"
                >
                  {STORE_INSTAGRAM_HANDLE}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
