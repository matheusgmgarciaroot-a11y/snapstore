import type { Metadata } from "next";
import { NbaComingSoon } from "@/components/nba/NbaComingSoon";

export const metadata: Metadata = {
  title: "NBA em Construção",
  description:
    "Catálogo oficial da NBA em construção na Snap Store. Em breve todas as 30 franquias disponíveis.",
};

export default function NbaPage() {
  return <NbaComingSoon />;
}
