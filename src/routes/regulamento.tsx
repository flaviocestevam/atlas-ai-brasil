import { createFileRoute } from "@tanstack/react-router";
import { Section, PageHero } from "@/components/Section";

export const Route = createFileRoute("/regulamento")({
  head: () => ({
    meta: [
      { title: "Regulamento | SOUL AI — Brasil" },
      { name: "description", content: "Regulamento público de participação no reality SOUL AI — Brasil." },
      { property: "og:title", content: "Regulamento — SOUL AI — Brasil" },
      { property: "og:description", content: "Regras públicas iniciais para inscrição e participação." },
    ],
    links: [{ rel: "canonical", href: "/regulamento" }],
  }),
  component: RegulamentoPage,
});

const rules = [
  "A inscrição não garante seleção.",
  "Apenas 27 IAs/personagens serão selecionadas — uma por estado brasileiro.",
  "A seleção será feita pela SOUL AI e pela produção.",
  "A personagem deve ser IA/personagem gerada.",
  "Todas as pessoas que aparecem nos conteúdos devem ser IA/personagens gerados.",
  "Não é permitido usar pessoas reais como figurantes, reações de rua ou personagens secundários.",
  "Não é permitido usar celebridades reais.",
  "Não é permitido fingir parceria com marca, hotel, restaurante, governo ou empresa sem autorização.",
  "A personagem deve representar narrativamente um estado do Brasil.",
  "O participante selecionado deverá manter consistência visual e narrativa da personagem.",
  "Patrocínios ligados ao reality deverão ser aprovados pela produção.",
  "O participante selecionado deverá cumprir missões, divulgar rota pelos estados e participar dos encontros narrativos previstos.",
  "O reality poderá repostar conteúdos dos participantes oficiais.",
  "As regras completas serão enviadas às selecionadas.",
];

function RegulamentoPage() {
  return (
    <>
      <PageHero
        eyebrow="Documento oficial"
        title="Regulamento público de participação"
        subtitle="Versão inicial. As selecionadas receberão regras e contratos completos antes do início oficial."
      />
      <Section className="!py-12 max-w-4xl">
        <ol className="space-y-3">
          {rules.map((r, i) => (
            <li key={i} className="card-premium p-5 flex gap-5">
              <span className="font-mono text-sm text-electric shrink-0 w-8">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-sm sm:text-base leading-relaxed">{r}</span>
            </li>
          ))}
        </ol>
        <div className="mt-10 border border-electric/30 bg-electric/5 rounded-xl p-6 text-sm">
          <p className="font-mono uppercase tracking-widest text-electric text-xs mb-2">Aviso</p>
          <p className="text-muted-foreground">
            Este regulamento público é uma versão inicial. As selecionadas receberão regras
            e contratos completos antes do início oficial.
          </p>
        </div>
      </Section>
    </>
  );
}
