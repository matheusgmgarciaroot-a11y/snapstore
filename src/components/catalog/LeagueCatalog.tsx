"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  CaretDown,
  CaretUp,
  MagnifyingGlass,
  Shuffle,
  SlidersHorizontal,
} from "@phosphor-icons/react";
import { LeagueStructure } from "@/data/leagues";
import { JerseyEdition, JerseyProduct } from "@/data/jerseys";
import { shuffleArray } from "@/lib/shuffle";
import {
  CatalogSelection,
  ConferenceFilterMatrix,
} from "./ConferenceFilterMatrix";
import { JerseyCard } from "./JerseyCard";
import { NbaSymbol, NflSymbol } from "./LeagueSymbols";

interface LeagueCatalogProps {
  structure: LeagueStructure;
  jerseys: JerseyProduct[];
  bannerImage: string;
}

export function LeagueCatalog({
  structure,
  jerseys,
  bannerImage,
}: LeagueCatalogProps) {
  // Always shuffle on client mount so clicking the NFL or NBA symbol loads jerseys in random order
  const [orderedJerseys, setOrderedJerseys] = useState<JerseyProduct[]>(jerseys);
  const [hasShuffled, setHasShuffled] = useState(false);

  const [selection, setSelection] = useState<CatalogSelection>({
    conferenceId: null,
    divisionId: null,
    teamId: null,
  });
  const [editionFilter, setEditionFilter] = useState<"ALL" | JerseyEdition>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMatrix, setShowMatrix] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setOrderedJerseys(shuffleArray(jerseys));
      setHasShuffled(true);

      const params = new URLSearchParams(window.location.search);
      const teamParam = params.get("time");
      if (teamParam) {
        for (const conf of structure.conferences) {
          for (const div of conf.divisions) {
            const found = div.teams.find((t) => t.id === teamParam);
            if (found) {
              setSelection({
                conferenceId: conf.id,
                divisionId: div.id,
                teamId: found.id,
              });
              return;
            }
          }
        }
      }
    });
    return () => window.cancelAnimationFrame(frameId);
  }, [jerseys, structure]);

  const handleManualShuffle = () => {
    setOrderedJerseys((prev) => shuffleArray(prev));
    setHasShuffled(true);
  };

  const filteredJerseys = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return orderedJerseys.filter((jersey) => {
      if (selection.conferenceId && jersey.conferenceId !== selection.conferenceId) {
        return false;
      }
      if (selection.divisionId && jersey.divisionId !== selection.divisionId) {
        return false;
      }
      if (selection.teamId && jersey.teamId !== selection.teamId) {
        return false;
      }
      if (editionFilter !== "ALL" && jersey.edition !== editionFilter) {
        return false;
      }
      if (query) {
        const hay = `${jersey.teamName} ${jersey.playerName} ${jersey.divisionName} ${jersey.conferenceName} ${jersey.abbr}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });
  }, [orderedJerseys, selection, editionFilter, searchQuery]);

  const activeFilterSummary = useMemo(() => {
    if (selection.teamId) {
      const match = jerseys.find((j) => j.teamId === selection.teamId);
      return match ? match.teamName : "Time selecionado";
    }
    if (selection.divisionId) {
      const match = jerseys.find((j) => j.divisionId === selection.divisionId);
      return match ? match.divisionName : "Divisão selecionada";
    }
    if (selection.conferenceId) {
      const match = jerseys.find((j) => j.conferenceId === selection.conferenceId);
      return match ? match.conferenceName : "Conferência selecionada";
    }
    return `Todos os times da ${structure.name}`;
  }, [jerseys, selection, structure.name]);

  const isNfl = structure.id === "nfl";

  return (
    <div className="flex-1 bg-[#F6F7F8] text-[#111317]">
      {/* Framed League Banner */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-8 pt-6">
        <div className="relative rounded-[2px] overflow-hidden border border-[#E1E4E8] bg-[#111317] text-white">
          <Image
            src={bannerImage}
            alt={`Banner oficial ${structure.name}`}
            fill
            priority
            className="object-cover opacity-40"
          />
          <div className="relative z-10 p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-gradient-to-r from-[#000000]/95 via-[#0D0F12]/80 to-[#000000]/75">
            <div className="flex items-center gap-5">
              <div className="shrink-0 p-1.5 bg-white/10 border border-white/15 rounded-[2px] flex items-center justify-center">
                {isNfl ? (
                  <NflSymbol className="w-14 h-14 md:w-16 md:h-16" />
                ) : (
                  <NbaSymbol className="w-10 h-14 md:w-12 md:h-16" />
                )}
              </div>
              <div className="space-y-1">
                <span className="font-mono-tabular text-[11px] uppercase tracking-[0.18em] text-[#D61F26] font-bold">
                  De R$ 350 por R$ 280 (-20% OFF) · 2+ por R$ 250 cada
                </span>
                <h1 className="font-display text-4xl md:text-5xl font-extrabold uppercase tracking-tight leading-none">
                  Camisas {structure.name}
                </h1>
                <p className="text-sm text-[#D4D9E2] max-w-[52ch]">
                  {isNfl
                    ? "32 franquias divididas em AFC e NFC. Ordem aleatória carregada ao entrar."
                    : "30 franquias divididas em Conferência Leste e Conferência Oeste. Ordem aleatória carregada ao entrar."}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleManualShuffle}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[2px] bg-[#D61F26] hover:bg-[#B3171D] text-white text-xs font-bold uppercase tracking-wider transition-transform active:scale-[0.98] cursor-pointer whitespace-nowrap"
                >
                  <Shuffle size={16} weight="bold" />
                  <span>Embaralhar Camisas</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowMatrix((prev) => !prev)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[2px] bg-white text-[#111317] hover:bg-[#F1F3F5] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
                >
                  <SlidersHorizontal size={16} weight="bold" />
                  <span>{showMatrix ? "Ocultar Times" : "Filtrar por Time"}</span>
                  {showMatrix ? <CaretUp size={14} weight="bold" /> : <CaretDown size={14} weight="bold" />}
                </button>
              </div>

              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                className="hidden xl:block relative w-24 h-28 shrink-0 rounded-[3px] bg-[#000000] border border-white/10 overflow-hidden"
              >
                <Image
                  src={isNfl ? "/images/mascot/nfl-throwing.jpg" : "/images/mascot/nba-flag.jpg"}
                  alt={`Mascote Snap Store ${structure.name}`}
                  fill
                  className="object-contain"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Conference / Division / Team Filter Matrix */}
      {showMatrix && (
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-6">
          <ConferenceFilterMatrix
            structure={structure}
            selection={selection}
            onSelect={setSelection}
          />
        </div>
      )}

      {/* Search, Edition Bar & Results Count */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 space-y-6">
        <div className="bg-[#FFFFFF] border border-[#E1E4E8] rounded-[2px] p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono-tabular uppercase tracking-wider text-[#5A6270]">
              Exibindo:
            </span>
            <span className="text-sm font-bold text-[#111317]">
              {activeFilterSummary}
            </span>
            <span className="font-mono-tabular text-xs px-2 py-0.5 rounded-[2px] bg-[#F6F7F8] border border-[#E1E4E8] text-[#111317] font-semibold">
              {filteredJerseys.length} {filteredJerseys.length === 1 ? "camisa" : "camisas"}
            </span>
            {hasShuffled && !selection.teamId && (
              <span className="font-mono-tabular text-[11px] text-[#5A6270]">
                (Ordem aleatória ativa)
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Edition Tabs */}
            <div className="inline-flex rounded-[2px] border border-[#E1E4E8] bg-[#F6F7F8] p-0.5">
              {(["ALL", "Home", "Throwback"] as const).map((ed) => {
                const active = editionFilter === ed;
                const label =
                  ed === "ALL" ? "Todas" : ed === "Home" ? "Oficiais (R$ 280)" : "Comemorativas (R$ 400)";
                return (
                  <button
                    key={ed}
                    type="button"
                    onClick={() => setEditionFilter(ed)}
                    className={`px-3 py-1.5 rounded-[2px] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? "bg-[#111317] text-white"
                        : "text-[#5A6270] hover:text-[#111317]"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[230px]">
              <MagnifyingGlass
                size={16}
                weight="bold"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A6270]"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar time ou jogador..."
                aria-label="Buscar time ou jogador"
                className="w-full pl-9 pr-3 py-2 rounded-[2px] border border-[#E1E4E8] bg-[#FFFFFF] text-sm text-[#111317] placeholder:text-[#5A6270] focus:outline-none focus:border-[#111317]"
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredJerseys.length === 0 ? (
          <div className="bg-[#FFFFFF] border border-[#E1E4E8] rounded-[2px] p-12 text-center space-y-3">
            <p className="font-display text-2xl font-bold uppercase text-[#111317]">
              Nenhuma camisa encontrada para esse filtro
            </p>
            <p className="text-sm text-[#5A6270]">
              Tente limpar a busca ou selecionar outra divisão na lista acima.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelection({ conferenceId: null, divisionId: null, teamId: null });
                setEditionFilter("ALL");
                setSearchQuery("");
              }}
              className="mt-2 px-5 py-2.5 rounded-[2px] bg-[#D61F26] hover:bg-[#B3171D] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Ver Todas as Camisas
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredJerseys.map((jersey) => (
              <JerseyCard key={jersey.id} jersey={jersey} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
