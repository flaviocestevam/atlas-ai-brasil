import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import { loadFont as loadDisplay } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Problem } from "./scenes/Scene2Problem";
import { Scene3Concept } from "./scenes/Scene3Concept";
import { Scene4Numbers } from "./scenes/Scene4Numbers";
import { Scene5Mechanics } from "./scenes/Scene5Mechanics";
import { Scene6Audience } from "./scenes/Scene6Audience";
import { Scene7CTA } from "./scenes/Scene7CTA";

const display = loadDisplay("normal", { weights: ["400", "700"], subsets: ["latin"] });
const mono = loadMono("normal", { weights: ["400"], subsets: ["latin"] });

export const FONT_DISPLAY = display.fontFamily;
export const FONT_MONO = mono.fontFamily;

// Palette inspired by ATLAS site: deep near-black bg, electric cyan accent
export const COLORS = {
  bg: "#06070b",
  bg2: "#0b0f17",
  fg: "#e8edf5",
  muted: "#7a8597",
  electric: "#22d3ee",
  electricDim: "#0e7490",
  warn: "#f59e0b",
};

const Grid: React.FC = () => {
  const frame = useCurrentFrame();
  const shift = (frame * 0.4) % 60;
  return (
    <AbsoluteFill
      style={{
        backgroundImage:
          "linear-gradient(rgba(34,211,238,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.08) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        backgroundPosition: `${shift}px ${shift}px`,
        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
      }}
    />
  );
};

const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)",
      pointerEvents: "none",
    }}
  />
);

const ScanLine: React.FC = () => {
  const frame = useCurrentFrame();
  const { height } = useVideoConfig();
  const y = ((frame * 6) % (height + 200)) - 100;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: y,
        height: 2,
        background:
          "linear-gradient(90deg, transparent, rgba(34,211,238,0.5), transparent)",
        opacity: 0.6,
      }}
    />
  );
};

const Watermark: React.FC = () => (
  <div
    style={{
      position: "absolute",
      top: 40,
      left: 60,
      fontFamily: FONT_MONO,
      color: COLORS.electric,
      fontSize: 18,
      letterSpacing: 4,
      opacity: 0.7,
    }}
  >
    ATLAS::OBSERVING
    <span style={{ marginLeft: 12, color: COLORS.muted }}>● REC</span>
  </div>
);

export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const bgPulse = interpolate(
    Math.sin(frame / 40),
    [-1, 1],
    [0.6, 1]
  );

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 20, durationInFrames - 1], [1, 0], { extrapolateLeft: "clamp" });
  const globalOpacity = Math.min(fadeIn, fadeOut);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, opacity: globalOpacity }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 40%, rgba(34,211,238,${0.18 * bgPulse}) 0%, transparent 55%)`,
        }}
      />
      <Grid />
      <Vignette />
      <ScanLine />
      <Watermark />

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={120}>
          <Scene1Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={springTiming({ config: { damping: 200 }, durationInFrames: 18 })} />

        <TransitionSeries.Sequence durationInFrames={110}>
          <Scene2Problem />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-right" })} timing={springTiming({ config: { damping: 200 }, durationInFrames: 20 })} />

        <TransitionSeries.Sequence durationInFrames={120}>
          <Scene3Concept />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={springTiming({ config: { damping: 200 }, durationInFrames: 18 })} />

        <TransitionSeries.Sequence durationInFrames={130}>
          <Scene4Numbers />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-bottom" })} timing={springTiming({ config: { damping: 200 }, durationInFrames: 20 })} />

        <TransitionSeries.Sequence durationInFrames={130}>
          <Scene5Mechanics />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={springTiming({ config: { damping: 200 }, durationInFrames: 18 })} />

        <TransitionSeries.Sequence durationInFrames={100}>
          <Scene6Audience />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={springTiming({ config: { damping: 200 }, durationInFrames: 18 })} />

        <TransitionSeries.Sequence durationInFrames={130}>
          <Scene7CTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
