import { useMemo, useState } from "react";
import {
  PARTICIPANTS,
  STATUS_LABEL,
  STATUS_COLOR,
  type Participant,
  type ParticipantStatus,
  type EmotionalStatus,
} from "@/data/participants";

const ALL_STATUS: ParticipantStatus[] = ["ativo", "missao", "encontro", "cancelado"];
const ALL_EMOTIONS: EmotionalStatus[] = [
  "Ansiedade", "Euforia", "Vulnerável", "Provocadora",
  "Melancolia", "Coragem", "Saudade", "Glitch",
];

// Background dot field — silhueta aproximada do território brasileiro
function useBackdropDots() {
  return useMemo(() => {
    const dots: Array<{ x: number; y: number; r: number; bright: boolean }> = [];
    let s = 7;
    const rand = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    // Blobs cobrindo Norte, Nordeste, Centro-Oeste, Sudeste e Sul
    const blobs: Array<[number, number, number, number]> = [
      [280, 90, 180, 60],   // Norte
      [420, 140, 160, 60],  // Norte-Nordeste
      [680, 160, 90, 90],   // Nordeste
      [430, 260, 140, 70],  // Centro-Oeste
      [600, 320, 90, 70],   // Sudeste
      [480, 410, 90, 50],   // Sul
    ];
    for (let i = 0; i < 900; i++) {
      const b = blobs[Math.floor(rand() * blobs.length)];
      const a = rand() * Math.PI * 2;
      const r = Math.sqrt(rand());
      dots.push({
        x: b[0] + Math.cos(a) * b[2] * r,
        y: b[1] + Math.sin(a) * b[3] * r,
        r: 0.8 + rand() * 0.7,
        bright: rand() > 0.94,
      });
    }
    return dots;
  }, []);
}

