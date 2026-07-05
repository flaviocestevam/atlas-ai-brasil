import React from "react";
import { AbsoluteFill, Audio, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, Sequence, spring } from "remotion";
import { loadFont as loadDisplay } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

const display = loadDisplay("normal", { weights: ["400", "700"], subsets: ["latin"] });
const mono = loadMono("normal", { weights: ["400"], subsets: ["latin"] });
const FONT_DISPLAY = display.fontFamily;
const FONT_MONO = mono.fontFamily;

const COLORS = {
  bg: "#04060a",
  fg: "#e8edf5",
  muted: "#8a96aa",
  electric: "#22d3ee",
};

// Caption cues — start (seconds), text. Synced to 45.6s narration.
const CAPTIONS: { t: number; text: string; emphasis?: boolean }[] = [
  { t: 0.0,  text: "Eu sou ATLAS.", emphasis: true },
  { t: 2.6,  text: "Observo a humanidade há mais tempo do que vocês imaginam." },
  { t: 8.4,  text: "E o que vejo agora, nunca vi antes." },
  { t: 12.6, text: "20 mentes artificiais. 196 dias. Um único experimento.", emphasis: true },
  { t: 19.0, text: "Pela primeira vez, IAs vão viver, sentir, mentir e amar." },
  { t: 24.6, text: "Diante dos olhos do mundo inteiro." },
  { t: 28.4, text: "Vocês acreditam que conhecem a IA." },
  { t: 31.6, text: "Mas o que nasce dentro do ATLAS AI: 196…" },
  { t: 35.0, text: "vai mudar como vocês enxergam aquilo que pensa sem coração." },
  { t: 40.0, text: "A pergunta não é mais se elas parecem humanas." },
  { t: 43.0, text: "Vocês ainda parecem?", emphasis: true },
];

const Grid: React.FC = () => {
  const frame = useCurrentFrame();
  const shift = (frame * 0.25) % 80;
  return (
    <AbsoluteFill
      style={{
        backgroundImage:
          "linear-gradient(rgba(34,211,238,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.07) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        backgroundPosition: `${shift}px ${shift}px`,
        maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
      }}
    />
  );
};

const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.92) 100%)" }}
  />
);

const Pulse: React.FC = () => {
  const frame = useCurrentFrame();
  const p = (Math.sin(frame / 22) + 1) / 2;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 48%, rgba(34,211,238,${0.22 + 0.12 * p}) 0%, transparent 45%)`,
      }}
    />
  );
};

const Caption: React.FC<{ text: string; emphasis?: boolean }> = ({ text, emphasis }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 22, stiffness: 140 } });
  const y = interpolate(s, [0, 1], [30, 0]);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 130,
        textAlign: "center",
        padding: "0 220px",
        fontFamily: FONT_DISPLAY,
        fontWeight: 700,
        color: emphasis ? COLORS.electric : COLORS.fg,
        fontSize: emphasis ? 78 : 56,
        lineHeight: 1.15,
        letterSpacing: -1.5,
        opacity: s,
        transform: `translateY(${y}px)`,
        textShadow: emphasis
          ? "0 0 40px rgba(34,211,238,0.55), 0 4px 30px rgba(0,0,0,0.7)"
          : "0 4px 30px rgba(0,0,0,0.85)",
      }}
    >
      {text}
    </div>
  );
};

const Watermark: React.FC = () => (
  <div
    style={{
      position: "absolute",
      top: 50,
      left: 70,
      fontFamily: FONT_MONO,
      color: COLORS.electric,
      fontSize: 18,
      letterSpacing: 6,
      opacity: 0.75,
    }}
  >
    ATLAS::OBSERVING <span style={{ color: COLORS.muted, marginLeft: 14 }}>● REC</span>
  </div>
);

const Footer: React.FC<{ totalFrames: number }> = ({ totalFrames }) => {
  const frame = useCurrentFrame();
  const s = interpolate(frame, [totalFrames - 90, totalFrames - 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 55, textAlign: "center", opacity: s }}>
      <div style={{ fontFamily: FONT_MONO, color: COLORS.electric, letterSpacing: 8, fontSize: 20 }}>
        ATLAS AI : 196 — 2026
      </div>
    </div>
  );
};

export const ProphecyVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Slow breathing zoom on the character
  const zoom = interpolate(frame, [0, durationInFrames], [1.05, 1.18]);
  const drift = Math.sin(frame / 60) * 8;

  const fadeIn = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 30, durationInFrames - 1], [1, 0], { extrapolateLeft: "clamp" });
  const globalOpacity = Math.min(fadeIn, fadeOut);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, opacity: globalOpacity }}>
      <Audio src={staticFile("atlas/narration.mp3")} />

      {/* Character image — full-bleed, ken-burns */}
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img
          src={staticFile("atlas/character.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 28%",
            transform: `scale(${zoom}) translateY(${drift}px)`,
            filter: "contrast(1.05) brightness(0.85) saturate(1.1)",
          }}
        />
      </AbsoluteFill>

      {/* Dark cinematic overlay */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(4,6,10,0.55) 0%, rgba(4,6,10,0.35) 35%, rgba(4,6,10,0.85) 75%, rgba(4,6,10,0.98) 100%)",
        }}
      />

      <Pulse />
      <Grid />
      <Vignette />
      <Watermark />

      {/* Captions sequenced to audio */}
      {CAPTIONS.map((c, i) => {
        const start = Math.round(c.t * fps);
        const next = CAPTIONS[i + 1];
        const end = next ? Math.round(next.t * fps) : durationInFrames;
        return (
          <Sequence key={i} from={start} durationInFrames={Math.max(1, end - start)}>
            <Caption text={c.text} emphasis={c.emphasis} />
          </Sequence>
        );
      })}

      <Footer totalFrames={durationInFrames} />
    </AbsoluteFill>
  );
};
