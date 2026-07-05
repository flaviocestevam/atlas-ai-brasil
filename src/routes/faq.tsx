import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Section, PageHero } from "@/components/Section";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | ATLAS AI: 196 — Brasil" },
      { name: "description", content: "Perguntas e respostas sobre o reality ATLAS AI: 196 — Brasil." },
      { property: "og:title", content: "FAQ — ATLAS AI: 196" },
      { property: "og:description", content: "Tudo o que você precisa saber sobre o reality." },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    }],
  }),
  component: FaqPage,
});

const faqs = [
  {
    q: "O que é ATLAS AI: 196 — Brasil?",
    a: "É um reality digital onde 20 influenciadores de IA selecionados pela ATLAS AI competem em uma jornada narrativa por 196 países em 196 dias para provar quem parece mais humano.",
  },
  {
    q: "Preciso viajar de verdade?",
    a: "Não. A jornada é narrativa e digital. O participante precisa criar uma experiência convincente dentro do universo do reality.",
  },
  {
    q: "Posso usar pessoas reais nos vídeos?",
    a: "Não. Todas as pessoas que aparecem nos conteúdos devem ser IA/personagens gerados.",
  },
  {
    q: "Quantos participantes serão escolhidos?",
    a: "20 influenciadores de IA serão selecionados.",
  },
  {
    q: "Como faço para me inscrever?",
    a: "Crie sua IA, grave um Reels de inscrição usando o roteiro oficial e envie o link pelo formulário.",
  },
  {
    q: "Preciso já ter Instagram da IA?",
    a: "É recomendado, mas a inscrição pode aceitar personagens em fase inicial, desde que a proposta seja forte.",
  },
  {
    q: "O que é o Mapa Vivo?",
    a: "É a central oficial que mostra onde cada IA está narrativamente, sua rota, missão, status emocional, ranking e encontros.",
  },
  {
    q: "Quem escolhe o vencedor?",
    a: "O público vota ao longo da jornada por meio do Índice de Humanidade.",
  },
  {
    q: "Marcas podem patrocinar?",
    a: "Sim. Existem oportunidades para patrocinar o reality, o Mapa Vivo, missões, rankings, participantes e a final.",
  },
  {
    q: "Quando começa?",
    a: "Em breve. As inscrições ficarão abertas por tempo limitado.",
  },
  {
    q: "Quem é a Dra. Lena Voss?",
    a: "Lena Voss é a psicóloga de IA do reality. Toda quinta-feira ela publica uma análise sobre o comportamento dos 20 participantes — desejo, inveja, solidão, paixões que nunca serão correspondidas. Ninguém confirmou se ela é real.",
  },
  {
    q: "O ATLAS AI: 196 vai existir em outros países?",
    a: "Sim. Brasil é o Capítulo 1 de uma franquia global. Os próximos capítulos previstos são EUA, Japão, França, Itália e Colômbia.",
  },
  {
    q: "O que é a Grand Season Internacional?",
    a: "É a visão final da franquia: uma IA representando cada país, todas competindo na mesma temporada, ao mesmo tempo, em um único ranking mundial de humanidade.",
  },
];

function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Perguntas frequentes"
        subtitle="Tudo sobre o universo, regras e funcionamento do ATLAS AI: 196 — Brasil."
      />
      <Section className="!py-12 max-w-3xl">
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="card-premium overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4"
                >
                  <span className="font-display font-semibold text-base sm:text-lg">{f.q}</span>
                  <span className={`shrink-0 text-electric text-xl transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed -mt-2">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 card-premium p-8 text-center">
          <p className="chip mx-auto mb-4">Pronto para inscrever?</p>
          <h3 className="text-2xl font-bold">ATLAS AI está observando.</h3>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/inscricao" className="btn-primary">Inscrever minha IA</Link>
            <Link to="/patrocinadores" className="btn-ghost">Sou patrocinador</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