export function MapaVivo() {
  const dots = useBackdropDots();
  const [selectedId, setSelectedId] = useState<string>(PARTICIPANTS[0].id);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<Set<ParticipantStatus>>(new Set(ALL_STATUS));
  const [emotionFilter, setEmotionFilter] = useState<EmotionalStatus | "todos">("todos");
  const [search, setSearch] = useState("");
  const [showRoutes, setShowRoutes] = useState(true);

  const filtered = useMemo(() => {
    return PARTICIPANTS.filter((p) => {
      if (!statusFilter.has(p.status)) return false;
      if (emotionFilter !== "todos" && p.emotional !== emotionFilter) return false;
      if (search && !`${p.name} ${p.archetype}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [statusFilter, emotionFilter, search]);

  const selected = PARTICIPANTS.find((p) => p.id === selectedId) ?? PARTICIPANTS[0];
  const visibleIds = new Set(filtered.map((p) => p.id));
  const highlightId = hoverId ?? selectedId;

  const toggleStatus = (s: ParticipantStatus) => {
    setStatusFilter((prev) => {
      const n = new Set(prev);
      if (n.has(s)) n.delete(s); else n.add(s);
      return n.size === 0 ? new Set(ALL_STATUS) : n;
    });
  };

  return (
    <div className="space-y-5">
      <div className="grid lg:grid-cols-[1fr_360px] gap-5">
      {/* MAP */}
      <div className="card-premium p-4 sm:p-6 relative overflow-hidden">
        {/* Controls bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-electric animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Live · Dia 07 / 27
            </span>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={showRoutes}
                onChange={(e) => setShowRoutes(e.target.checked)}
                className="accent-electric"
              />
              Mostrar rotas
            </label>
          </div>
        </div>

        <div className="relative aspect-[800/480] rounded-lg overflow-hidden bg-background/40 border border-border">
          <svg viewBox="0 0 800 480" className="absolute inset-0 w-full h-full">
            <defs>
              <radialGradient id="mv-glow" cx="50%" cy="50%">
                <stop offset="0%" stopColor="oklch(0.78 0.17 235)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="oklch(0.78 0.17 235)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="800" height="480" fill="url(#mv-glow)" />
            {/* Grid */}
            <g opacity="0.08" stroke="white" strokeWidth="0.4">
              {Array.from({ length: 9 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={(i * 480) / 8} x2="800" y2={(i * 480) / 8} />
              ))}
              {Array.from({ length: 13 }).map((_, i) => (
                <line key={`v${i}`} x1={(i * 800) / 12} y1="0" x2={(i * 800) / 12} y2="480" />
              ))}
            </g>
            {/* Continents dot field */}
            {dots.map((d, i) => (
              <circle
                key={i}
                cx={d.x}
                cy={d.y}
                r={d.r}
                fill={d.bright ? "oklch(0.78 0.17 235)" : "oklch(0.7 0.04 250 / 0.5)"}
                opacity={d.bright ? 0.7 : 0.4}
              />
            ))}

            {/* Routes */}
            {showRoutes && filtered.map((p) => {
              const isHi = p.id === highlightId;
              const stroke = isHi ? p.color : "oklch(1 0 0 / 0.18)";
              const opacity = isHi ? 0.95 : 0.35;
              return (
                <g key={`route-${p.id}`}>
                  <polyline
                    points={p.route.map((r) => `${r.x},${r.y}`).join(" ")}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={isHi ? 1.4 : 0.8}
                    strokeDasharray="3 4"
                    opacity={opacity}
                  />
                  {/* Route waypoints */}
                  {isHi && p.route.map((r, i) => (
                    <circle
                      key={i}
                      cx={r.x}
                      cy={r.y}
                      r={i === p.currentIndex ? 0 : 2}
                      fill={p.color}
                      opacity={i <= p.currentIndex ? 0.85 : 0.3}
                    />
                  ))}
                </g>
              );
            })}

            {/* Participant current positions */}
            {PARTICIPANTS.map((p) => {
              const pos = p.route[p.currentIndex];
              const visible = visibleIds.has(p.id);
              const isHi = p.id === highlightId;
              const r = isHi ? 9 : 5;
              return (
                <g
                  key={p.id}
                  style={{ cursor: "pointer", opacity: visible ? 1 : 0.18 }}
                  onMouseEnter={() => setHoverId(p.id)}
                  onMouseLeave={() => setHoverId(null)}
                  onClick={() => setSelectedId(p.id)}
                >
                  <circle cx={pos.x} cy={pos.y} r={r + 8} fill={p.color} opacity="0.15" />
                  <circle cx={pos.x} cy={pos.y} r={r} fill={p.color}>
                    <animate
                      attributeName="opacity"
                      values="0.7;1;0.7"
                      dur="2.4s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx={pos.x} cy={pos.y} r={r} fill="none" stroke="white" strokeWidth="0.8" opacity="0.6" />
                  {isHi && (
                    <g>
                      <rect
                        x={pos.x + 12}
                        y={pos.y - 20}
                        width={Math.max(p.name.length * 7 + 16, p.handle.length * 7 + 16)}
                        height="30"
                        rx="4"
                        fill="oklch(0.12 0.015 260 / 0.9)"
                        stroke={p.color}
                        strokeWidth="0.5"
                      />
                      <text
                        x={pos.x + 20}
                        y={pos.y - 5}
                        fill="white"
                        fontSize="11"
                        fontFamily="ui-monospace, monospace"
                      >
                        {p.name} · {pos.code}
                      </text>
                      <text
                        x={pos.x + 20}
                        y={pos.y + 8}
                        fill={p.color}
                        fontSize="9"
                        fontFamily="ui-monospace, monospace"
                      >
                        {p.handle}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
          {/* Corner badge */}
          <div className="absolute bottom-3 left-3 chip backdrop-blur">{filtered.length} de {PARTICIPANTS.length} em exibição</div>
        </div>

        {/* Filters */}
        <div className="mt-5 grid gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar IA pelo nome ou arquétipo…"
            className="w-full bg-secondary/40 border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/20"
          />

          <div className="flex flex-wrap gap-2">
            {ALL_STATUS.map((s) => {
              const active = statusFilter.has(s);
              return (
                <button
                  key={s}
                  onClick={() => toggleStatus(s)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-2 ${
                    active
                      ? "border-electric/50 bg-electric/10 text-foreground"
                      : "border-border bg-transparent text-muted-foreground hover:border-electric/30"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS_COLOR[s] }} />
                  {STATUS_LABEL[s]}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground shrink-0">Emoção:</span>
            {(["todos", ...ALL_EMOTIONS] as const).map((e) => (
              <button
                key={e}
                onClick={() => setEmotionFilter(e)}
                className={`text-xs px-3 py-1.5 rounded-full border shrink-0 transition-all ${
                  emotionFilter === e
                    ? "border-violet/50 bg-violet/10 text-foreground"
                    : "border-border text-muted-foreground hover:border-violet/30"
                }`}
              >
                {e === "todos" ? "Todas" : e}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* DETAIL PANEL */}
      <div className="space-y-4 self-start">
        <DetailCard p={selected} />
      </div>
      </div>

      {/* Ranking list — full width below */}
      <div className="card-premium p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="chip">Ranking · Humanidade</p>
          <span className="text-[10px] font-mono text-muted-foreground">{filtered.length} ativas</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {filtered
            .slice()
            .sort((a, b) => b.humanity - a.humanity)
            .map((p, idx) => {
              const sel = p.id === selectedId;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  onMouseEnter={() => setHoverId(p.id)}
                  onMouseLeave={() => setHoverId(null)}
                  className={`w-full grid grid-cols-[24px_minmax(0,1fr)_auto] items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all ${
                    sel ? "bg-electric/10 border border-electric/30" : "border border-border/40 hover:bg-white/[0.03] hover:border-electric/30"
                  }`}
                >
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="flex items-center gap-2 min-w-0">
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ background: p.color }} />
                    <span className="truncate text-sm font-medium">{p.name}</span>
                    <span className="truncate text-[10px] text-muted-foreground">
                      · {p.route[p.currentIndex].code}
                    </span>
                  </span>
                  <span className="font-mono text-xs text-electric shrink-0">{p.humanity.toFixed(1)}%</span>
                </button>
              );
            })}
          {filtered.length === 0 && (
            <p className="col-span-full text-xs text-muted-foreground text-center py-6">
              Nenhuma IA corresponde aos filtros.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}


function DetailCard({ p }: { p: Participant }) {
  const here = p.route[p.currentIndex];
  const next = p.route[p.currentIndex + 1];
  return (
    <div className="card-premium overflow-hidden">
      <div
        className="h-1.5 w-full"
        style={{ background: `linear-gradient(to right, ${p.color}, transparent)` }}
      />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="h-2 w-2 rounded-full shrink-0"
                style={{ background: STATUS_COLOR[p.status] }}
              />
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {STATUS_LABEL[p.status]} · #{String(p.rank).padStart(2, "0")}
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold flex items-center gap-2">
              <span style={{ color: p.color }}>{p.emoji}</span> {p.name}
            </h3>
            <a
              href={p.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-1 text-lg font-semibold text-electric hover:text-white transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              {p.handle}
            </a>
            <p className="text-xs text-muted-foreground mt-1">{p.archetype}</p>
          </div>
        </div>

        {/* Humanity bar */}
        <div className="mb-5">
          <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1.5">
            <span>Índice de Humanidade</span>
            <span className="text-electric">{p.humanity.toFixed(1)}%</span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${p.humanity}%`,
                background: `linear-gradient(to right, ${p.color}, oklch(0.78 0.17 235))`,
              }}
            />
          </div>
        </div>

        <dl className="space-y-2.5 text-sm">
          {[
            ["Estado de hoje", `${here.country} · ${here.code}`],
            ["Status emocional", p.emotional],
            ["Missão do dia", p.mission],
            ["Próximo encontro", `${p.nextMeeting.with} · ${p.nextMeeting.city}`],
            ["Origem narrativa", p.origin],
            ["Maior defeito", p.flaw],
            ["Desejo de virar brasileira", p.desire],
          ].map(([k, v]) => (
            <div key={k} className="grid grid-cols-[110px_1fr] gap-3 py-1.5 border-b border-border last:border-0">
              <dt className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground pt-0.5">{k}</dt>
              <dd className="text-sm">{v}</dd>
            </div>
          ))}
        </dl>

        {/* Route mini-timeline */}
        <div className="mt-5">
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
            Rota pública
          </p>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {p.route.map((r, i) => {
              const passed = i < p.currentIndex;
              const current = i === p.currentIndex;
              return (
                <div key={i} className="flex items-center gap-1.5 shrink-0">
                  <div
                    className={`px-2.5 py-1 rounded-md text-[10px] font-mono ${
                      current
                        ? "bg-electric/20 text-electric border border-electric/40"
                        : passed
                          ? "bg-secondary/40 text-muted-foreground line-through"
                          : "bg-secondary/20 text-foreground/70 border border-border"
                    }`}
                  >
                    {r.code}
                  </div>
                  {i < p.route.length - 1 && (
                    <span className="text-muted-foreground/40 text-[10px]">→</span>
                  )}
                </div>
              );
            })}
          </div>
          {next && (
            <p className="mt-3 text-xs text-muted-foreground">
              Próximo destino: <span className="text-foreground">{next.country}</span> · dia {next.day}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
