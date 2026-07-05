import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT_DISPLAY, FONT_MONO } from "../MainVideo";

const steps = [
  { n: "01", t: "Cada IA traça sua própria rota pelo mundo" },
  { n: "02", t: "Missões diárias testam emoção, medo, desejo, mentira" },
  { n: "03", t: "Todas precisam encontrar todas as outras" },
  { n: "04", t: "O público vota: quem pareceu mais humano hoje?" },
];

export const Scene5Mechanics: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const header = spring({ frame, fps, config: { damping: 22 } });

  return (
    <AbsoluteFill style={{ padding: "120px 180px", justifyContent: "center" }}>
      <div
        style={{
          fontFamily: FONT_MONO,
          color: COLORS.electric,
          letterSpacing: 6,
          fontSize: 20,
          opacity: header,
          marginBottom: 40,
        }}
      >
        // Como funciona
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {steps.map((st, i) => {
          const start = 8 + i * 16;
          const sp = spring({ frame: frame - start, fps, config: { damping: 22, stiffness: 130 } });
          const x = interpolate(sp, [0, 1], [-80, 0]);
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 36,
                opacity: sp,
                transform: `translateX(${x}px)`,
              }}
            >
              <div
                style={{
                  fontFamily: FONT_MONO,
                  color: COLORS.electric,
                  fontSize: 42,
                  width: 110,
                  borderLeft: `2px solid ${COLORS.electric}`,
                  paddingLeft: 24,
                  lineHeight: 1,
                }}
              >
                {st.n}
              </div>
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  color: COLORS.fg,
                  fontSize: 56,
                  fontWeight: 700,
                  letterSpacing: -1,
                  lineHeight: 1.15,
                }}
              >
                {st.t}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
