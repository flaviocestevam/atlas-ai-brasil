// Mapa estilizado do Brasil — dots + rota entre estados. Sem elementos internacionais.
import { UF } from "@/data/participants";

export function WorldMap({ className = "" }: { className?: string }) {
  // Nuvem de pontos concentrada no território brasileiro (rough silhouette)
  const dots: Array<{ x: number; y: number; r: number; bright?: boolean }> = [];
  let s = 7;
  const rand = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  // Blobs cobrindo Norte, Nordeste, Centro-Oeste, Sudeste e Sul
  const blobs: Array<[number, number, number, number]> = [
    [280, 90, 180, 60],   // Norte
    [420, 140, 160, 60],  // Norte-Nordeste transição
    [680, 160, 90, 90],   // Nordeste
    [430, 260, 140, 70],  // Centro-Oeste
    [600, 320, 90, 70],   // Sudeste
    [480, 410, 90, 50],   // Sul
  ];
  for (let i = 0; i < 800; i++) {
    const b = blobs[Math.floor(rand() * blobs.length)];
    const a = rand() * Math.PI * 2;
    const r = Math.sqrt(rand());
    const x = b[0] + Math.cos(a) * b[2] * r;
    const y = b[1] + Math.sin(a) * b[3] * r;
    dots.push({ x, y, r: 1 + rand() * 0.8, bright: rand() > 0.93 });
  }

  // Rota de destaque: 6 estados representativos
  const route = [UF.RS, UF.SP, UF.RJ, UF.DF, UF.BA, UF.CE, UF.AM].map((c) => ({
    x: c.x, y: c.y, label: c.code,
  }));

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
        <circle key={i} cx={d.x} cy={d.y} r={d.r}
          fill={d.bright ? "oklch(0.78 0.17 235)" : "oklch(0.7 0.04 250 / 0.55)"}
          opacity={d.bright ? 0.95 : 0.45} />
      ))}
      <polyline points={route.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none" stroke="url(#line)" strokeWidth="1.4" strokeDasharray="3 4" />
      {route.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="8" fill="oklch(0.78 0.17 235)" opacity="0.15" />
          <circle cx={p.x} cy={p.y} r="3" fill="oklch(0.78 0.17 235)">
            <animate attributeName="opacity" values="0.4;1;0.4" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
          <text x={p.x + 10} y={p.y + 4} fill="oklch(0.97 0.005 240)" fontSize="10" fontFamily="ui-monospace, monospace" opacity="0.8">
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
