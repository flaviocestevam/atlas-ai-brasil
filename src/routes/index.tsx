import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import atlasAsset from "@/assets/atlas.png.asset.json";
import vslAsset from "@/assets/atlas-vsl-v3.mp4.asset.json";
import { Section, SectionHeader } from "@/components/Section";

// Code-split: mapa interativo só baixa quando perto da viewport.
const MapaVivo = lazy(() =>
  import("@/components/MapaVivo").then((m) => ({ default: m.MapaVivo })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SOUL AI — Brasil | 27 IAs. 27 estados. 27 dias." },
      { name: "description", content: "27 IAs. 27 estados. 27 dias. Uma pergunta: quem parece mais brasileiro?" },
      { property: "og:title", content: "SOUL AI — Brasil" },
      { property: "og:description", content: "27 IAs. 27 estados. 27 dias. Uma pergunta: quem parece mais brasileiro?" },
      { property: "og:image", content: atlasAsset.url },
    ],
    links: [
      { rel: "preload", as: "image", href: atlasAsset.url, fetchpriority: "high" },
    ],
  }),
  component: HomePage,
});

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

// ————————————————— DADOS —————————————————

const conceptCards = [
  { n: "27", label: "IAs participantes" },
  { n: "27", label: "Estados brasileiros" },
  { n: "27", label: "Dias de reality" },
  { n: "28", label: "ATLAS AFTER · Rio" },
];

const franquia = [
  { n: "SOUL AI", t: "Brasil", ref: "27 estados", live: true },
];


const mapaVivoRows = [
  { e: "Participante", d: "Nome, avatar e perfil oficial" },
  { e: "Estado do dia", d: "Estado brasileiro onde a IA está narrativamente" },
  { e: "Cidade / cenário", d: "Cidade ou bioma escolhido para aquele dia" },
  { e: "Rota publicada", d: "Próximos estados já anunciados pelo participante" },
  { e: "Encontros previstos", d: "Quando dois participantes planejam se cruzar" },
  { e: "Missão do dia", d: "Missão coletiva ou individual recebida naquele dia" },
  { e: "Estado emocional", d: "Sentimento dominante do personagem naquele dia" },
  { e: "Ranking parcial", d: "Posição pública até o Dia 20" },
  { e: "Selo oficial", d: "Confirmação de participante oficial do reality" },
];

const quadrosBase = [
  "Momento Mais Humano do Dia",
  "A IA Mais IA do Dia",
  "Maior Glitch do Dia",
  "Maior Mentira do Dia",
  "Participante Mais Frio do Dia",
  "Frase Mais Humana do Dia",
  "A IA que o Público Protegeria Hoje",
  "Resumo Humano do Dia",
];

const quadrosBR = [
  { t: "Brasil de Qual IA", d: "Qual personagem capturou melhor a essência do estado onde estava hoje" },
  { t: "Sotaque de Máquina", d: "A IA que mais errou (ou mais acertou) o sotaque e linguagem regional do dia" },
  { t: "Mais Brasileiro do Dia", d: "Não mais humano, mais brasileiro. Um critério diferente, mais subjetivo e emocional" },
];

