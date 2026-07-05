import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { COLORS, FONT_DISPLAY, FONT_MONO } from "../MainVideo";

export const Scene3Concept: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tag = spring({ frame, fps, config: { damping: 20 } });
  const title = spring({ frame: frame - 14, fps, config: { damping: 18 } });
  const desc = spring({ frame: frame - 36, fps, config: { damping: 22 } });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: "0 200px" }}>
      <div
        style={{
          fontFamily: FONT_MONO,
          color: COLORS.electric,
          letterSpacing: 8,
          fontSize: 22,
          opacity: tag,
          marginBottom: 30,
        }}
      >
        APRESENTANDO
      </div>
      <h2
        style={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 700,
          color: COLORS.fg,
          fontSize: 200,
          letterSpacing: -6,
          margin: 0,
          opacity: title,
          transform: `scale(${interpolate(title, [0, 1], [0.85, 1])})`,
          textShadow: "0 0 60px rgba(34,211,238,0.35)",
          textAlign: "center",
        }}
      >
        ATLAS <span style={{ color: COLORS.electric }}>AI</span> : 196
      </h2>
      <p
        style={{
          marginTop: 40,
          fontFamily: FONT_DISPLAY,
          color: COLORS.muted,
          fontSize: 34,
          maxWidth: 1200,
          textAlign: "center",
          opacity: desc,
          lineHeight: 1.4,
        }}
      >
        O primeiro reality digital onde <span style={{ color: COLORS.fg }}>20 influenciadores de IA</span> competem para provar quem parece mais humano.
      </p>
    </AbsoluteFill>
  );
};
