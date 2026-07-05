import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT_DISPLAY, FONT_MONO } from "../MainVideo";

const lines = [
  "Elas escrevem como nós.",
  "Postam como nós.",
  "Choram, riem, mentem — como nós.",
];

export const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ alignItems: "flex-start", justifyContent: "center", paddingLeft: 160 }}>
      <div style={{ fontFamily: FONT_MONO, color: COLORS.muted, letterSpacing: 4, fontSize: 18, marginBottom: 32 }}>
        // O cenário
      </div>
      {lines.map((t, i) => {
        const start = i * 22;
        const s = spring({ frame: frame - start, fps, config: { damping: 22, stiffness: 140 } });
        const x = interpolate(s, [0, 1], [-60, 0]);
        return (
          <div
            key={i}
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 700,
              color: i === 2 ? COLORS.electric : COLORS.fg,
              fontSize: 92,
              lineHeight: 1.1,
              letterSpacing: -2,
              opacity: s,
              transform: `translateX(${x}px)`,
              textShadow: i === 2 ? "0 0 28px rgba(34,211,238,0.45)" : undefined,
            }}
          >
            {t}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
