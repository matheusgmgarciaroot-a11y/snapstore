"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { InstagramLogo } from "@phosphor-icons/react";
import { NFL_JERSEYS } from "@/data/jerseys";
import { STORE_INSTAGRAM_HANDLE, STORE_INSTAGRAM_URL } from "@/lib/format";

export function Footer() {
  const pathname = usePathname();
  const isArenaHome = pathname === "/";

  return (
    <footer
      className={
        isArenaHome
          ? "bg-[#090B0E] border-t border-[#272C35] text-[#9AA3B2]"
          : "bg-[#FFFFFF] border-t border-[#E1E4E8] text-[#5A6270]"
      }
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-[4px] overflow-hidden bg-[#000000] border-2 border-[#D61F26]/70 shrink-0 shadow-lg">
              <Image
                src="/images/snap-store-logo.jpg"
                alt="Snap Store Logo"
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p
                className={`font-display text-3xl font-extrabold tracking-tight uppercase ${
                  isArenaHome ? "text-[#F4F5F7]" : "text-[#111317]"
                }`}
              >
                SNAP STORE
              </p>
              <p className="text-xs font-mono-tabular uppercase tracking-wider">
                Especializada em NFL e NBA
              </p>
              <a
                href={STORE_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-1.5 text-xs font-bold text-[#D61F26] hover:underline"
              >
                <InstagramLogo size={15} weight="bold" />
                <span>{STORE_INSTAGRAM_HANDLE}</span>
              </a>
            </div>
          </div>
          <p className="text-sm max-w-[44ch] leading-relaxed">
            Curadoria dedicada exclusivamente às 32 franquias da National Football
            League e às 30 franquias da National Basketball Association, com modelos
            Game Day, Vapor Limited, Swingman e Comemorativas.
          </p>
        </div>

        <div className="space-y-3">
          <p
            className={`text-xs font-mono-tabular uppercase tracking-wider font-bold ${
              isArenaHome ? "text-[#F4F5F7]" : "text-[#111317]"
            }`}
          >
            Ligas e Catálogos
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-[#D61F26] transition-colors">
                Página Principal
              </Link>
            </li>
            <li>
              <Link href="/nfl" className="hover:text-[#D61F26] transition-colors">
                Camisas NFL (AFC e NFC)
              </Link>
            </li>
            <li>
              <Link href="/nba" className="hover:text-[#D61F26] transition-colors">
                NBA (Em construção)
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="hover:text-[#D61F26] transition-colors">
                Finalizar Pedido
              </Link>
            </li>
            <li>
              <a
                href={STORE_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold hover:text-[#D61F26] transition-colors"
              >
                <InstagramLogo size={15} weight="bold" />
                <span>Instagram {STORE_INSTAGRAM_HANDLE}</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <p
            className={`text-xs font-mono-tabular uppercase tracking-wider font-bold ${
              isArenaHome ? "text-[#F4F5F7]" : "text-[#111317]"
            }`}
          >
            Condições Especiais
          </p>
          <ul className="space-y-2 text-sm">
            <li>Camisas de R$ 350,00 por R$ 280,00 (20% OFF)</li>
            <li>Combo: a partir de 2 camisas, R$ 250,00 cada</li>
            <li>Comemorativas: R$ 400,00 (consultar disponibilidade)</li>
            <li>Frete grátis acima de R$ 499,00 · Até 6x sem juros</li>
          </ul>
        </div>
      </div>

      <div
        className={`border-t py-5 px-4 md:px-8 text-xs ${
          isArenaHome
            ? "border-[#272C35] text-[#6B7485]"
            : "border-[#E1E4E8] text-[#5A6270]"
        }`}
      >
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span>Snap Store Brasil ({STORE_INSTAGRAM_HANDLE}). Todos os direitos reservados.</span>
          <span className="font-mono-tabular">
            Catálogo NFL: {NFL_JERSEYS.length} camisas reais · NBA em construção
          </span>
        </div>
      </div>
    </footer>
  );
}
