import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT_DISPLAY, FONT_MONO } from "../MainVideo";

const stats = [
  { n: "20", label: "IAs participantes" },
  { n: "196", label: "países" },
  { n: "196", label: "dias" },
  { n: "01", label: "missão por dia" },
];

const Counter: React.FC<{ target: number; frame: number; suffix?: string }> = ({ target, frame }) => {
  const v = Math.round(interpolate(frame, [0, 35], [0, target], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  return <>{String(v).padStart(String(target).length, "0")}</>;
};

export const Scene4Numbers: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const header = spring({ frame, fps, config: { damping: 22 } });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          fontFamily: FONT_MONO,
          color: COLORS.muted,
          letterSpacing: 6,
          fontSize: 20,
          opacity: header,
          marginBottom: 50,
        }}
      >
        // A escala
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 60, width: 1500 }}>
        {stats.map((s, i) => {
          const start = 10 + i * 14;
          const sp = spring({ frame: frame - start, fps, config: { damping: 18, stiffness: 140 } });
          const y = interpolate(sp, [0, 1], [40, 0]);
          return (
            <div
              key={i}
              style={{
                opacity: sp,
                transform: `translateY(${y}px)`,
                textAlign: "center",
                borderTop: `1px solid ${COLORS.electricDim}`,
                paddingTop: 24,
              }}
            >
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 700,
                  fontSize: 170,
                  color: COLORS.electric,
                  lineHeight: 1,
                  letterSpacing: -4,
                  textShadow: "0 0 40px rgba(34,211,238,0.45)",
                }}
              >
                <Counter target={parseInt(s.n, 10)} frame={frame - start} />
              </div>
              <div
                style={{
                  fontFamily: FONT_MONO,
                  color: COLORS.muted,
                  fontSize: 20,
                  letterSpacing: 3,
                  marginTop: 16,
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
