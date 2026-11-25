import React from "react";
import Image from "next/image";
import { JerseyProduct } from "@/data/jerseys";

interface JerseyGraphicProps {
  jersey: JerseyProduct;
  displayName?: string;
  displayNumber?: string;
  compact?: boolean;
  viewSide?: "front" | "back";
}

function isLightHex(hex: string): boolean {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return false;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.72;
}

export function JerseyGraphic({
  jersey,
  displayName,
  displayNumber,
  compact = false,
  viewSide = "front",
}: JerseyGraphicProps) {
  if (jersey.image) {
    return (
      <Image
        src={jersey.image}
        alt={jersey.title}
        width={800}
        height={800}
        className="w-full h-full object-contain select-none mix-blend-multiply"
      />
    );
  }

  const bodyColor = jersey.primaryColor;
  const trimColor = jersey.secondaryColor;
  const lightBody = isLightHex(bodyColor);

  const numberFill = lightBody ? trimColor : "#FFFFFF";
  const numberStroke = lightBody ? "#111317" : trimColor;
  const bodyOutline = lightBody ? "#CBD2D9" : "rgba(255,255,255,0.18)";
  const textOnBody = lightBody ? "#111317" : "#FFFFFF";

  const activeNumber = (displayNumber || jersey.playerNumber).slice(0, 2);
  const activeName = (displayName || jersey.playerName).toUpperCase().slice(0, 12);

  if (jersey.league === "nfl") {
    return (
      <svg
        viewBox="0 0 240 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full select-none"
        aria-label={`Ilustração da camisa ${jersey.teamName}`}
      >
        {/* Sleeves + Body */}
        <path
          d="M54 36L20 68L42 108L66 94V224H174V94L198 108L220 68L186 36L154 24C144 36 132 42 120 42C108 42 96 36 86 24L54 36Z"
          fill={bodyColor}
          stroke={bodyOutline}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Sleeve Stripes */}
        <path d="M29 84L49 72L54 81L34 93L29 84Z" fill={trimColor} />
        <path d="M211 84L191 72L186 81L206 93L211 84Z" fill={trimColor} />
        {/* Shoulder Yoke */}
        <path
          d="M66 92C76 68 80 42 86 24L54 36L66 92Z"
          fill={trimColor}
          fillOpacity="0.18"
        />
        <path
          d="M174 92C164 68 160 42 154 24L186 36L174 92Z"
          fill={trimColor}
          fillOpacity="0.18"
        />
        {/* V-Neck Collar */}
        <path
          d="M86 24C96 42 108 50 120 52C132 50 144 42 154 24"
          stroke={trimColor}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M90 25C99 39 109 45 120 47C131 45 141 39 150 25"
          stroke={bodyOutline}
          strokeWidth="1.5"
        />
        {/* NFL Collar Crest */}
        <rect x="115" y="47" width="10" height="10" rx="2" fill="#013369" stroke="#FFFFFF" strokeWidth="1" />

        {viewSide === "front" ? (
          <>
            <text
              x="120"
              y="84"
              textAnchor="middle"
              fill={textOnBody}
              fontFamily="Barlow Condensed, sans-serif"
              fontWeight="800"
              fontSize={compact ? "14" : "13"}
              letterSpacing="2"
            >
              {jersey.abbr}
            </text>
            <text
              x="120"
              y="156"
              textAnchor="middle"
              fill={numberFill}
              stroke={numberStroke}
              strokeWidth="2.5"
              paintOrder="stroke"
              fontFamily="Barlow Condensed, sans-serif"
              fontWeight="800"
              fontSize="74"
              letterSpacing="-2"
            >
              {activeNumber}
            </text>
          </>
        ) : (
          <>
            <text
              x="120"
              y="84"
              textAnchor="middle"
              fill={textOnBody}
              fontFamily="Barlow Condensed, sans-serif"
              fontWeight="800"
              fontSize={activeName.length > 9 ? "15" : "18"}
              letterSpacing="1.5"
            >
              {activeName}
            </text>
            <text
              x="120"
              y="164"
              textAnchor="middle"
              fill={numberFill}
              stroke={numberStroke}
              strokeWidth="2.5"
              paintOrder="stroke"
              fontFamily="Barlow Condensed, sans-serif"
              fontWeight="800"
              fontSize="80"
              letterSpacing="-2"
            >
              {activeNumber}
            </text>
          </>
        )}

        {/* Hem Jock Tag */}
        <rect
          x="148"
          y="200"
          width="16"
          height="14"
          rx="1"
          fill={lightBody ? "#111317" : "#FFFFFF"}
          fillOpacity="0.9"
        />
      </svg>
    );
  }

  // NBA Sleeveless Tank Jersey
  return (
    <svg
      viewBox="0 0 240 250"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full select-none"
      aria-label={`Ilustração da regata ${jersey.teamName}`}
    >
      {/* Tank Silhouette */}
      <path
        d="M72 24H92C98 44 108 54 120 54C132 54 142 44 148 24H168C171 58 180 80 188 94V226H52V94C60 80 69 58 72 24Z"
        fill={bodyColor}
        stroke={bodyOutline}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Armhole & Neck Ribbing Trim */}
      <path
        d="M92 24C98 44 108 54 120 54C132 54 142 44 148 24"
        stroke={trimColor}
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <path
        d="M72 24C69 58 60 80 52 94"
        stroke={trimColor}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M168 24C171 58 180 80 188 94"
        stroke={trimColor}
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Side Panel Stripes */}
      <rect x="53" y="96" width="6" height="128" fill={trimColor} />
      <rect x="181" y="96" width="6" height="128" fill={trimColor} />

      {viewSide === "front" ? (
        <>
          <text
            x="120"
            y="95"
            textAnchor="middle"
            fill={textOnBody}
            fontFamily="Barlow Condensed, sans-serif"
            fontWeight="800"
            fontSize={jersey.nickname.length > 9 ? "17" : "21"}
            letterSpacing="1.2"
          >
            {jersey.nickname.toUpperCase()}
          </text>
          <text
            x="120"
            y="168"
            textAnchor="middle"
            fill={numberFill}
            stroke={numberStroke}
            strokeWidth="2.5"
            paintOrder="stroke"
            fontFamily="Barlow Condensed, sans-serif"
            fontWeight="800"
            fontSize="74"
            letterSpacing="-2"
          >
            {activeNumber}
          </text>
        </>
      ) : (
        <>
          <text
            x="120"
            y="92"
            textAnchor="middle"
            fill={textOnBody}
            fontFamily="Barlow Condensed, sans-serif"
            fontWeight="800"
            fontSize={activeName.length > 9 ? "15" : "18"}
            letterSpacing="1.5"
          >
            {activeName}
          </text>
          <text
            x="120"
            y="168"
            textAnchor="middle"
            fill={numberFill}
            stroke={numberStroke}
            strokeWidth="2.5"
            paintOrder="stroke"
            fontFamily="Barlow Condensed, sans-serif"
            fontWeight="800"
            fontSize="78"
            letterSpacing="-2"
          >
            {activeNumber}
          </text>
        </>
      )}

      {/* Hem Jock Tag */}
      <rect
        x="146"
        y="204"
        width="18"
        height="13"
        rx="1"
        fill={lightBody ? "#111317" : "#FFFFFF"}
        fillOpacity="0.9"
      />
    </svg>
  );
}
