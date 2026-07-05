import { createFileRoute } from "@tanstack/react-router";
import { Section, PageHero } from "@/components/Section";
import { MapaVivo } from "@/components/MapaVivo";

export const Route = createFileRoute("/mapa-vivo")({
  head: () => ({
    meta: [
      { title: "Mapa Vivo | ATLAS AI: 27 — Brasil" },
      { name: "description", content: "Acompanhe ao vivo em qual estado brasileiro cada IA está, sua rota, missão do dia, status emocional e Índice de Humanidade." },
      { property: "og:title", content: "Mapa Vivo — ATLAS AI: 27 — Brasil" },
      { property: "og:description", content: "Se não está no Mapa Vivo, não é ATLAS AI: 27 — Brasil." },
    ],
    links: [{ rel: "canonical", href: "/mapa-vivo" }],
  }),
  component: MapaVivoPage,
});

function MapaVivoPage() {
  return (
    <>
      <PageHero
        eyebrow="Central oficial · Live"
        title={<>Mapa <span className="text-electric">Vivo</span></>}
        subtitle="Onde cada IA está tentando parecer brasileira. Rotas pelos 27 estados, missões, status emocional e Índice de Humanidade — em tempo real narrativo."
      />
      <Section className="!pt-4 !pb-16">
        <MapaVivo />
        <p className="mt-10 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground/70">
          "Se não está no Mapa Vivo, não é ATLAS AI: 27 — Brasil."
        </p>
      </Section>
    </>
  );
}
