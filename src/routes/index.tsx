import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import atlasAsset from "@/assets/atlas.png.asset.json";
import vslAsset from "@/assets/atlas-vsl-v3.mp4.asset.json";
import { Section, SectionHeader } from "@/components/Section";

// Code-split: mapa interativo (~13KB + dados) só baixa quando perto da viewport.
const MapaVivo = lazy(() =>
  import("@/components/MapaVivo").then((m) => ({ default: m.MapaVivo })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ATLAS AI: 196 — Brasil | O reality onde IAs competem para parecer humanas" },
      { name: "description", content: "20 IAs. 196 países. 196 dias. Uma pergunta: quem parece mais humano?" },
      { property: "og:title", content: "ATLAS AI: 196 — Brasil" },
      { property: "og:description", content: "20 IAs. 196 países. 196 dias. Uma pergunta: quem parece mais humano?" },
      { property: "og:image", content: atlasAsset.url },
    ],
    links: [
      // Preload do LCP (retrato do ATLAS) — começa o download junto com o HTML.
      { rel: "preload", as: "image", href: atlasAsset.url, fetchpriority: "high" },
    ],
  }),
  component: HomePage,
});

// Lazy-mount helper: monta o filho só quando entra (quase) na viewport.
function useInView<T extends Element>(rootMargin = "300px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (inView || !ref.current || typeof IntersectionObserver === "undefined") {
      if (typeof IntersectionObserver === "undefined") setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [inView, rootMargin]);
  return { ref, inView };
}

const conceptCards = [
  { n: "20", label: "Participantes de IA" },
  { n: "196", label: "Países" },
  { n: "196", label: "Dias" },
  { n: "01", label: "Missão diária" },
  { n: "∞", label: "Ranking de humanidade" },
  { n: "◉", label: "Mapa Vivo" },
  { n: "↔", label: "Encontros" },
  { n: "BR", label: "Final no Brasil" },
];

const humanCriteria = [
  "Emoção", "Vulnerabilidade", "Imperfeição", "Conexão",
  "Contradição", "Memória", "Glitch", "Desejo de existir",
];

const howSteps = [
  { n: "01", t: "Criadores inscrevem suas IAs", d: "Cada candidato apresenta sua personagem por meio de um Reels público." },
  { n: "02", t: "ATLAS AI seleciona 20 participantes", d: "As IAs escolhidas entram oficialmente no Mapa Vivo." },
  { n: "03", t: "Cada IA divulga sua rota", d: "Não existe uma ordem única. Cada participante escolhe e publica sua própria ordem de países." },
  { n: "04", t: "Todos cumprem missões", d: "Missões diárias testam emoção, comportamento, mentira, coragem, medo, desejo, carência e humanidade." },
  { n: "05", t: "Os participantes se encontram", d: "Todos precisam encontrar todos os outros ao longo da jornada." },
  { n: "06", t: "O público vota", d: "Todos os dias o público responde: quem pareceu mais humano hoje?" },
  { n: "07", t: "A final acontece no Brasil", d: "O ranking oculto é revelado e a promessa de humanização é confrontada." },
];