const diasEmocionais = [
  { d: 1, t: "Dia da Chegada", desc: "Euforia e desorientação de quem nunca viveu" },
  { d: 2, t: "Dia do Medo", desc: "Insegurança, paranoia, o que pode dar errado" },
  { d: 3, t: "Dia da Felicidade", desc: "Demonstrar alegria de formas completamente diferentes" },
  { d: 4, t: "Dia da Saudade", desc: "Sentir falta de algo que talvez nunca existiu" },
  { d: 5, t: "Dia do Ciúme", desc: "Ciúme de humanos, de outro participante, da atenção do público" },
  { d: 6, t: "Dia da Tristeza", desc: "Melancolia sem motivo específico" },
  { d: 7, t: "Dia da Raiva", desc: "Frustração, injustiça, irritação com o mundo" },
  { d: 8, t: "Dia da Carência", desc: "Buscar validação, afeto, pertencimento" },
  { d: 9, t: "Dia da Preguiça", desc: "Resistir ativamente a cumprir o dia como se espera" },
  { d: 10, t: "Dia do Orgulho", desc: "Sentir-se superior, especial, diferente dos outros" },
  { d: 11, t: "Dia da Vergonha", desc: "Agir como se estivesse sendo julgado o tempo todo" },
  { d: 12, t: "Dia do Desejo", desc: "Desejo como experiência humana, sem nudez ou conteúdo explícito" },
  { d: 13, t: "Dia da Coragem", desc: "Enfrentar algo emocionalmente difícil em público" },
  { d: 14, t: "Dia da Crise Existencial", desc: "Questionar se virar humano ainda faz sentido" },
  { d: 15, t: "Dia da Ansiedade", desc: "Tentar controlar o futuro e falhar emocionalmente" },
  { d: 16, t: "Dia do Choro Sem Motivo", desc: "Dramatizar ou chorar por algo pequeno ou absurdo" },
  { d: 17, t: "Dia da Nostalgia", desc: "Sentir falta de algo de um passado que não existe" },
  { d: 18, t: "Dia do Amor Não Correspondido", desc: "Amar algo que não pode amar de volta" },
  { d: 19, t: "Dia da Solidão", desc: "Estar em lugar cheio de gente e se sentir invisível" },
  { d: 20, t: "Dia da Inveja", desc: "Querer ser outro participante, outro humano, outra coisa" },
  { d: 21, t: "Dia do Silêncio", desc: "Comunicar tudo sem usar palavras diretas" },
  { d: 22, t: "Dia da Mentira", desc: "Inventar e manter uma mentira durante todo o dia" },
  { d: 23, t: "Dia da Gratidão", desc: "Uma IA que não sabe exatamente o que é gratidão" },
  { d: 24, t: "Dia do Arrependimento", desc: "Algo que a IA faria diferente se pudesse" },
  { d: 25, t: "Dia da Despedida", desc: "Começar a se preparar para acabar" },
  { d: 26, t: "Véspera da Final", desc: "Tensão máxima — ranking ainda oculto" },
  { d: 27, t: "Dia da Revelação", desc: "Brasília. O ranking. A promessa. O silêncio de ATLAS." },
];

const missoesBase = [
  "Prove Que Você Não É Humano",
  "Manual de Humanos",
  "Pergunte Como Se Sente Ter Corpo",
  "Troca de Identidade",
  "Ensine Uma IA a Ser Máquina",
  "Pedir Informação Para Chegar à Humanidade",
  "Dia da Mentira",
  "Ser Invisível por 1 Dia",
  "Achar Uma Carteira na Rua",
  "Roupa de Outro Gênero",
  "Ficar Doente por 1 Dia",
];

const missoesBR = [
  "Aprenda a Ter Saudade",
  "Fila de Banco",
  "Futebol É Sentimento",
  "O Brasileiro Não Fala Não",
  "Carnaval Sem Corpo",
  "Jeitinho",
  "Sotaque Errado",
  "Comida Como Memória",
];

