import React from "react";
import { NFL_JERSEYS } from "@/data/jerseys";
import { HomeShowcase } from "@/components/home/HomeShowcase";

export default function HomePage() {
  // Showcase 8 top NFL jerseys with real photos while NBA is under construction
  const featuredSlugs = [
    "nfl-kansas-city-chiefs-mahomes-15-home-red",
    "nfl-philadelphia-eagles-hurts-1-home-green",
    "nfl-buffalo-bills-allen-17-home-blue",
    "nfl-dallas-cowboys-lamb-88-away-navy",
    "nfl-atlanta-falcons-london-5-2026-home-red",
    "nfl-san-francisco-49ers-purdy-13-home-red",
    "nfl-baltimore-ravens-jackson-8-home-purple",
    "nfl-cincinnati-bengals-burrow-9-home-black",
  ];

  const featured = featuredSlugs
    .map((slug) => NFL_JERSEYS.find((j) => j.slug === slug))
    .filter((j): j is NonNullable<typeof j> => Boolean(j));

  return <HomeShowcase featuredJerseys={featured} />;
}
