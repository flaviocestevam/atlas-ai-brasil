// Stylized world-map visual built from SVG dots — no real people, fully generated
export function WorldMap({ className = "" }: { className?: string }) {
  // Procedural dot grid masked roughly to continent shapes via clip
  const dots: Array<{ x: number; y: number; r: number; bright?: boolean }> = [];
  const seed = 7;
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  // continent blobs (very rough): array of [cx, cy, rx, ry]
  const blobs: Array<[number, number, number, number]> = [
    [180, 180, 90, 70],   // N America
    [240, 320, 60, 80],   // S America
    [430, 180, 70, 60],   // Europe
    [470, 290, 90, 100],  // Africa
    [580, 200, 130, 90],  // Asia
    [660, 380, 60, 40],   // Oceania
  ];
  for (let i = 0; i < 700; i++) {
    const b = blobs[Math.floor(rand() * blobs.length)];
    const a = rand() * Math.PI * 2;
    const r = Math.sqrt(rand());
    const x = b[0] + Math.cos(a) * b[2] * r;
    const y = b[1] + Math.sin(a) * b[3] * r;
    dots.push({ x, y, r: 1 + rand() * 0.8, bright: rand() > 0.93 });
  }

  // Highlighted route points
  const route = [
    { x: 200, y: 170, label: "BR" },
    { x: 420, y: 170, label: "PT" },
    { x: 460, y: 240, label: "MA" },
    { x: 560, y: 220, label: "AE" },
    { x: 620, y: 180, label: "JP" },
    { x: 660, y: 380, label: "AU" },
  ];

  return (
    <svg viewBox="0 0 800 480" className={className} aria-hidden>
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="oklch(0.78 0.17 235)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="oklch(0.78 0.17 235)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.78 0.17 235)" stopOpacity="0" />
          <stop offset="50%" stopColor="oklch(0.78 0.17 235)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="oklch(0.55 0.18 295)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="800" height="480" fill="url(#glow)" opacity="0.6" />
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.r}
          fill={d.bright ? "oklch(0.78 0.17 235)" : "oklch(0.7 0.04 250 / 0.55)"}
          opacity={d.bright ? 0.95 : 0.45}
        />
      ))}
      {/* Route polyline */}
      <polyline
        points={route.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke="url(#line)"
        strokeWidth="1.2"
        strokeDasharray="3 4"
      />
      {route.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="8" fill="oklch(0.78 0.17 235)" opacity="0.15" />
          <circle cx={p.x} cy={p.y} r="3" fill="oklch(0.78 0.17 235)">
            <animate attributeName="opacity" values="0.4;1;0.4" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
          <text x={p.x + 10} y={p.y + 4} fill="oklch(0.97 0.005 240)" fontSize="9" fontFamily="ui-monospace, monospace" opacity="0.7">
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
