"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { InstagramLogo, List, ShoppingBag, SignOut, Tag, UserCircle, X } from "@phosphor-icons/react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { STORE_INSTAGRAM_HANDLE, STORE_INSTAGRAM_URL } from "@/lib/format";

export function Header() {
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();
  const { user, openAuthModal, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isArenaHome = pathname === "/";

  const headerClasses = isArenaHome
    ? "bg-[#0D0F12]/95 border-b border-[#272C35] text-[#F4F5F7]"
    : "bg-[#FFFFFF]/95 border-b border-[#E1E4E8] text-[#111317]";

  const linkBase =
    "text-sm font-semibold tracking-wide uppercase transition-all whitespace-nowrap px-3.5 py-2 rounded-[2px]";

  const getLinkClasses = (href: string) => {
    const active = pathname === href;
    if (isArenaHome) {
      return active
        ? `${linkBase} bg-[#D61F26] text-white shadow-sm`
        : `${linkBase} text-[#D4D9E2] hover:text-white hover:bg-[#161A20]`;
    }
    return active
      ? `${linkBase} bg-[#D61F26] text-white shadow-sm`
      : `${linkBase} text-[#3B4250] hover:text-[#111317] hover:bg-[#F1F3F5]`;
  };

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md ${headerClasses}`}>
      {/* Top Promo Strip */}
      <div className="bg-[#D61F26] text-white text-[11px] font-mono-tabular font-bold uppercase tracking-wider py-1.5 px-4">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-x-6 gap-y-1 text-center">
          <span className="inline-flex items-center gap-1.5">
            <Tag size={13} weight="fill" />
            <span>Camisas de R$ 350 por R$ 280 (-20% OFF)</span>
          </span>
          <span className="hidden md:inline">
            Combo: 2+ camisas por R$ 250 cada · Comemorativas R$ 400 (sob consulta)
          </span>
          <a
            href={STORE_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:underline"
          >
            <InstagramLogo size={14} weight="bold" />
            <span>{STORE_INSTAGRAM_HANDLE}</span>
          </a>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-[1400px] mx-auto h-[68px] sm:h-[82px] px-3 sm:px-4 md:px-8 flex items-center justify-between gap-2 sm:gap-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3.5 shrink-0 group focus:outline-none"
          aria-label="Snap Store - Página Inicial"
        >
          <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-[4px] overflow-hidden bg-[#000000] border-2 border-[#D61F26]/70 group-hover:border-[#D61F26] shadow-[0_0_20px_-4px_rgba(214,31,38,0.45)] shrink-0 transition-all duration-300">
            <Image
              src="/images/snap-store-logo.jpg"
              alt="Logo Snap Store"
              width={64}
              height={64}
              priority
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight uppercase">
              SNAP STORE
            </span>
            <span
              className={`font-mono-tabular text-[9px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.16em] uppercase mt-0.5 ${
                isArenaHome ? "text-[#9AA3B2]" : "text-[#5A6270]"
              }`}
            >
              NFL &amp; NBA JERSEYS
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-2" aria-label="Navegação Principal">
          <Link href="/" className={getLinkClasses("/")}>
            Início
          </Link>
          <Link href="/nfl" className={getLinkClasses("/nfl")}>
            NFL
          </Link>
          <Link href="/nba" className={getLinkClasses("/nba")}>
            NBA
          </Link>
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={STORE_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden xl:inline-flex items-center gap-1.5 px-3 py-2 rounded-[2px] text-xs font-bold tracking-wide transition-colors ${
              isArenaHome
                ? "bg-[#161A20] hover:bg-[#D61F26] text-[#F4F5F7] border border-[#272C35] hover:border-[#D61F26]"
                : "bg-[#F6F7F8] hover:bg-[#111317] text-[#111317] hover:text-white border border-[#E1E4E8]"
            }`}
            aria-label={`Instagram ${STORE_INSTAGRAM_HANDLE}`}
          >
            <InstagramLogo size={16} weight="bold" />
            <span>{STORE_INSTAGRAM_HANDLE}</span>
          </a>

          {user ? (
            <div className="flex items-center gap-1">
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1 px-2.5 py-2 rounded-[2px] bg-[#D61F26] hover:bg-[#B3171D] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Admin
                </Link>
              )}
              <span
                className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-[2px] text-xs font-bold border ${
                  isArenaHome
                    ? "bg-[#161A20] text-[#F4F5F7] border-[#272C35]"
                    : "bg-[#F6F7F8] text-[#111317] border-[#E1E4E8]"
                }`}
              >
                <UserCircle size={18} weight="fill" className="text-[#D61F26]" />
                <span>Olá, {user.name.split(" ")[0]}</span>
              </span>
              <button
                type="button"
                onClick={logout}
                title="Sair da conta"
                aria-label="Sair da conta"
                className={`p-2 rounded-[2px] border cursor-pointer transition-colors ${
                  isArenaHome
                    ? "bg-[#161A20] hover:bg-[#D61F26] text-[#9AA3B2] hover:text-white border-[#272C35]"
                    : "bg-[#F6F7F8] hover:bg-[#111317] text-[#5A6270] hover:text-white border-[#E1E4E8]"
                }`}
              >
                <SignOut size={16} weight="bold" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => openAuthModal("login")}
              className={`inline-flex items-center gap-1.5 px-3 py-2.5 rounded-[2px] text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer whitespace-nowrap ${
                isArenaHome
                  ? "bg-[#161A20] hover:bg-[#D61F26] text-[#F4F5F7] border-[#272C35] hover:border-[#D61F26]"
                  : "bg-[#F6F7F8] hover:bg-[#111317] text-[#111317] hover:text-white border-[#E1E4E8]"
              }`}
              aria-label="Entrar ou criar cadastro"
            >
              <UserCircle size={19} weight="bold" />
              <span className="hidden sm:inline">Entrar</span>
            </button>
          )}

          <button
            type="button"
            onClick={openCart}
            className={`relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-[2px] font-semibold text-sm transition-transform active:scale-[0.98] whitespace-nowrap cursor-pointer ${
              isArenaHome
                ? "bg-[#161A20] hover:bg-[#1F242D] text-[#F4F5F7] border border-[#272C35]"
                : "bg-[#111317] hover:bg-[#232730] text-white border border-[#111317]"
            }`}
            aria-label={`Abrir carrinho com ${totalItems} itens`}
          >
            <ShoppingBag size={18} weight="bold" />
            <span className="hidden sm:inline">Sacola</span>
            <span className="font-mono-tabular inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-[2px] bg-[#D61F26] text-white text-xs font-bold">
              {totalItems}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className={`md:hidden p-2 rounded-[2px] border cursor-pointer ${
              isArenaHome
                ? "border-[#272C35] text-[#F4F5F7] hover:bg-[#161A20]"
                : "border-[#E1E4E8] text-[#111317] hover:bg-[#F1F3F5]"
            }`}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className={`md:hidden border-b px-4 py-4 flex flex-col gap-2 ${
            isArenaHome
              ? "bg-[#0D0F12] border-[#272C35] text-[#F4F5F7]"
              : "bg-[#FFFFFF] border-[#E1E4E8] text-[#111317]"
          }`}
        >
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className={getLinkClasses("/")}
          >
            Início
          </Link>
          <Link
            href="/nfl"
            onClick={() => setMobileOpen(false)}
            className={getLinkClasses("/nfl")}
          >
            NFL
          </Link>
          <Link
            href="/nba"
            onClick={() => setMobileOpen(false)}
            className={getLinkClasses("/nba")}
          >
            NBA
          </Link>
          <a
            href={STORE_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-[#D61F26]"
          >
            <InstagramLogo size={18} weight="bold" />
            <span>Instagram {STORE_INSTAGRAM_HANDLE}</span>
          </a>
        </div>
      )}
    </header>
  );
}
