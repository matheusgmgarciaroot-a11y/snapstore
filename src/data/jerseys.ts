import { ALL_NBA_TEAMS, ALL_NFL_TEAMS, LeagueId, TeamInfo } from "./leagues";
import { PHOTO_JERSEYS, PhotoJerseySpec } from "./photoJerseys";
import {
  COMMEMORATIVE_PRICE,
  STANDARD_ORIGINAL_PRICE,
  STANDARD_PRICE,
} from "@/lib/format";

export type JerseyEdition = "Home" | "Throwback";
export type JerseySize = "P" | "M" | "G" | "GG" | "EGG";

export const JERSEY_SIZES: JerseySize[] = ["P", "M", "G", "GG", "EGG"];

export interface JerseyProduct {
  id: string;
  slug: string;
  league: LeagueId;
  teamId: string;
  teamName: string;
  city: string;
  nickname: string;
  abbr: string;
  conferenceId: string;
  conferenceName: string;
  divisionId: string;
  divisionName: string;
  edition: JerseyEdition;
  editionLabel: string;
  title: string;
  playerName: string;
  playerNumber: string;
  price: number;
  originalPrice?: number;
  sku: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fabricNote: string;
  description: string;
  featured?: boolean;
  /** Real product photo; when present it replaces the generated illustration. */
  image?: string;
  /** Unique/vintage piece: availability must be confirmed with the store. */
  onRequest?: boolean;
}

function buildTeamJerseys(team: TeamInfo, index: number): JerseyProduct[] {
  const isNfl = team.league === "nfl";

  const homeEditionLabel = isNfl ? "Game Day Home" : "Icon Swingman";
  const throwbackEditionLabel = isNfl ? "Comemorativa Throwback" : "Comemorativa Classics";

  const homeSlug = `${team.league}-${team.id}-home`;
  const throwbackSlug = `${team.league}-${team.id}-throwback`;

  const homeJersey: JerseyProduct = {
    id: `${team.league}-${team.id}-home`,
    slug: homeSlug,
    league: team.league,
    teamId: team.id,
    teamName: team.name,
    city: team.city,
    nickname: team.nickname,
    abbr: team.abbr,
    conferenceId: team.conferenceId,
    conferenceName: team.conferenceName,
    divisionId: team.divisionId,
    divisionName: team.divisionName,
    edition: "Home",
    editionLabel: homeEditionLabel,
    title: `Camisa ${team.name} ${homeEditionLabel} #${team.homeNumber} ${team.homePlayer}`,
    playerName: team.homePlayer,
    playerNumber: team.homeNumber,
    price: STANDARD_PRICE,
    originalPrice: STANDARD_ORIGINAL_PRICE,
    sku: `SNP-${team.league.toUpperCase()}-${team.abbr}-HM`,
    primaryColor: team.primaryColor,
    secondaryColor: team.secondaryColor,
    accentColor: team.accentColor,
    fabricNote: isNfl
      ? "Malha Dry-Fit Vapor com números bordados em alta densidade"
      : "Malha Mesh respirável Swingman com acabamento termosselado",
    description: isNfl
      ? `Jersey oficial estilo Game Day do ${team.name} (${team.divisionName} - ${team.conferenceName}). Construção atlética com gola reforçada, numeração frontal e traseira inspirada nos campos da NFL e opção de personalização com seu nome e número.`
      : `Regata Swingman do ${team.name} (${team.divisionName} - ${team.conferenceName}). Tecido leve de alta ventilação com corte de quadra, acabamento nos ombros e opção de personalização com nome e número.`,
    featured: index % 7 === 0,
  };

  const throwbackJersey: JerseyProduct = {
    id: `${team.league}-${team.id}-throwback`,
    slug: throwbackSlug,
    league: team.league,
    teamId: team.id,
    teamName: team.name,
    city: team.city,
    nickname: team.nickname,
    abbr: team.abbr,
    conferenceId: team.conferenceId,
    conferenceName: team.conferenceName,
    divisionId: team.divisionId,
    divisionName: team.divisionName,
    edition: "Throwback",
    editionLabel: throwbackEditionLabel,
    title: `Camisa ${team.name} ${throwbackEditionLabel} #${team.throwbackNumber} ${team.throwbackPlayer}`,
    playerName: team.throwbackPlayer,
    playerNumber: team.throwbackNumber,
    price: COMMEMORATIVE_PRICE,
    originalPrice: undefined,
    onRequest: true,
    sku: `SNP-${team.league.toUpperCase()}-${team.abbr}-TB`,
    primaryColor: team.throwbackColor,
    secondaryColor: team.throwbackAccent,
    accentColor: team.primaryColor === team.throwbackColor ? team.accentColor : team.secondaryColor,
    fabricNote: isNfl
      ? "Edição comemorativa colecionador com patch histórico — consulte disponibilidade"
      : "Edição comemorativa de época com etiqueta Hardwood — consulte disponibilidade",
    description: isNfl
      ? `Edição especial comemorativa ${throwbackEditionLabel} do ${team.name} em homenagem à era clássica da franquia. Consulte disponibilidade pelo Instagram @snap_storebr.`
      : `Regata comemorativa ${throwbackEditionLabel} do ${team.name} celebrando os uniformes históricos da liga. Consulte disponibilidade pelo Instagram @snap_storebr.`,
    featured: index % 9 === 0,
  };

  return [homeJersey, throwbackJersey];
}

