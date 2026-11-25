"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ALL_NFL_TEAMS } from "@/data/leagues";
import { getTeamLogoSrc } from "@/lib/teamLogo";

interface TeamLogoBarProps {
  /** When provided, clicking a team filters in-place instead of navigating. */
  selectedTeamId?: string | null;
  onSelectTeam?: (teamId: string | null) => void;
  variant?: "dark" | "light";
}

/**
 * Continuous scrolling marquee of all 32 clickable NFL team logos.
 * Pauses on hover so clicking any team logo is effortless.
 */
export function TeamLogoBar({
  selectedTeamId = null,
  onSelectTeam,
  variant = "light",
}: TeamLogoBarProps) {
  const isDark = variant === "dark";
  const loopTeams = [...ALL_NFL_TEAMS, ...ALL_NFL_TEAMS];

  return (
    <div
      className={
        isDark
          ? "bg-[#111419] border-b border-[#272C35] overflow-hidden"
          : "bg-[#FFFFFF] border-b border-[#E1E4E8] overflow-hidden"
      }
      aria-label="Barra em movimento com os 32 escudos da NFL"
    >
      <div className="max-w-[1400px] mx-auto px-3 md:px-8 py-2.5 flex items-center gap-3">
        {onSelectTeam && selectedTeamId && (
          <button
            type="button"
            onClick={() => onSelectTeam(null)}
            className="shrink-0 px-3 h-10 rounded-[3px] font-mono-tabular text-[11px] font-bold uppercase tracking-wider bg-[#D61F26] hover:bg-[#B3171D] text-white transition-colors cursor-pointer"
          >
            Todos
          </button>
        )}

        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-3 w-max animate-[marquee_42s_linear_infinite] hover:[animation-play-state:paused]">
            {loopTeams.map((team, idx) => {
              const logoSrc = getTeamLogoSrc(team.id);
              const active = selectedTeamId === team.id;

              const tileClasses = `group shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-[3px] border flex items-center justify-center p-1.5 transition-all duration-150 cursor-pointer ${
                active
                  ? "bg-white border-[#D61F26] ring-2 ring-[#D61F26]/40 scale-105"
                  : isDark
                  ? "bg-white/95 border-transparent hover:border-[#D61F26] hover:scale-110"
                  : "bg-[#F6F7F8] border-[#E1E4E8] hover:bg-white hover:border-[#111317] hover:scale-110"
              }`;

              const inner = logoSrc ? (
                <Image
                  src={logoSrc}
                  alt={team.name}
                  width={34}
                  height={34}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="font-mono-tabular text-[10px] font-bold text-[#111317]">
                  {team.abbr}
                </span>
              );

              if (onSelectTeam) {
                return (
                  <button
                    key={`${team.id}-${idx}`}
                    type="button"
                    title={team.name}
                    aria-label={`Filtrar ${team.name}`}
                    onClick={() => onSelectTeam(active ? null : team.id)}
                    className={tileClasses}
                  >
                    {inner}
                  </button>
                );
              }

              return (
                <Link
                  key={`${team.id}-${idx}`}
                  href={`/nfl?time=${team.id}`}
                  title={team.name}
                  aria-label={`Ver camisas ${team.name}`}
                  className={tileClasses}
                >
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
