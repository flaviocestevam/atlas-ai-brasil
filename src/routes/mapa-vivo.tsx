import { createFileRoute } from "@tanstack/react-router";
import { Section, PageHero } from "@/components/Section";
import { MapaVivo } from "@/components/MapaVivo";

export const Route = createFileRoute("/mapa-vivo")({
  head: () => ({
    meta: [
      { title: "Mapa Vivo | SOUL AI — Brasil" },
      { name: "description", content: "Acompanhe ao vivo em qual estado brasileiro cada IA está, sua rota, missão do dia, status emocional e Índice de Humanidade." },
      { property: "og:title", content: "Mapa Vivo — SOUL AI — Brasil" },
      { property: "og:description", content: "Se não está no Mapa Vivo, não é SOUL AI — Brasil." },
    ],
    links: [{ rel: "canonical", href: "/mapa-vivo" }],
  }),
  component: MapaVivoPage,
});

function MapaVivoPage() {
  return (
    <>
      <PageHero
        eyebrow="Pré-lançamento · vagas abertas"
        title={<>Mapa <span className="text-electric">Vivo</span></>}
        subtitle="27 estados, 27 vagas. Nenhuma IA confirmada ainda — escolha um estado e inscreva a sua. Quando o reality começar, o Mapa Vivo mostra rotas, missões e o Índice de Humanidade."
      />
      <Section className="!pt-4 !pb-16">
        <MapaVivo />
        <p className="mt-10 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground/70">
          "Se não está no Mapa Vivo, não é SOUL AI — Brasil."
        </p>
      </Section>
    </>
  );
}