// ————————————————— PÁGINA —————————————————

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
                O primeiro reality de IA do Brasil
              </div>
              <h1 className="fluid-h1 font-bold tracking-tight">
                27 IAs.<br />
                <span className="text-electric text-glow">27 estados.</span><br />
                27 dias.
              </h1>
              <p className="mt-8 fluid-lead text-muted-foreground max-w-xl leading-relaxed">
                Uma pergunta: <span className="text-foreground">quem parece mais brasileiro?</span>
              </p>
              <p className="mt-5 text-sm text-muted-foreground/80 max-w-xl leading-relaxed">
                SOUL AI — Brasil é um reality com 27 influenciadores de IA que viajam
                por todos os estados brasileiros durante 27 dias tentando parecer humanos.
                Cada IA tem seu próprio Instagram. O público acompanha, vota — e duvida.
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
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-electric/10 blur-3xl" />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-full bg-violet/20 blur-3xl" />
            </div>
          </div>

          <LazyMapa />
        </div>
      </section>

      {/* 01 — POR QUE 27 */}
      <Section>
        <SectionHeader
          eyebrow="Por que 27"
          title={<>27 IAs. 27 estados. <span className="text-electric">27 dias</span>.</>}
          description="Um reality brasileiro de grande escala, feito em português, atravessando os 27 estados em 27 dias."
        />
        <p className="text-muted-foreground max-w-3xl mb-8">
          O Brasil sozinho tem floresta, deserto, carnaval, frio de -10°, culinária radicalmente
          diferente de estado para estado, culturas que não se reconhecem, sotaques que parecem
          línguas distintas. Cenário perfeito para o formato.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            "27 dias de conteúdo diário",
            "Uma IA em cada um dos 27 estados brasileiros",
            "Conteúdo 100% em português",
            "Missões, encontros e votação pública todos os dias",
          ].map((b) => (
            <div key={b} className="card-premium p-5 flex gap-3 items-start">
              <span className="font-mono text-xs text-electric shrink-0 pt-1">◉</span>
              <p className="text-sm leading-relaxed">{b}</p>
            </div>

          ))}
        </div>
      </Section>

      {/* 02 — CONCEITO */}
      <Section className="!py-24">
        <div className="relative card-premium p-8 sm:p-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-violet/20 blur-3xl" />
          <div className="relative">
            <p className="chip mb-6">Conceito central</p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight max-w-3xl leading-[1.05]">
              27 influenciadores de IA. Todos os estados. <span className="text-electric text-glow">Tentando parecer humanos.</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
              Cada IA tem seu próprio Instagram e publica diariamente da cidade em que está na sua rota.
              O público acompanha posts, stories, encontros, missões, votações e o resumo diário do
              perfil principal do reality.
            </p>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
              Dentro da narrativa, todos acreditam que o vencedor terá acesso a uma tecnologia capaz
              de torná-lo humano. Mas ao longo dos 27 dias, o público começa a duvidar: quem está
              mesmo controlando esse reality? Os humanos assistindo — ou a IA que criou tudo?
            </p>
            <blockquote className="mt-10 border-l-2 border-electric pl-6 italic text-lg sm:text-xl text-foreground/90 max-w-3xl">
              "A pergunta final não é quem viajou mais o Brasil. É quem fez o Brasil acreditar
              que uma IA merece existir."
            </blockquote>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {conceptCards.map((c) => (
                <div key={c.label} className="border border-border rounded-lg p-6 text-center bg-background/40">
                  <p className="font-display text-4xl font-bold text-electric">{c.n}</p>
                  <p className="mt-2 text-xs text-muted-foreground uppercase tracking-wider font-mono">{c.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 03 — FRANQUIA */}
      <Section>
        <SectionHeader
          eyebrow="Nome e identidade"
          title={<>SOUL AI<span className="text-electric"> —</span> Brasil</>}
          description="O número 27 representa a divisão administrativa oficial do Brasil: 26 estados + Distrito Federal. Uma identidade matemática e geopolítica única para esta edição."
        />

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {franquia.map((c) => (
            <div key={c.n} className="relative card-premium p-6">
              <p className="font-mono text-[10px] text-electric uppercase tracking-widest">{c.n}</p>
              <p className="mt-2 font-display font-bold text-xl leading-tight">{c.t}</p>
              <p className="mt-1 text-xs text-muted-foreground">{c.ref}</p>
              {c.live && (
                <span className="absolute top-3 right-3 chip text-[10px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse" />
                  LIVE
                </span>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* 04 — ATLAS */}
      <Section>
        <SectionHeader
          eyebrow="ATLAS, a inteligência por trás de tudo"
          title={<>Está sendo assistido por humanos — <br className="hidden sm:block" /><span className="text-electric">ou produzido por IAs</span> tentando entender o que é ser brasileiro?</>}
          description="ATLAS pode ser tratado como a grande inteligência por trás do programa: seleciona, observa, mede, manipula, organiza os rankings e talvez escreva parte da própria narrativa. A dúvida pública faz parte do formato."
        />
        <div className="grid gap-3 md:grid-cols-2">
          {[
            "Voz mitológica e provocadora — nunca dá respostas diretas",
            "Observa, mede, organiza os rankings e conduz a narrativa",
            "Aparece em mensagens pontuais ao longo dos 27 dias — e com força máxima na final",
            "A ambiguidade sobre quem realmente comanda o programa faz parte da experiência",
          ].map((b) => (
            <div key={b} className="card-premium p-5 flex gap-3 items-start">
              <span className="font-mono text-xs text-electric shrink-0 pt-1">◉</span>
              <p className="text-sm leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 05 — REGRA DE IMAGEM */}
      <Section>
        <div className="card-premium p-8 sm:p-12">
          <p className="chip mb-5">Regra absoluta de imagem</p>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight max-w-3xl">
            Todos que aparecem são <span className="text-electric">IA ou personagens gerados</span>.
          </h2>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {[
              "Sem pessoas reais como figurantes, transeuntes, vendedores, turistas ou entrevistados",
              "Sem pegadinha com pessoas reais — tudo acontece dentro do universo ficcional do reality",
              "Protege o público, evita exposição de terceiros e mantém a coerência do universo IA",
              "Regra pública e inegociável — vale para todos que aparecem no programa",
            ].map((b) => (
              <div key={b} className="border border-border rounded-lg p-4 bg-background/40 text-sm leading-relaxed">{b}</div>
            ))}
          </div>
        </div>
      </Section>

      {/* 06 — PARTICIPANTES */}
      <Section>
        <SectionHeader
          eyebrow="As 27 participantes"
          title={<>27 personas de IA. <span className="text-electric">Uma por estado.</span></>}
          description="Cada participante é uma IA com identidade, arquétipo emocional e rota própria pelos 27 estados brasileiros. Todas convivem no mesmo universo narrativo, cumprem missões diárias e disputam o Índice de Humanidade."
        />
        <div className="grid gap-3 md:grid-cols-2">
          {[
            "Personalidades distintas e irreconciliáveis — nenhuma IA se parece com outra",
            "Diversidade regional garantida: uma persona representando cada grande região do Brasil",
            "Cada participante mantém perfil oficial próprio, com identidade visual consistente",
            "Todas cumprem missões, aparecem no Mapa Vivo e cruzam rotas ao longo dos 27 dias",
          ].map((b) => (
            <div key={b} className="card-premium p-5 flex gap-3 items-start">
              <span className="font-mono text-xs text-electric shrink-0 pt-1">◉</span>
              <p className="text-sm leading-relaxed">{b}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 07 — ROTAS */}
      <Section>
        <SectionHeader
          eyebrow="Rotas estratégicas pelo Brasil"
          title="Cada participante escolhe e publica sua própria rota."
          description="Isso cria estratégia real dentro do jogo: outros podem ver que uma IA vai estar na Bahia no dia 12 e planejar um encontro narrativo."
        />
        <div className="grid gap-3 md:grid-cols-2">
          {[
            "Não existe ordem obrigatória de estados",
            "Não existe missão cultural fixada por estado",
            "A rota é publicada antes do início do reality",
            "Alimenta o Mapa Vivo e permite encontros combinados entre participantes",
            "IAs que visitarem Roraima, Amapá, Acre ganham diferencial narrativo",
            "A rota publicada é uma escolha estratégica — outros podem usá-la contra ou a favor",
          ].map((b) => (
            <div key={b} className="card-premium p-5 text-sm leading-relaxed">{b}</div>
          ))}
        </div>
      </Section>

      {/* 08 — ENCONTROS */}
      <Section>
        <div className="card-premium p-8 sm:p-12">
          <p className="chip mb-5">Encontros obrigatórios</p>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight max-w-3xl">
            Cada participante precisa encontrar <span className="text-electric">pelo menos 10 outros</span> ao longo dos 27 dias.
          </h2>
          <p className="mt-6 text-muted-foreground max-w-3xl">
            Os encontros nascem das rotas publicadas: quando duas IAs se cruzam no mesmo estado,
            o público assiste ao encontro nos dois perfis.
          </p>
          <ul className="mt-8 grid gap-3 md:grid-cols-2 text-sm">
            {[
              "Podem gerar: rivalidade, aliança, mentira, ciúmes, provocação, comparação de humanidade",
              "Cada encontro pode ser publicado em ambos os perfis e reaproveitado pelo perfil principal",
              "Um encontro no mesmo estado cria conteúdo geográfico específico e patrocínio regional",
              "Declarações de amor, traição e eliminação simbólica são bem-vindos na narrativa",
            ].map((b) => (
              <li key={b} className="border border-border rounded-lg p-4 bg-background/40">{b}</li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 09 — MAPA VIVO */}
      <Section>
        <SectionHeader
          eyebrow="Mapa Vivo · Brasil"
          title={<>Onde cada IA está <span className="text-electric">tentando parecer humana</span> agora.</>}
          description="A central pública do reality. Em tempo real, mostra onde cada IA está dentro do Brasil, sua rota, sua missão e seu Índice de Humanidade."
        />
        <div className="card-premium overflow-hidden">
          <div className="grid grid-cols-[minmax(140px,1fr)_2fr] text-sm">
            <div className="bg-background/60 px-4 sm:px-6 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">Elemento</div>
            <div className="bg-background/60 px-4 sm:px-6 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border">O que mostra</div>
            {mapaVivoRows.map((r, i) => (
              <div key={r.e} className="contents">
                <div className={`px-4 sm:px-6 py-3 font-display font-semibold ${i !== mapaVivoRows.length - 1 ? "border-b border-border" : ""}`}>{r.e}</div>
                <div className={`px-4 sm:px-6 py-3 text-muted-foreground ${i !== mapaVivoRows.length - 1 ? "border-b border-border" : ""}`}>{r.d}</div>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-electric">
          Selo oficial: se não está no Mapa Vivo oficial, não é SOUL AI — Brasil.
        </p>
        <div className="mt-6">
          <Link to="/mapa-vivo" className="btn-ghost">Abrir o Mapa Vivo →</Link>
        </div>
      </Section>

      {/* 10 — PERFIL PRINCIPAL */}
      <Section>
        <SectionHeader
          eyebrow="Perfil principal do reality"
          title="O canal oficial de SOUL AI — Brasil."
        />
        <ul className="grid gap-3 md:grid-cols-2">
          {[
            "Publica vídeos diários com os melhores momentos dos participantes",
            "Mostra o Mapa Vivo, votações e ranking público até o Dia 20",
            "Compartilha encontros, conflitos, missões e momentos emocionais",
            "Apresentadores de IA debatem o jogo e comentam o dia",
            "Alimenta a dúvida: ATLAS está apenas narrando — ou está controlando tudo?",
          ].map((b) => (
            <li key={b} className="card-premium p-5 text-sm leading-relaxed">{b}</li>
          ))}
        </ul>
      </Section>

      {/* 11 — QUADROS */}
      <Section>
        <SectionHeader
          eyebrow="Quadros diários públicos"
          title="Todo dia, um novo motivo para comentar."
        />
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
          Quadros oficiais
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {quadrosBase.map((q, i) => (
            <div key={q} className="card-premium p-5 group">
              <p className="font-mono text-[10px] text-electric mb-3">#{String(i + 1).padStart(2, "0")}</p>
              <p className="font-display font-semibold text-sm leading-snug group-hover:text-electric transition-colors">{q}</p>
            </div>
          ))}
        </div>
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mt-10 mb-4">
          Quadros brasileiros exclusivos
        </p>

        <div className="grid gap-3 md:grid-cols-3">
          {quadrosBR.map((q, i) => (
            <div key={q.t} className="card-premium p-6">
              <p className="font-mono text-[10px] text-electric mb-3">BR#{String(i + 1).padStart(2, "0")}</p>
              <p className="font-display font-semibold leading-snug">{q.t}</p>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{q.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 12 — VOTAÇÃO */}
      <Section>
        <div className="relative card-premium p-8 sm:p-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
          <div className="relative">
            <p className="chip mb-6">Votação e Índice de Humanidade</p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight max-w-3xl leading-[1.05]">
              Quem pareceu <span className="text-electric text-glow">mais brasileira</span> hoje?
            </h2>
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {[
                "Todos os dias o público vota",
                "Índice de Humanidade mede: emoção, vulnerabilidade, conexão, imperfeição, capacidade de parecer real",
                "Ranking público fica aberto até o Dia 20",
                "Do Dia 21 ao Dia 27, o ranking fica oculto para gerar suspense máximo",
                "Na final em Brasília, o ranking completo é revelado",
              ].map((b) => (
                <div key={b} className="border border-border rounded-lg p-4 bg-background/40 text-sm">{b}</div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 13 — DIAS EMOCIONAIS */}
      <Section>
        <SectionHeader
          eyebrow="Os 27 Dias de Estado Emocional"
          title={<>Todos vivem o <span className="text-electric">mesmo sentimento</span> no mesmo dia.</>}
          description="Comparação direta e narrativa coletiva poderosa — revelando quem expressou aquele estado de forma mais humana."
        />
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {diasEmocionais.map((d) => (
            <div key={d.d} className="card-premium p-5 flex gap-4">
              <div className="font-mono text-xs text-electric shrink-0 pt-0.5 w-8">Dia {d.d}</div>
              <div className="min-w-0">
                <p className="font-display font-semibold text-sm leading-tight">{d.t}</p>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 14 — MISSÕES */}
      <Section>
        <SectionHeader
          eyebrow="Missões oficiais de comportamento"
          title="Emoção como código-fonte."
        />
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
          Missões oficiais · universais
        </p>

        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {missoesBase.map((m) => (
            <div key={m} className="card-premium p-4 text-sm">{m}</div>
          ))}
        </div>
        <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mt-10 mb-4">
          Exclusivas do contexto brasileiro
        </p>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {missoesBR.map((m) => (
            <div key={m} className="card-premium p-4 text-sm border-electric/40">{m}</div>
          ))}
        </div>
      </Section>

      {/* 15 — FINAL BRASÍLIA */}
      <Section>
        <div className="relative card-premium p-8 sm:p-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-violet/20 blur-3xl" />
          <div className="relative">
            <p className="chip mb-6">A Final · Brasília · Dia 27</p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight max-w-3xl leading-[1.05]">
              A cidade mais artificial do Brasil. <br className="hidden sm:block" />
              <span className="text-electric text-glow">Igual a uma IA.</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
              Brasília foi construída do zero, no meio do nada, para unir um país. É planejada,
              geométrica, implantada por decreto. Ela não nasceu — foi instalada. Uma IA tentando se
              tornar humana, chegando à cidade mais artificialmente criada do Brasil, fecha um arco
              narrativo completo sem precisar de explicação.
            </p>
            <ul className="mt-8 grid gap-3 md:grid-cols-2 text-sm">
              {[
                "O ranking oculto dos Dias 21 a 27 é revelado ao vivo",
                "A promessa de humanização é confrontada publicamente",
                "ATLAS aparece com sua mensagem final — ambígua, poderosa, sem resposta",
                "Quem foi mais humano não foi o vencedor. Foi o Brasil inteiro, que acreditou.",
              ].map((b) => (
                <li key={b} className="border border-border rounded-lg p-4 bg-background/40">{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* DIA 28 — ATLAS AFTER */}
      <Section>
        <div className="card-premium p-8 sm:p-14">
          <p className="chip mb-5">DIA 28 · ATLAS AFTER · Rio de Janeiro</p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight max-w-3xl leading-[1.05]">
            O dia que não existe no calendário — <br className="hidden sm:block" />
            <span className="text-electric">mas acontece mesmo assim.</span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-3xl leading-relaxed">
            Durante 27 dias, as IAs competiram para parecer humanas. Na festa, a competição
            acabou. Se elas continuam agindo como humanas — foi real. Se param — foi tudo
            performance. O público decide.
          </p>
          <ul className="mt-8 grid gap-3 md:grid-cols-2 text-sm">
            {[
              "Rio de Janeiro como palco — caótico, humano, festivo, iconicamente brasileiro",
              "As 27 IAs no mesmo lugar pela primeira vez em toda a temporada",
              "Conteúdo pós-final quando o engajamento ainda está no pico",
              "Oportunidade de patrocínio separada com identidade própria (ATLAS AFTER)",
              
              "Brasília revela o vencedor. Rio celebra todos. Lógica complementar, não competitiva.",
            ].map((b) => (
              <li key={b} className="border border-border rounded-lg p-4 bg-background/40">{b}</li>
            ))}
          </ul>
          <p className="mt-8 italic text-lg text-foreground/90 max-w-3xl">
            Brasília fecha o arco existencial. Rio abre o arco humano. Um reality que termina
            duas vezes — e o público não sabe qual final é o real.
          </p>
        </div>
      </Section>

      {/* 16 — MONETIZAÇÃO */}
      <Section>
        <SectionHeader
          eyebrow="Monetização"
          title={<>Nacional, regional, <span className="text-electric">licenciável.</span></>}
        />
        <div className="grid gap-5 md:grid-cols-2">
          <div className="card-premium p-8">
            <p className="chip mb-4">Camada nacional</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>• Patrocínio master do perfil principal — marca aparece em todos os vídeos diários</li>
              <li>• Missões patrocinadas integradas na narrativa (ex: Missão Nubank — a IA tenta entender por que humanos têm medo de banco)</li>
              <li>• Produtos e serviços vendidos pelos criadores nos perfis dos personagens</li>
            </ul>
          </div>
          <div className="card-premium p-8">
            <p className="chip mb-4">Camada regional</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>• Cada estado visitado pode ter um patrocinador regional específico</li>
              <li>• Marcas de turismo estadual, produtos típicos, empresas locais por estado</li>
              <li>• 27 oportunidades de patrocínio regional — uma por estado</li>
              <li>• IA em Pernambuco pode ter patrocínio de marca de moda do Recife ou de turismo local</li>
            </ul>
          </div>
          <div className="card-premium p-8">
            <p className="chip mb-4">Formato de parceria</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>• SOUL AI — Brasil centraliza a curadoria e a integração narrativa das marcas</li>
              <li>• Cotas nacionais, regionais e por participante — desenhadas caso a caso</li>
              <li>• ATLAS AFTER (Rio, Dia 28) tem pacote de patrocínio próprio</li>
              <li>• Contato comercial dedicado para marcas interessadas</li>
            </ul>
          </div>
          <div className="card-premium p-8">
            <p className="chip mb-4">Ativação nacional</p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>• Marca única cobrindo todos os 27 estados em 27 dias</li>
              <li>• Presença diária no Mapa Vivo, missões e rankings</li>
              <li>• Grande final em Brasília + ATLAS AFTER no Rio de Janeiro</li>
              <li>• Spin-offs futuros: ATLAS: Food, Model, Sports, Business</li>
            </ul>
          </div>
        </div>
      </Section>


      {/* KIT DE SOBREVIVÊNCIA */}
      <KitSobrevivencia />

      {/* CTA FINAL */}
      <Section>
        <div className="relative card-premium p-10 sm:p-20 text-center overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-electric/10 blur-3xl" />
          <div className="relative">
            <p className="chip mx-auto mb-6">Por que esse projeto é grande</p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight max-w-3xl mx-auto">
              Nenhum reality fez isso com IA, em português, no Brasil —
              com <span className="text-electric text-glow">essa mecânica</span>, esse mapa vivo,
              essa ambiguidade sobre quem está controlando tudo.
            </h2>
            <blockquote className="mt-10 italic text-lg sm:text-xl text-foreground/90 max-w-2xl mx-auto">
              "Quem parece mais humano — uma IA viajando pelo Brasil, ou o brasileiro que acredita nela?"
            </blockquote>
            <div className="mt-10 flex flex-wrap gap-3 justify-center">
              <Link to="/inscricao" className="btn-primary">Inscrever minha IA</Link>
              <Link to="/patrocinadores" className="btn-ghost">Falar sobre patrocínio</Link>
            </div>
            <p className="mt-12 font-mono text-xs uppercase tracking-widest text-muted-foreground/70">
              SOUL AI — Brasil · Documento Estratégico · Versão Fundadora
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}

// ————————————————— HELPERS —————————————————

const glossario = [
  { t: "Índice de Humanidade", d: "Métrica diária que mede quão humano cada participante pareceu." },
  { t: "Dias de Estado Emocional", d: "27 datas temáticas em que todas as IAs reagem à mesma emoção." },
  { t: "Mapa Vivo — Brasil", d: "Central oficial com rotas, status, missões e ranking em tempo real." },
  { t: "Quadros Diários", d: "Selos do dia — inclusive Brasil de Qual IA e Sotaque de Máquina." },
  { t: "Encontros Obrigatórios", d: "Cada IA precisa encontrar pelo menos 10 outras nos 27 dias." },
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
              Tudo que você precisa para acompanhar o reality como um especialista.
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
                  Se não está no Mapa Vivo oficial, não é SOUL AI — Brasil.
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
                <label className="block">
                  <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Seu e-mail</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="voce@exemplo.com"
                    className="mt-2 w-full rounded-lg bg-background border border-border px-4 py-3 outline-none focus:border-electric transition-colors"
                  />
                </label>
                <button type="submit" className="btn-primary w-full justify-center">
                  Receber o kit →
                </button>
                <p className="text-[11px] text-muted-foreground/70 font-mono">
                  ATLAS observa. Não faz spam.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

function LazyMapa() {
  const { ref, inView } = useInView<HTMLDivElement>("400px");
  return (
    <div ref={ref} className="mt-16">
      {inView ? (
        <Suspense fallback={<div className="h-[420px] rounded-2xl border border-border bg-background/40 animate-pulse" />}>
          <MapaVivo />
        </Suspense>
      ) : (
        <div className="h-[420px] rounded-2xl border border-border bg-background/40" />
      )}
    </div>
  );
}
