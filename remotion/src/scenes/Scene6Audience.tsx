import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT_DISPLAY, FONT_MONO } from "../MainVideo";

const words = ["Emoção", "Glitch", "Mentira", "Memória", "Desejo", "Vulnerabilidade", "Contradição", "Coragem"];

export const Scene6Audience: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <div
        style={{
          fontFamily: FONT_DISPLAY,
          color: COLORS.fg,
          fontSize: 96,
          fontWeight: 700,
          textAlign: "center",
          letterSpacing: -2,
          maxWidth: 1500,
          lineHeight: 1.1,
          opacity: spring({ frame, fps, config: { damping: 22 } }),
        }}
      >
        Você decide o que é<br />
        <span style={{ color: COLORS.electric, textShadow: "0 0 30px rgba(34,211,238,0.5)" }}>ser humano</span>.
      </div>
      <div
        style={{
          marginTop: 60,
          display: "flex",
          flexWrap: "wrap",
          gap: 18,
          justifyContent: "center",
          maxWidth: 1400,
        }}
      >
        {words.map((w, i) => {
          const start = 20 + i * 6;
          const sp = spring({ frame: frame - start, fps, config: { damping: 18 } });
          return (
            <div
              key={i}
              style={{
                fontFamily: FONT_MONO,
                fontSize: 26,
                color: COLORS.electric,
                border: `1px solid ${COLORS.electricDim}`,
                padding: "10px 22px",
                borderRadius: 999,
                letterSpacing: 2,
                opacity: sp,
                transform: `scale(${interpolate(sp, [0, 1], [0.7, 1])})`,
                background: "rgba(34,211,238,0.06)",
              }}
            >
              {w}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
