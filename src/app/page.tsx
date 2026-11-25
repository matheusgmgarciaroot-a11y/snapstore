import React from "react";
import { NFL_JERSEYS } from "@/data/jerseys";
import { HomeShowcase } from "@/components/home/HomeShowcase";

export default function HomePage() {
  // Showcase 4 top NFL jerseys on the home page (full catalog lives in /nfl)
  const featuredSlugs = [
    "nfl-kansas-city-chiefs-mahomes-15-home-red",
    "nfl-philadelphia-eagles-hurts-1-home-green",
    "nfl-buffalo-bills-allen-17-home-blue",
    "nfl-dallas-cowboys-lamb-88-away-navy",
  ];

  const featured = featuredSlugs
    .map((slug) => NFL_JERSEYS.find((j) => j.slug === slug))
    .filter((j): j is NonNullable<typeof j> => Boolean(j));

  return <HomeShowcase featuredJerseys={featured} />;
}
