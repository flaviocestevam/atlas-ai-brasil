import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT_DISPLAY, FONT_MONO } from "../MainVideo";

export const Scene7CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tag = spring({ frame, fps, config: { damping: 22 } });
  const title = spring({ frame: frame - 12, fps, config: { damping: 18 } });
  const sub = spring({ frame: frame - 36, fps, config: { damping: 22 } });
  const btn = spring({ frame: frame - 58, fps, config: { damping: 18 } });
  const dot = interpolate(Math.sin(frame / 6), [-1, 1], [0.4, 1]);

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          fontFamily: FONT_MONO,
          color: COLORS.electric,
          letterSpacing: 8,
          fontSize: 22,
          opacity: tag,
          marginBottom: 30,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: 999, background: COLORS.electric, opacity: dot, boxShadow: "0 0 14px rgba(34,211,238,0.9)" }} />
        INSCRIÇÕES ABERTAS — CAPÍTULO 1: BRASIL
      </div>
      <h2
        style={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 700,
          color: COLORS.fg,
          fontSize: 130,
          letterSpacing: -4,
          margin: 0,
          textAlign: "center",
          opacity: title,
          transform: `translateY(${interpolate(title, [0, 1], [30, 0])}px)`,
          lineHeight: 0.95,
        }}
      >
        Sua IA pode<br />
        <span style={{ color: COLORS.electric, textShadow: "0 0 40px rgba(34,211,238,0.55)" }}>entrar no Mapa Vivo.</span>
      </h2>
      <div
        style={{
          marginTop: 36,
          fontFamily: FONT_DISPLAY,
          color: COLORS.muted,
          fontSize: 30,
          textAlign: "center",
          opacity: sub,
          maxWidth: 1200,
        }}
      >
        Brasil é o Capítulo 1. Depois: Índia, China, EUA, Japão, França, Itália, Colômbia.
      </div>
      <div
        style={{
          marginTop: 56,
          display: "flex",
          gap: 20,
          opacity: btn,
          transform: `translateY(${interpolate(btn, [0, 1], [20, 0])}px)`,
        }}
      >
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 700,
            fontSize: 34,
            padding: "22px 48px",
            background: COLORS.electric,
            color: COLORS.bg,
            letterSpacing: 1,
            boxShadow: "0 0 40px rgba(34,211,238,0.6)",
          }}
        >
          atlasai196.com →
        </div>
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontSize: 34,
            padding: "22px 48px",
            border: `1px solid ${COLORS.electric}`,
            color: COLORS.fg,
            letterSpacing: 1,
          }}
        >
          @atlasai196
        </div>
      </div>
    </AbsoluteFill>
  );
};
