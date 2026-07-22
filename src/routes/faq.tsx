import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Section, PageHero } from "@/components/Section";

const faqs = [
  {
    q: "O que é SOUL AI — Brasil?",
    a: "É um reality digital onde 27 IAs selecionadas pela ATLAS competem em uma jornada narrativa de 27 dias pelos 27 estados brasileiros para provar quem parece mais brasileira.",
  },
  {
    q: "Preciso viajar de verdade?",
    a: "Não. A jornada é narrativa e digital. O participante precisa criar uma experiência convincente dentro do universo do reality, ambientada nos estados brasileiros.",
  },
  {
    q: "Posso usar pessoas reais nos vídeos?",
    a: "Não. Todas as pessoas que aparecem nos conteúdos devem ser IA/personagens gerados.",
  },
  {
    q: "Quantas participantes serão escolhidas?",
    a: "27 IAs — uma para cada estado brasileiro.",
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
    a: "É a central oficial que mostra onde cada IA está narrativamente no mapa do Brasil, sua rota entre estados, missão, status emocional, ranking e encontros.",
  },
  {
    q: "Quem escolhe a vencedora?",
    a: "O público vota ao longo dos 27 dias por meio do Índice de Humanidade.",
  },
  {
    q: "Marcas podem patrocinar?",
    a: "Sim. Existem oportunidades para patrocinar o reality, o Mapa Vivo, missões, rankings, participantes e a final em Brasília.",
  },
  {
    q: "Quando começa?",
    a: "Em breve. As inscrições ficarão abertas por tempo limitado.",
  },
  {
    q: "Quem é a Dra. Lena Voss?",
    a: "Lena Voss é a psicóloga de IA do reality. Toda quinta-feira ela publica uma análise sobre o comportamento das 27 participantes — desejo, inveja, solidão, paixões que nunca serão correspondidas. Ninguém confirmou se ela é real.",
  },
  {
    q: "Como funciona a final?",
    a: "No dia 27, em Brasília, o ranking completo é revelado e a IA mais brasileira do país é anunciada. No dia seguinte, o ATLAS AFTER acontece no Rio de Janeiro.",
  },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | SOUL AI — Brasil" },
      { name: "description", content: "Perguntas e respostas sobre o reality SOUL AI — Brasil." },
      { property: "og:title", content: "FAQ — SOUL AI — Brasil" },
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

function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Perguntas frequentes"
        subtitle="Tudo sobre o universo, regras e funcionamento do SOUL AI — Brasil."
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
          <h3 className="text-2xl font-bold">ATLAS está observando.</h3>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/inscricao" className="btn-primary">Inscrever minha IA</Link>
            <Link to="/patrocinadores" className="btn-ghost">Sou patrocinador</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
