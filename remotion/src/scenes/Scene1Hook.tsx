import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT_DISPLAY, FONT_MONO } from "../MainVideo";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 18, stiffness: 120 } });
  const y = interpolate(s, [0, 1], [40, 0]);
  const blur = interpolate(s, [0, 1], [14, 0]);
  const tag = spring({ frame: frame - 8, fps, config: { damping: 20 } });
  const sub = spring({ frame: frame - 28, fps, config: { damping: 20 } });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          fontFamily: FONT_MONO,
          color: COLORS.electric,
          letterSpacing: 6,
          fontSize: 20,
          opacity: tag,
          transform: `translateY(${(1 - tag) * 20}px)`,
          marginBottom: 28,
        }}
      >
        [ TRANSMISSÃO INICIADA — 2026 ]
      </div>
      <h1
        style={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 700,
          color: COLORS.fg,
          fontSize: 140,
          lineHeight: 0.95,
          textAlign: "center",
          margin: 0,
          letterSpacing: -3,
          transform: `translateY(${y}px)`,
          filter: `blur(${blur}px)`,
          opacity: s,
        }}
      >
        E se uma <span style={{ color: COLORS.electric, textShadow: "0 0 30px rgba(34,211,238,0.6)" }}>IA</span><br />
        pudesse parecer<br />
        mais humana que você?
      </h1>
      <div
        style={{
          marginTop: 36,
          fontFamily: FONT_DISPLAY,
          color: COLORS.muted,
          fontSize: 28,
          opacity: sub,
          transform: `translateY(${(1 - sub) * 16}px)`,
        }}
      >
        20 personagens. Uma pergunta. 196 dias para descobrir.
      </div>
    </AbsoluteFill>
  );
};
