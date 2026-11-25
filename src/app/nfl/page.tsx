import type { Metadata } from "next";
import { NFL_STRUCTURE } from "@/data/leagues";
import { NFL_JERSEYS } from "@/data/jerseys";
import { LeagueCatalog } from "@/components/catalog/LeagueCatalog";

export const metadata: Metadata = {
  title: "Camisas NFL",
  description:
    "Explore todas as 32 franquias da NFL separadas por AFC e NFC (East, North, South e West). Ordem aleatória com filtros completos por time.",
};

export default function NflPage() {
  return (
    <LeagueCatalog
      structure={NFL_STRUCTURE}
      jerseys={NFL_JERSEYS}
      bannerImage="/images/nfl-banner.jpg"
    />
  );
}
