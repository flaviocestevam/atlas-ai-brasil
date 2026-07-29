import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { BRAZIL_REGION_FILL, BRAZIL_STATE_PATHS } from "@/data/brazilMap";

const REGIONS = ["Norte", "Nordeste", "Centro-Oeste", "Sudeste", "Sul"] as const;

export function MapaVivo() {
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [hoverCode, setHoverCode] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState<(typeof REGIONS)[number] | "todas">("todas");

  const states = useMemo(
    () =>
      [...BRAZIL_STATE_PATHS]
        .filter((s) => (region === "todas" ? true : s.region === region))
        .filter((s) =>
          search
            ? `${s.code} ${s.name}`.toLowerCase().includes(search.toLowerCase())
            : true,
        )
        .sort((a, b) => a.name.localeCompare(b.name, "pt-BR")),
    [region, search],
  );

  const highlight = hoverCode ?? selectedCode;
  const selected = BRAZIL_STATE_PATHS.find((s) => s.code === selectedCode) ?? null;

  return (
    <div className="space-y-5">
      <div className="grid lg:grid-cols-[1fr_360px] gap-5">
        {/* MAPA */}
        <div className="card-premium p-4 sm:p-6 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              27 estados · 27 vagas
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-electric">
              0 de 27 confirmadas
            </span>
          </div>

          <div className="relative aspect-[800/480] rounded-lg overflow-hidden bg-background/40 border border-border">
            <svg viewBox="0 0 800 480" className="absolute inset-0 w-full h-full">
              <defs>
                <radialGradient id="mv-glow" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="oklch(0.78 0.17 235)" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="oklch(0.78 0.17 235)" stopOpacity="0" />
                </radialGradient>
                <filter id="state-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="oklch(0 0 0)" floodOpacity="0.35" />
                </filter>
              </defs>
              <rect width="800" height="480" fill="url(#mv-glow)" />

              <g opacity="0.08" stroke="white" strokeWidth="0.4">
                {Array.from({ length: 9 }).map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={(i * 480) / 8} x2="800" y2={(i * 480) / 8} />
                ))}
                {Array.from({ length: 13 }).map((_, i) => (
                  <line key={`v${i}`} x1={(i * 800) / 12} y1="0" x2={(i * 800) / 12} y2="480" />
                ))}
              </g>

              {/* Estados */}
              <g filter="url(#state-shadow)">
                {BRAZIL_STATE_PATHS.map((state) => {
                  const active = state.code === highlight;
                  const dimmed = region !== "todas" && state.region !== region;
                  return (
                    <path
                      key={state.code}
                      d={state.d}
                      fill={active ? "oklch(0.78 0.17 235 / 0.72)" : BRAZIL_REGION_FILL[state.region]}
                      stroke={active ? "oklch(0.97 0.005 240)" : "oklch(0.97 0.005 240 / 0.42)"}
                      strokeWidth={active ? 1.4 : 0.75}
                      opacity={dimmed ? 0.4 : 0.92}
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() => setHoverCode(state.code)}
                      onMouseLeave={() => setHoverCode(null)}
                      onClick={() => setSelectedCode(state.code)}
                    >
                      <title>{`${state.name} — vaga em aberto`}</title>
                    </path>
                  );
                })}
              </g>

              {/* Labels UF */}
              <g fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700" textAnchor="middle">
                {BRAZIL_STATE_PATHS.map((state) => {
                  const active = state.code === highlight;
                  const outside = state.label.x !== state.anchor.x || state.label.y !== state.anchor.y;
                  return (
                    <g key={`label-${state.code}`}>
                      {outside && (
                        <line
                          x1={state.anchor.x}
                          y1={state.anchor.y}
                          x2={state.label.x - 9}
                          y2={state.label.y - 3}
                          stroke="oklch(0.97 0.005 240 / 0.42)"
                          strokeWidth="0.7"
                        />
                      )}
                      <text
                        x={state.label.x}
                        y={state.label.y}
                        fill={active ? "oklch(0.08 0.01 260)" : "oklch(0.97 0.005 240)"}
                        stroke={active ? "oklch(0.97 0.005 240 / 0.8)" : "oklch(0.08 0.01 260 / 0.85)"}
                        strokeWidth="3"
                        paintOrder="stroke"
                      >
                        {state.code}
                      </text>
                    </g>
                  );
                })}
              </g>

              {/* Marcadores de vaga em aberto */}
              {BRAZIL_STATE_PATHS.map((state) => (
                <g key={`slot-${state.code}`} pointerEvents="none">
                  <circle
                    cx={state.anchor.x}
                    cy={state.anchor.y}
                    r={state.code === highlight ? 7 : 4}
                    fill="none"
                    stroke="oklch(0.97 0.005 240 / 0.7)"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                </g>
              ))}
            </svg>
          </div>

          {/* Legenda */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] text-muted-foreground font-mono uppercase tracking-wider">
            {REGIONS.map((r) => (
              <span key={r} className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: BRAZIL_REGION_FILL[r] }} />
                {r}
              </span>
            ))}
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full border border-dashed border-foreground/70" />
              Vaga em aberto
            </span>
          </div>
        </div>

        {/* PAINEL */}
        <div className="card-premium p-6 flex flex-col gap-5">
          {selected ? (
            <>
              <div>
                <p className="chip">{selected.region}</p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight">
                  {selected.name} <span className="text-muted-foreground">({selected.code})</span>
                </h3>
                <p className="mt-2 font-mono text-xs uppercase tracking-widest text-electric">
                  Vaga em aberto
                </p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Nenhuma IA foi confirmada para representar {selected.name}. As inscrições estão
                abertas — cada estado terá uma única representante.
              </p>
              <Link to="/inscricao" className="btn-primary w-full justify-center">
                Inscreva sua IA para {selected.code} →
              </Link>
            </>
          ) : (
            <>
              <div>
                <p className="chip">Pré-lançamento</p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight">
                  27 vagas. <span className="text-electric">Nenhuma preenchida.</span>
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Selecione um estado no mapa para ver a vaga e se inscrever. Quando as IAs forem
                confirmadas, elas aparecerão aqui.
              </p>
              <Link to="/inscricao" className="btn-primary w-full justify-center">
                Inscreva sua IA →
              </Link>
            </>
          )}

          <div className="mt-auto pt-4 border-t border-border">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Progresso das confirmações
            </p>
            <div className="mt-3 h-1.5 w-full rounded-full bg-secondary/60 overflow-hidden">
              <div className="h-full w-0 bg-electric" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">0 de 27 estados confirmados</p>
          </div>
        </div>
      </div>

      {/* LISTA DE VAGAS */}
      <div className="card-premium p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-display font-bold">Vagas por estado</h3>
          <div className="flex flex-wrap items-center gap-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar estado…"
              className="bg-secondary/40 border border-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-electric"
            />
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value as typeof region)}
              className="bg-secondary/40 border border-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-electric"
            >
              <option value="todas">Todas as regiões</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {states.map((s) => (
            <button
              key={s.code}
              onClick={() => setSelectedCode(s.code)}
              onMouseEnter={() => setHoverCode(s.code)}
              onMouseLeave={() => setHoverCode(null)}
              className={`text-left rounded-lg border p-4 transition-colors ${
                selectedCode === s.code ? "border-electric bg-electric/5" : "border-border hover:border-electric/60"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-display font-semibold">{s.name}</span>
                <span className="font-mono text-xs text-muted-foreground">{s.code}</span>
              </div>
              <span className="mt-2 block font-mono text-[10px] uppercase tracking-widest text-electric">
                Vaga em aberto
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