function buildPhotoJersey(team: TeamInfo, spec: PhotoJerseySpec): JerseyProduct {
  const slug = `${team.league}-${team.id}-${spec.key}`;
  const isCommemorative = spec.edition === "Throwback";
  return {
    id: slug,
    slug,
    league: team.league,
    teamId: team.id,
    teamName: team.name,
    city: team.city,
    nickname: team.nickname,
    abbr: team.abbr,
    conferenceId: team.conferenceId,
    conferenceName: team.conferenceName,
    divisionId: team.divisionId,
    divisionName: team.divisionName,
    edition: spec.edition,
    editionLabel: spec.editionLabel,
    title: `Camisa ${team.name} ${spec.editionLabel} #${spec.playerNumber} ${spec.playerName}`,
    playerName: spec.playerName,
    playerNumber: spec.playerNumber,
    price: isCommemorative ? COMMEMORATIVE_PRICE : STANDARD_PRICE,
    originalPrice: isCommemorative ? undefined : STANDARD_ORIGINAL_PRICE,
    sku: `SNP-${team.league.toUpperCase()}-${team.abbr}-${spec.key.toUpperCase()}`,
    primaryColor: spec.primaryColor,
    secondaryColor: spec.secondaryColor,
    accentColor: team.accentColor,
    fabricNote: spec.fabricNote,
    description: isCommemorative
      ? `Edição comemorativa ${spec.editionLabel} do ${team.name} (${team.divisionName} - ${team.conferenceName}) com ${spec.playerName} #${spec.playerNumber}. Peça especial sob consulta de disponibilidade no Instagram @snap_storebr.`
      : `Camisa ${spec.editionLabel} do ${team.name} (${team.divisionName} - ${team.conferenceName}) com o nome e número de ${spec.playerName} #${spec.playerNumber}. Foto real do modelo, com 20% OFF e preço especial de R$ 250,00 cada a partir de 2 camisas.`,
    featured: spec.featured,
    image: spec.image,
    onRequest: isCommemorative || spec.onRequest,
  };
}

function buildJerseysFor(team: TeamInfo, index: number): JerseyProduct[] {
  const photos = PHOTO_JERSEYS[team.id];
  return photos ? photos.map((spec) => buildPhotoJersey(team, spec)) : buildTeamJerseys(team, index);
}

export const NFL_JERSEYS: JerseyProduct[] = ALL_NFL_TEAMS.flatMap((team, idx) =>
  buildJerseysFor(team, idx)
);

export const NBA_JERSEYS: JerseyProduct[] = ALL_NBA_TEAMS.flatMap((team, idx) =>
  buildTeamJerseys(team, idx)
);

export const ALL_JERSEYS: JerseyProduct[] = [...NFL_JERSEYS, ...NBA_JERSEYS];

export function getJerseyBySlug(slug: string): JerseyProduct | undefined {
  return ALL_JERSEYS.find((jersey) => jersey.slug === slug);
}
