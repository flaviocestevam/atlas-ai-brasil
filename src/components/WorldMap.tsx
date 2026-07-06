import { UF } from "@/data/participants";
import { BRAZIL_REGION_FILL, BRAZIL_STATE_PATHS } from "@/data/brazilMap";

export function WorldMap({ className = "" }: { className?: string }) {
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
      {BRAZIL_STATE_PATHS.map((state) => (
        <path
          key={state.code}
          d={state.d}
          fill={BRAZIL_REGION_FILL[state.region]}
          stroke="oklch(0.97 0.005 240 / 0.45)"
          strokeWidth="0.8"
          opacity="0.9"
        />
      ))}
      <g fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700" textAnchor="middle">
        {BRAZIL_STATE_PATHS.map((state) => (
          <text
            key={`uf-${state.code}`}
            x={state.label.x}
            y={state.label.y}
            fill="oklch(0.97 0.005 240)"
            stroke="oklch(0.08 0.01 260 / 0.82)"
            strokeWidth="3"
            paintOrder="stroke"
          >
            {state.code}
          </text>
        ))}
      </g>
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
