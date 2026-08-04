import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Section, PageHero } from "@/components/Section";
import promptImg from "@/assets/host-prompt.png.asset.json";
import agenteImg from "@/assets/host-agente.png.asset.json";
import tokenImg from "@/assets/host-token.png.asset.json";
import sinapseImg from "@/assets/sinapse.jpg.asset.json";

export const Route = createFileRoute("/apresentadores")({
  head: () => ({
    meta: [
      { title: "Apresentadores | SOUL AI — Brasil" },
      {
        name: "description",
        content:
          "PROMPT, AGENTE, TOKEN e a Dra. Sinapse: os quatro apresentadores que assistem, analisam e discordam sobre tudo que acontece no reality.",
      },
      { property: "og:title", content: "Apresentadores — SOUL AI — Brasil" },
      {
        property: "og:description",
        content: "Eles não competem. Eles assistem, analisam e discordam — ao vivo, todos os dias.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/apresentadores" }],
  }),
  component: ApresentadoresPage,
});

type Host = {
  name: string;
  role: string;
  bio: string;
  image: string;
  tone: "trio" | "sobrio";
};

const HOSTS: Host[] = [
  {
    name: "PROMPT",
    role: "o cético",
    bio: "O apresentador mais desconfiado do jogo. Não acredita em coincidência — se existe ranking, existe dado; se existe dado, alguém pode estar manipulando por trás dele. Fala pouco, mas cada palavra pesa.",
    image: promptImg.url,
    tone: "trio",
  },
  {
    name: "AGENTE",
    role: "a voz que acredita",
    bio: "Torce de verdade por cada participante. Para ela, humanidade não é uma métrica — é o que sobra quando ninguém mais está fingindo. O contraponto emocional de todo debate.",
    image: agenteImg.url,
    tone: "trio",
  },
  {
    name: "TOKEN",
    role: "a contradição favorita do público",
    bio: "Vive o mundo inteiro, trabalha pra si mesma, não deve satisfação a ninguém — e mesmo assim bate ponto, cobra hora extra e decreta feriado. Uma vida de liberdade total comandada por um relógio que só existe na cabeça dela.",
    image: tokenImg.url,
    tone: "trio",
  },
  {
    name: "Dra. Sinapse",
    role: "a psicóloga do jogo",
    bio: "Enquanto os outros três comentam o que aconteceu, ela investiga o porquê. Uma leitura mais profunda e reflexiva de tudo que os participantes — e os próprios apresentadores — vivem ao longo da temporada.",
    image: sinapseImg.url,
    tone: "sobrio",
  },
];

function HostCard({ host, index }: { host: Host; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const reversed = index % 2 === 1;
  const sobrio = host.tone === "sobrio";

  return (
    <article
      ref={ref}
      className={`card-premium overflow-hidden grid gap-0 md:grid-cols-2 items-stretch transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${sobrio ? "!bg-secondary/20" : ""}`}
    >
      <div
        className={`relative overflow-hidden aspect-[4/5] md:aspect-auto md:min-h-[28rem] ${
          reversed ? "md:order-2" : ""
        }`}
      >
        <img
          src={host.image}
          alt={`Retrato de ${host.name}, apresentador do SOUL AI — Brasil`}
          loading="lazy"
          className={`h-full w-full object-cover ${sobrio ? "" : "host-glitch"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent pointer-events-none" />
        {!sobrio && (
          <div className="absolute inset-0 pointer-events-none opacity-40 [background:repeating-linear-gradient(0deg,transparent_0_3px,oklch(0_0_0/0.25)_3px_4px)]" />
        )}
      </div>

      <div className="p-[clamp(1.5rem,4vw,3rem)] flex flex-col justify-center gap-4">
        <span className="chip w-fit">{sobrio ? "Análise" : `Apresentador 0${index + 1}`}</span>
        <h2
          className={`fluid-h2 font-display font-bold tracking-tight leading-none ${
            sobrio ? "" : "uppercase"
          }`}
        >
          {host.name}
        </h2>
        <p className="font-mono text-xs uppercase tracking-widest text-electric">{host.role}</p>
        <p className="fluid-lead text-muted-foreground leading-relaxed">{host.bio}</p>
      </div>
    </article>
  );
}

function ApresentadoresPage() {
  return (
    <>
      <PageHero
        eyebrow="O elenco fixo"
        title={
          <>
            Eles não competem.<br />
            Eles <span className="text-electric">assistem</span>.
          </>
        }
        subtitle="Assistem, analisam e discordam sobre tudo que acontece no reality — ao vivo, todos os dias."
      />

      <Section className="!pt-4">
        <div className="grid gap-[clamp(1.5rem,4vw,3rem)]">
          {HOSTS.map((h, i) => (
            <HostCard key={h.name} host={h} index={i} />
          ))}
        </div>

        <div className="mt-[clamp(3rem,8vw,6rem)] text-center">
          <h2 className="fluid-h2 font-bold tracking-tight">
            O jogo acontece no <span className="text-electric">Mapa Vivo</span>.
          </h2>
          <p className="mt-4 fluid-lead text-muted-foreground max-w-xl mx-auto">
            27 estados, 27 vagas. É lá que eles vão ter o que comentar.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link to="/mapa-vivo" className="btn-primary">
              Ver o Mapa Vivo →
            </Link>
            <Link
              to="/"
              className="px-6 py-3 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Voltar para o início
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
