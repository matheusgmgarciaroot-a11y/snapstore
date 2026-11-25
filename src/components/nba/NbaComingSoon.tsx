"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Hammer, InstagramLogo } from "@phosphor-icons/react";
import { NbaSymbol } from "@/components/catalog/LeagueSymbols";
import { STORE_INSTAGRAM_HANDLE, STORE_INSTAGRAM_URL } from "@/lib/format";

export function NbaComingSoon() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex-1 bg-[#0D0F12] text-[#F4F5F7] arena-grain relative overflow-hidden">
      <Image
        src="/images/nba-banner.jpg"
        alt="Quadra NBA"
        fill
        priority
        className="object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0F12]/80 via-[#0D0F12]/90 to-[#0D0F12]" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8 py-14 md:py-20">
        <div className="rounded-[4px] border border-[#272C35] bg-[#000000]/85 backdrop-blur-sm overflow-hidden grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] items-center">
          {/* Left Content */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 md:p-12 space-y-6"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-[3px] bg-white/10 border border-white/15 shrink-0">
                <NbaSymbol className="w-10 h-14" />
              </div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] bg-[#D61F26] text-white font-mono-tabular text-xs font-extrabold uppercase tracking-wider">
                <Hammer size={15} weight="bold" />
                <span>Em Construção</span>
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="font-display text-5xl sm:text-6xl font-extrabold uppercase tracking-tight leading-[0.95] text-white">
                Catálogo NBA em breve.
              </h1>
              <p className="text-base text-[#C8CFD9] max-w-[46ch] leading-relaxed">
                Estamos preparando todas as 30 franquias da NBA (Conferência Leste e Oeste) com fotos reais dos modelos. Enquanto isso, nosso catálogo completo da{" "}
                <strong className="text-white">NFL (32 times)</strong> já está 100% disponível!
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/nfl"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[2px] bg-[#D61F26] hover:bg-[#B3171D] text-white text-sm font-bold uppercase tracking-wider transition-transform active:scale-[0.98]"
              >
                <span>Ver Catálogo NFL (32 Times)</span>
                <ArrowRight size={16} weight="bold" />
              </Link>
              <a
                href={STORE_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-[2px] bg-[#161A20] hover:bg-[#1F252E] text-white border border-[#2F3642] text-sm font-bold uppercase tracking-wider transition-colors"
              >
                <InstagramLogo size={18} weight="bold" className="text-[#D61F26]" />
                <span>Acompanhar no {STORE_INSTAGRAM_HANDLE}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Animated NBA Mascots */}
          <div className="relative bg-[#000000] border-t lg:border-t-0 lg:border-l border-[#272C35] p-6 flex items-end justify-center gap-2 min-h-[320px]">
            <div
              className="pointer-events-none absolute inset-0 opacity-35"
              style={{
                background:
                  "radial-gradient(circle at 50% 70%, rgba(29,66,138,0.55), transparent 65%)",
              }}
            />
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-44 h-64 sm:w-48 sm:h-72 shrink-0"
            >
              <Image
                src="/images/mascot/nba-flag.jpg"
                alt="Mascote Snap Store NBA com bandeira"
                fill
                priority
                className="object-contain object-bottom"
              />
            </motion.div>
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 4.0, delay: 0.35, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-40 h-56 sm:w-44 sm:h-64 shrink-0"
            >
              <Image
                src="/images/mascot/nba-dribbling.jpg"
                alt="Mascote Snap Store NBA driblando"
                fill
                priority
                className="object-contain object-bottom"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
