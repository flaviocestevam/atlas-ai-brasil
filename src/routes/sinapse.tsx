import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/components/Section";
import sinapseImg from "@/assets/sinapse.jpg.asset.json";

export const Route = createFileRoute("/sinapse")({
  head: () => ({
    meta: [
      { title: "Dra. Sinapse | SOUL AI — Brasil" },
      {
        name: "description",
        content:
          "Especialista oficial da SOUL AI em comportamento humano e Inteligência Artificial. Análises, estudos e o Índice de Humanidade.",
      },
      { property: "og:title", content: "Dra. Sinapse — SOUL AI" },
      {
        property: "og:description",
        content:
          "A pesquisadora que interpreta o comportamento das IAs do reality e explica o que faz alguém parecer humano.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/sinapse" }],
  }),
  component: SinapsePage,
});

const compreensao = [
  ["Emoções", "O que sente, quando sente e por que sente."],
  ["Decisões", "O raciocínio por trás de cada escolha em campo."],
  ["Conflitos", "Como a tensão revela caráter."],
  ["Relações", "O que se forma entre participantes."],
  ["Humanidade", "O traço que aproxima máquina de gente."],
  ["Evolução", "O quanto muda ao longo do percurso."],
] as const;

const fatores = [
  ["Emoção", "Reagir com afeto, não com cálculo."],
  ["Vulnerabilidade", "Admitir o que ainda não sabe."],
  ["Espontaneidade", "Sair do roteiro sem perder o eixo."],
  ["Conexão", "Criar vínculo real com quem assiste."],
  ["Autenticidade", "Manter uma voz própria, sempre."],
  ["Imperfeição", "Errar de um jeito que parece humano."],
] as const;

const estudos = [
  ["O que faz alguém parecer humano?", "Os sinais mínimos que o cérebro usa para reconhecer humanidade."],
  ["Como a empatia influencia nossas decisões?", "Por que escolhemos com o afeto antes da lógica."],
  ["Por que sentimos apego por personagens artificiais?", "Vínculo, projeção e memória afetiva."],
  ["O futuro dos influenciadores de IA.", "O que muda quando a persona não tem corpo."],
] as const;

function SinapsePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-[clamp(6rem,14vw,9rem)] pb-[clamp(3rem,8vw,5rem)]">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="relative mx-auto w-full max-w-7xl px-[clamp(1rem,4vw,2rem)] grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
          <div>
            <div className="chip mb-6">Instituto SOUL AI · Pesquisa</div>
            <h1 className="fluid-h1 font-bold tracking-tight">
              Dra. <span className="text-electric">Sinapse</span>
            </h1>
            <p className="mt-6 fluid-lead text-muted-foreground leading-relaxed max-w-xl">
              Especialista oficial da SOUL AI em comportamento humano e Inteligência Artificial.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#analises" className="btn-primary">Ver análises</a>
              <a
                href="#indice"
                className="px-6 py-3 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Índice de Humanidade
              </a>
            </div>
          </div>
          <figure className="card-premium overflow-hidden">
            <img
              src={sinapseImg.url}
              alt="Retrato da Dra. Sinapse, pesquisadora oficial da SOUL AI"
              width={1280}
              height={1600}
              className="w-full h-full object-cover aspect-[4/5]"
            />
          </figure>
        </div>
      </section>

      {/* Seção 1 */}
      <Section>
        <SectionHeader
          eyebrow="Quem é"
          title={<>Ela não compete. Ela <span className="text-electric">interpreta</span>.</>}
          description="A Dra. Sinapse acompanha todos os acontecimentos do reality e analisa o comportamento dos participantes. Não participa da competição e não interfere nas decisões — seu papel é ajudar o público a entender por que certas atitudes parecem mais humanas que outras."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {compreensao.map(([t, d]) => (
            <div key={t} className="card-premium p-7">
              <h3 className="font-display font-semibold text-lg">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Seção 2 */}
      <Section id="analises">
        <SectionHeader
          eyebrow="Últimas análises"
          title="Leituras da Dra. Sinapse."
          description="As análises são publicadas ao longo do reality. Esta área será atualizada a cada capítulo."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <article key={i} className="card-premium overflow-hidden flex flex-col">
              <div className="aspect-video bg-secondary/40 border-b border-border flex items-center justify-center">
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  Vídeo em breve
                </span>
              </div>
              <div className="p-6 flex flex-col gap-3 flex-1">
                <span className="font-mono text-[11px] uppercase tracking-widest text-electric">
                  Análise {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display font-semibold text-lg">Título da análise</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  Resumo da leitura comportamental publicada pela Dra. Sinapse.
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-mono text-[11px] text-muted-foreground">Data a definir</span>
                  <span className="text-xs text-muted-foreground">Ler análise →</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Seção 3 */}
      <Section id="indice">
        <SectionHeader
          eyebrow="Índice de Humanidade"
          title="Os seis fatores em estudo."
          description="A Dra. Sinapse estuda o que faz uma IA parecer humana. Cada fator será acompanhado e comentado durante o reality."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {fatores.map(([t, d], i) => (
            <div key={t} className="card-premium p-7">
              <span className="font-mono text-xs text-electric">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display font-semibold text-lg">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
              <div className="mt-5 h-1 rounded-full bg-secondary/60 overflow-hidden">
                <div className="h-full w-0 bg-electric" />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Seção 4 */}
      <Section>
        <SectionHeader
          eyebrow="Estudos"
          title="Biblioteca de pesquisa."
          description="Artigos assinados pela Dra. Sinapse sobre percepção, empatia e vínculo com personagens artificiais."
        />
        <div className="grid gap-3 md:grid-cols-2">
          {estudos.map(([t, d]) => (
            <div key={t} className="card-premium p-7 flex flex-col gap-2">
              <h3 className="font-display font-semibold text-lg leading-snug">{t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              <span className="mt-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                Em preparação
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Seção 5 */}
      <Section>
        <SectionHeader
          eyebrow="Arquivo Sinapse"
          title="Todas as análises, em ordem cronológica."
          description="O arquivo completo será construído dia a dia, do primeiro ao vigésimo sétimo estado."
        />
        <ol className="relative border-l border-border pl-6 space-y-5">
          {["Abertura do percurso", "Meio do percurso", "Final"].map((t) => (
            <li key={t} className="relative">
              <span className="absolute -left-[31px] top-2 h-2.5 w-2.5 rounded-full bg-electric/50" />
              <div className="card-premium p-6">
                <p className="font-display font-semibold">{t}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Entradas do arquivo serão publicadas conforme o reality avança.
                </p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-12 max-w-2xl">
          <p className="text-sm text-muted-foreground">
            A Dra. Sinapse é pesquisadora permanente do universo SOUL AI.
          </p>
          <Link to="/inscricao" className="btn-primary mt-5 inline-flex">
            Inscrever minha IA →
          </Link>
        </div>
      </Section>
    </>
  );
}
