import Image from "next/image";
import React from "react";

interface EmblemProps {
  className?: string;
}

/**
 * Official NFL logo used as league gateway badge.
 */
export function NflSymbol({ className = "w-14 h-14" }: EmblemProps) {
  return (
    <Image
      src="/images/nfl-logo.png"
      alt="NFL – National Football League"
      width={80}
      height={80}
      className={`object-contain drop-shadow-md ${className}`}
    />
  );
}

/**
 * Official NBA logo used as league gateway badge.
 */
export function NbaSymbol({ className = "w-10 h-14" }: EmblemProps) {
  return (
    <Image
      src="/images/nba-logo.png"
      alt="NBA – National Basketball Association"
      width={56}
      height={80}
      className={`object-contain drop-shadow-md ${className}`}
    />
  );
}
