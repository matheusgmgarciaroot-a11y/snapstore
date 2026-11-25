"use client";

import React from "react";
import Image from "next/image";
import { Check, X } from "@phosphor-icons/react";
import { LeagueStructure } from "@/data/leagues";
import { getTeamLogoSrc } from "@/lib/teamLogo";

export interface CatalogSelection {
  conferenceId: string | null;
  divisionId: string | null;
  teamId: string | null;
}

interface ConferenceFilterMatrixProps {
  structure: LeagueStructure;
  selection: CatalogSelection;
  onSelect: (next: CatalogSelection) => void;
}

export function ConferenceFilterMatrix({
  structure,
  selection,
  onSelect,
}: ConferenceFilterMatrixProps) {
  const isNfl = structure.id === "nfl";

  return (
    <section
      aria-label={`Filtro por conferência, divisão e time da ${structure.name}`}
      className="bg-[#FFFFFF] border border-[#E1E4E8] rounded-[2px] overflow-hidden"
    >
      <div className="px-4 md:px-6 py-3.5 bg-[#F6F7F8] border-b border-[#E1E4E8] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span
            className="w-2.5 h-6 rounded-[2px]"
            style={{ backgroundColor: isNfl ? "#013369" : "#1D428A" }}
          />
          <div>
            <h2 className="font-display text-xl md:text-2xl font-extrabold uppercase tracking-tight text-[#111317] leading-none">
              {structure.name} - {structure.fullName}
            </h2>
            <p className="text-xs text-[#5A6270] mt-0.5">
              Clique em uma conferência, divisão ou time para filtrar as camisas.
            </p>
          </div>
        </div>

        {(selection.conferenceId || selection.divisionId || selection.teamId) && (
          <button
            type="button"
            onClick={() =>
              onSelect({ conferenceId: null, divisionId: null, teamId: null })
            }
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-[#111317] hover:bg-[#D61F26] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap"
          >
            <X size={13} weight="bold" />
            <span>Limpar Filtro</span>
          </button>
        )}
      </div>

      {/* Exact 2-column Conference → Division → Team layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#E1E4E8]">
        {structure.conferences.map((conf) => {
          const confActive =
            selection.conferenceId === conf.id &&
            !selection.divisionId &&
            !selection.teamId;

          return (
            <div key={conf.id} className="p-4 md:p-5 space-y-4">
              {/* Conference Header Button */}
              <div className="flex items-center justify-between border-b border-[#E1E4E8] pb-2.5">
                <button
                  type="button"
                  onClick={() =>
                    onSelect(
                      confActive
                        ? { conferenceId: null, divisionId: null, teamId: null }
                        : { conferenceId: conf.id, divisionId: null, teamId: null }
                    )
                  }
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] font-display text-xl font-extrabold uppercase tracking-wide transition-colors cursor-pointer ${
                    confActive
                      ? "bg-[#D61F26] text-white"
                      : "bg-[#F6F7F8] hover:bg-[#111317] hover:text-white text-[#111317]"
                  }`}
                >
                  <span>{conf.name}</span>
                  {confActive && <Check size={16} weight="bold" />}
                </button>
                <span className="font-mono-tabular text-[11px] uppercase tracking-wider text-[#5A6270]">
                  {conf.divisions.reduce((acc, d) => acc + d.teams.length, 0)} times
                </span>
              </div>

              {/* Divisions Grid inside Conference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {conf.divisions.map((div) => {
                  const divActive =
                    selection.divisionId === div.id && !selection.teamId;

                  return (
                    <div
                      key={div.id}
                      className="bg-[#F6F7F8] border border-[#E1E4E8] rounded-[2px] p-3 space-y-2"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          onSelect(
                            divActive
                              ? { conferenceId: null, divisionId: null, teamId: null }
                              : {
                                  conferenceId: conf.id,
                                  divisionId: div.id,
                                  teamId: null,
                                }
                          )
                        }
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-[2px] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                          divActive
                            ? "bg-[#D61F26] text-white"
                            : "bg-[#FFFFFF] text-[#111317] border border-[#E1E4E8] hover:border-[#111317]"
                        }`}
                      >
                        <span>{div.name}</span>
                        {divActive && <Check size={13} weight="bold" />}
                      </button>

                      <ul className="space-y-1">
                        {div.teams.map((team) => {
                          const teamActive = selection.teamId === team.id;
                          const logoSrc = getTeamLogoSrc(team.id);

                          return (
                            <li key={team.id}>
                              <button
                                type="button"
                                onClick={() =>
                                  onSelect(
                                    teamActive
                                      ? {
                                          conferenceId: null,
                                          divisionId: null,
                                          teamId: null,
                                        }
                                      : {
                                          conferenceId: conf.id,
                                          divisionId: div.id,
                                          teamId: team.id,
                                        }
                                  )
                                }
                                className={`w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded-[2px] text-left text-[13px] font-medium transition-colors cursor-pointer ${
                                  teamActive
                                    ? "bg-[#111317] text-white font-semibold"
                                    : "text-[#2A303B] hover:bg-[#FFFFFF] hover:text-[#111317]"
                                }`}
                              >
                                <span className="flex items-center gap-2 min-w-0 truncate">
                                  {/* Team logo if available, else color dot */}
                                  {logoSrc ? (
                                    <span className="w-6 h-6 shrink-0 flex items-center justify-center">
                                      <Image
                                        src={logoSrc}
                                        alt={`Logo ${team.name}`}
                                        width={24}
                                        height={24}
                                        className="w-6 h-6 object-contain"
                                      />
                                    </span>
                                  ) : (
                                    <span
                                      className="w-2.5 h-2.5 rounded-full shrink-0 border border-black/15"
                                      style={{ backgroundColor: team.primaryColor }}
                                    />
                                  )}
                                  <span className="truncate">{team.name}</span>
                                </span>
                                <span
                                  className={`font-mono-tabular text-[10px] shrink-0 ${
                                    teamActive ? "text-[#D4D9E2]" : "text-[#5A6270]"
                                  }`}
                                >
                                  {team.abbr}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