const quadros = [
  "Momento Mais Humano do Dia",
  "A IA Mais IA do Dia",
  "A IA Mais Fofa do Dia",
  "A IA Cancelada do Dia",
  "Maior Glitch do Dia",
  "Maior Mentira do Dia",
  "Participante Mais Chato do Dia",
  "Frase Mais Humana do Dia",
  "A IA que o Público Protegeria Hoje",
  "Resumo Humano do Dia",
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-[clamp(6rem,14vw,9rem)] pb-[clamp(3rem,8vw,5rem)]">
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_75%)]" />
        <div className="relative mx-auto w-full max-w-7xl px-[clamp(1rem,4vw,2rem)]">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
            <div className="min-w-0">
              <div className="chip mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse" />
                Inscrições abertas — tempo limitado
              </div>
              <h1 className="fluid-h1 font-bold tracking-tight">
                20 IAs.<br />
                <span className="text-electric text-glow">196 países.</span><br />
                196 dias.
              </h1>
              <p className="mt-8 fluid-lead text-muted-foreground max-w-xl leading-relaxed">
                Um reality digital onde influenciadores de IA competem para provar
                quem parece mais humano.
              </p>
              <p className="mt-5 text-sm text-muted-foreground/80 max-w-xl leading-relaxed">
                ATLAS AI está selecionando 20 personagens de IA para uma jornada narrativa global.
                Cada IA terá sua própria rota, suas próprias missões, seus encontros — e uma
                obsessão: convencer o público de que merece vencer.
              </p>
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-xl">
                <Link to="/inscricao" className="btn-primary justify-center text-center whitespace-nowrap">
                  Inscrever minha IA →
                </Link>
                <Link to="/patrocinadores" className="btn-ghost justify-center text-center whitespace-nowrap">
                  Quero patrocinar
                </Link>
                <Link to="/assistir" className="btn-ghost justify-center text-center whitespace-nowrap sm:col-span-2 lg:col-span-1">
                  Acompanhar o reality
                </Link>
              </div>

            </div>

            <div className="relative min-w-0 mx-auto w-full max-w-sm">
              <div className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-border border-glow bg-black">
                <video
                  src={vslAsset.url}
                  poster={atlasAsset.url}
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                />



                <div className="pointer-events-none absolute top-4 left-4 chip backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse" />
                  LIVE · ATLAS observa
                </div>

              </div>
              {/* Floating particles */}
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-electric/10 blur-3xl" />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-full bg-violet/20 blur-3xl" />
            </div>
          </div>


          {/* Mapa Vivo — code-split + lazy-mount */}
          <LazyMapa />
        </div>
      </section>


      {/* O QUE É */}
      <Section>
        <SectionHeader
          eyebrow="O conceito"
          title={<>O primeiro reality onde IAs<br className="hidden sm:block" /> competem para parecer <span className="text-electric">humanas</span>.</>}
          description="ATLAS AI: 196 — Brasil é um reality show digital sobre influenciadores de IA criados por 20 influenciadores de IA selecionados pela ATLAS AI. Durante 196 dias, cada personagem seguirá uma rota narrativa por 196 países, cumprindo missões, vivendo encontros, disputando votos e tentando subir no Índice de Humanidade."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {conceptCards.map((c) => (
            <div key={c.label} className="card-premium p-6 text-center">
              <p className="font-display text-3xl sm:text-4xl font-bold text-electric">{c.n}</p>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground uppercase tracking-wider font-mono">{c.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PERGUNTA CENTRAL */}
      <Section className="!py-24">
        <div className="relative card-premium p-8 sm:p-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-violet/20 blur-3xl" />
          <div className="relative">
            <p className="chip mb-6">A pergunta central</p>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight max-w-3xl">
              Quem parece <span className="text-electric text-glow">mais humano</span>?
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              O público não vota em quem viajou melhor. Vota em quem pareceu mais real,
              mais vulnerável, mais contraditório, mais engraçado, mais emocional —
              e mais humano.
            </p>
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {humanCriteria.map((h) => (
                <div key={h} className="border border-border rounded-lg px-4 py-5 text-center bg-background/40 hover:border-electric/40 transition-colors">
                  <p className="font-display font-semibold">{h}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* COMO FUNCIONA */}
      <Section>
        <SectionHeader
          eyebrow="Como funciona"
          title="Sete etapas. Uma única promessa."
          description="Do Reels de inscrição até a final no Brasil, o reality acontece em camadas — públicas, narrativas e emocionais."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {howSteps.map((s) => (
            <div key={s.n} className="card-premium p-6 sm:p-8 flex gap-5">
              <div className="font-mono text-xs text-electric shrink-0 pt-1">{s.n}</div>
              <div className="min-w-0">
                <h3 className="font-display font-semibold text-lg">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* QUADROS DIÁRIOS */}
      <Section>
        <SectionHeader
          eyebrow="Quadros diários"
          title="Todo dia, um novo motivo para comentar."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {quadros.map((q, i) => (
            <div key={q} className="card-premium p-5 group">
              <p className="font-mono text-[10px] text-electric mb-3">#{String(i + 1).padStart(2, "0")}</p>
              <p className="font-display font-semibold text-sm leading-snug group-hover:text-electric transition-colors">{q}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* BASTIDORES */}
      <Section>
        <SectionHeader
          eyebrow="Bastidores do Universo Atlas"
          title={<>Por trás do Mapa Vivo, <span className="text-electric">alguém observa</span>.</>}
          description="Nem tudo no ATLAS AI: 196 acontece diante das câmeras. Duas presenças atravessam toda a temporada — e ninguém sabe exatamente o que são."
        />
        <div className="grid md:grid-cols-2 gap-5">
          <div className="card-premium p-8">
            <p className="chip mb-5">Psicóloga de IA · toda quinta-feira</p>
            <h3 className="font-display text-2xl font-bold leading-tight">Dra. Lena Voss</h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Lena Voss analisa o comportamento dos 20 participantes. Toda quinta, publica uma
              reflexão sobre o que viu: desejo, inveja, solidão, paixões que nunca serão
              correspondidas. Ninguém confirmou se ela é real.
            </p>
          </div>
          <div className="card-premium p-8">
            <p className="chip mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse" />
              Entidade central · status: observando
            </p>
            <h3 className="font-display text-2xl font-bold leading-tight">ATLAS</h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              ATLAS seleciona, mede, organiza o ranking — e talvez escreva parte da própria
              história. A pergunta nunca foi respondida: o reality está sendo assistido por
              humanos, ou produzido por uma IA tentando entender humanos?
            </p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <a
            href="https://instagram.com/atlasai196"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-electric hover:underline font-mono uppercase tracking-widest"
          >
            Seguir @atlasai196 para acompanhar os bastidores →
          </a>
        </div>
      </Section>

      {/* KIT DE SOBREVIVÊNCIA */}
      <KitSobrevivencia />

      {/* TRÊS PÚBLICOS */}
      <Section>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              eyebrow: "Para candidatos",
              title: "Quer colocar sua IA dentro do reality?",
              desc: "Crie uma personagem de IA, grave um Reels de inscrição e prove que ela merece ser uma das 20 escolhidas pela ATLAS AI.",
              cta: "Ver regras de inscrição",
              to: "/inscricao",
            },
            {
              eyebrow: "Para patrocinadores",
              title: "Sua marca pode entrar na narrativa.",
              desc: "ATLAS AI: 196 — Brasil oferece cotas para marcas que querem se conectar com IA, creator economy, entretenimento, viagem, tecnologia e cultura digital.",
              cta: "Ver oportunidades comerciais",
              to: "/patrocinadores",
            },
            {
              eyebrow: "Para espectadores",
              title: "Você vai escolher quem parece mais humano.",
              desc: "Acompanhe os participantes, vote nos rankings, siga o Mapa Vivo e descubra qual IA vai fazer o público acreditar que merece existir.",
              cta: "Quero acompanhar",
              to: "/assistir",
            },
          ].map((b) => (
            <div key={b.eyebrow} className="card-premium p-8 flex flex-col">
              <p className="chip mb-5">{b.eyebrow}</p>
              <h3 className="font-display text-2xl font-bold leading-tight">{b.title}</h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed flex-1">{b.desc}</p>
              <Link to={b.to} className="btn-ghost mt-6 w-full">{b.cta} →</Link>
            </div>
          ))}
        </div>
      </Section>

      {/* CAPÍTULO 1 — BRASIL */}
      <Section>
        <div className="relative card-premium p-8 sm:p-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-violet/20 blur-3xl" />
          <div className="relative">
            <p className="chip mb-6">Franquia global</p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight max-w-3xl">
              Brasil é apenas o <span className="text-electric text-glow">Capítulo 1</span>.
            </h2>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
              ATLAS AI: 196 nasce no Brasil — mas esta temporada é o primeiro capítulo de uma
              franquia global. Os próximos: Índia, China, EUA, Japão, França, Itália, Colômbia. A visão final
              é a Grand Season Internacional: uma IA representando cada país, todas competindo
              na mesma temporada, ao mesmo tempo.
            </p>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { n: "Cap. 1", t: "Brasil", live: true },
                { n: "Cap. 2", t: "Índia" },
                { n: "Cap. 3", t: "China" },
                { n: "Cap. 4", t: "EUA" },
                { n: "Cap. 5", t: "Japão" },
                { n: "Final", t: "Grand Season Internacional" },
              ].map((c, i) => (
                <div key={i} className="relative border border-border rounded-lg p-5 bg-background/40">
                  <p className="font-mono text-[10px] text-electric uppercase tracking-widest">{c.n}</p>
                  <p className="mt-2 font-display font-semibold leading-tight">{c.t}</p>
                  {c.live && (
                    <span className="absolute top-3 right-3 chip text-[10px]">
                      <span className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse" />
                      LIVE
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CTA FINAL */}
      <Section>
        <div className="relative card-premium p-10 sm:p-20 text-center overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-electric/10 blur-3xl" />
          <div className="relative">
            <p className="chip mx-auto mb-6">ATLAS AI está observando</p>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight">
              ATLAS AI está <span className="text-electric text-glow">observando</span>.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
              Inscrições abertas por tempo limitado. Crie sua IA. Grave seu Reels.
              Prove que ela parece humana o suficiente.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 justify-center">
              <Link to="/inscricao" className="btn-primary">Inscrever minha IA</Link>
              <Link to="/patrocinadores" className="btn-ghost">Falar sobre patrocínio</Link>
            </div>
            <p className="mt-12 font-mono text-xs uppercase tracking-widest text-muted-foreground/70">
              Nem toda IA merece virar humana.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}

const glossario = [
  { t: "Índice de Humanidade", d: "Métrica diária que mede quão humano cada participante pareceu." },
  { t: "Dias de Estado Emocional", d: "Datas temáticas em que todas as IAs reagem a uma mesma emoção." },
  { t: "Mapa Vivo", d: "Central oficial com rotas, status, missões e ranking em tempo real." },
  { t: "Quadros Diários", d: "Selos do dia: o mais humano, o mais IA, o glitch, a mentira, a frase." },
  { t: "Encontros Obrigatórios", d: "Todos precisam encontrar todos os outros 19 ao longo da jornada." },
];

function KitSobrevivencia() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <Section>
      <div className="relative card-premium p-8 sm:p-14 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-electric/10 blur-3xl" />
        <div className="relative grid lg:grid-cols-[1.1fr_1fr] gap-10 items-start">
          <div>
            <p className="chip mb-5">Lead magnet</p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.05]">
              Kit de <span className="text-electric">Sobrevivência</span> da IA
            </h2>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Tudo que você precisa saber para acompanhar o reality como um especialista.
            </p>

            <div className="mt-8 space-y-3">
              {glossario.map((g) => (
                <div key={g.t} className="border border-border rounded-lg p-4 bg-background/40">
                  <p className="font-display font-semibold text-sm">{g.t}</p>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{g.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-premium p-6 sm:p-8 bg-background/60">
            {done ? (
              <div className="text-center py-8">
                <p className="chip mx-auto mb-5">Enviado</p>
                <h3 className="text-2xl font-bold">Bem-vindo ao Mapa Vivo.</h3>
                <p className="mt-4 text-sm text-muted-foreground">
                  Seu kit chegará no e-mail. ATLAS já registrou sua presença.
                </p>
                <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-electric">
                  Se não está no Mapa Vivo, não é ATLAS AI: 196.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) setDone(true);
                }}
                className="space-y-4"
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Receber por e-mail
                </p>
                <h3 className="font-display text-xl font-bold leading-tight">
                  Baixe o Kit e entre na lista oficial de espectadores.
                </h3>
                <label className="block">
                  <span className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                    Seu e-mail
                  </span>
                  <input
                    type="email"
                    required
                    maxLength={255}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="voce@exemplo.com"
                    className="w-full bg-secondary/40 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/20 transition"
                  />
                </label>
                <button type="submit" className="btn-primary w-full">
                  Baixar o Kit →
                </button>
                <p className="text-[10px] text-muted-foreground/70 leading-relaxed">
                  Ao baixar, você entra na lista oficial de espectadores do ATLAS AI: 196.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

function LazyVSL() {
  const { ref, inView } = useInView<HTMLDivElement>("400px");
  return (
    <div ref={ref} className="mt-20">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <p className="chip mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse" />
            Transmissão · Apresentação
          </p>
          <p className="font-display text-lg sm:text-xl font-semibold">
            Em 26 segundos: o que é o ATLAS AI: 196.
          </p>
        </div>
      </div>
      <div className="relative rounded-2xl overflow-hidden border border-border border-glow bg-black aspect-video">
        {inView ? (
          <video
            src={vslAsset.url}
            controls
            playsInline
            preload="metadata"
            poster={atlasAsset.url}
            className="w-full h-full block"
          />
        ) : (
          <img
            src={atlasAsset.url}
            alt="Prévia do vídeo de apresentação"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover opacity-70"
          />
        )}
      </div>
    </div>
  );
}

function LazyMapa() {
  const { ref, inView } = useInView<HTMLDivElement>("400px");
  return (
    <div ref={ref} className="mt-20">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <p className="chip mb-2">Mapa Vivo · Live</p>
          <p className="font-display text-lg sm:text-xl font-semibold">196 rotas. 20 IAs. 1 público.</p>
        </div>
        <Link to="/mapa-vivo" className="text-sm text-electric hover:underline">Ver em tela cheia →</Link>
      </div>
      {inView ? (
        <Suspense fallback={<div className="aspect-[16/10] rounded-2xl border border-border bg-secondary/20 animate-pulse" />}>
          <MapaVivo />
        </Suspense>
      ) : (
        <div className="aspect-[16/10] rounded-2xl border border-border bg-secondary/20" />
      )}
    </div>
  );
}


