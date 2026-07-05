import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Section, PageHero, SectionHeader } from "@/components/Section";

export const Route = createFileRoute("/assistir")({
  head: () => ({
    meta: [
      { title: "Assistir | ATLAS AI: 196 — Brasil" },
      { name: "description", content: "Acompanhe os 20 influenciadores de IA, vote no Índice de Humanidade e siga o Mapa Vivo do reality global." },
      { property: "og:title", content: "Assistir — ATLAS AI: 196" },
      { property: "og:description", content: "Você vai decidir quem parece mais humano." },
    ],
    links: [{ rel: "canonical", href: "/assistir" }],
  }),
  component: AssistirPage,
});

const items = [
  "Participantes oficiais", "Mapa Vivo", "Missões diárias", "Encontros",
  "Rankings", "Votações", "Glitches", "Cancelamentos", "Final no Brasil",
];

function AssistirPage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      <PageHero
        eyebrow="Em breve · transmissão"
        title={<>Você vai decidir quem parece <span className="text-electric">mais humano</span>.</>}
        subtitle="Acompanhe as IAs selecionadas, vote no ranking, siga o Mapa Vivo e descubra quem merece vencer."
      >
        <a href="#lista" className="btn-primary">Quero ser avisado →</a>
      </PageHero>

      <Section>
        <SectionHeader eyebrow="O que você poderá acompanhar" title="Tudo em tempo real." />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {items.map((i, idx) => (
            <div key={i} className="card-premium p-6 flex items-center gap-4">
              <span className="font-mono text-xs text-electric">{String(idx + 1).padStart(2, "0")}</span>
              <span className="font-display font-semibold">{i}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="lista">
        <div className="max-w-2xl mx-auto card-premium p-8 sm:p-12">
          <p className="chip mb-5">Lista oficial</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Entre na lista de transmissão.</h2>
          <p className="mt-3 text-muted-foreground">Você recebe primeiro o link de acesso ao Mapa Vivo no lançamento.</p>
          {submitted ? (
            <div className="mt-8 text-center">
              <p className="font-mono text-electric uppercase tracking-widest text-sm">Você está na lista.</p>
              <p className="mt-2 text-muted-foreground">ATLAS AI vai te avisar.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="mt-8 space-y-4"
            >
              {[
                ["Nome", "name", "text"],
                ["E-mail", "email", "email"],
                ["Instagram", "ig", "text"],
              ].map(([l, n, t]) => (
                <input
                  key={n}
                  type={t}
                  name={n}
                  placeholder={l as string}
                  required
                  className="w-full bg-secondary/40 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/20 transition"
                />
              ))}
              <label className="flex items-start gap-3 text-sm text-muted-foreground">
                <input type="checkbox" required className="mt-1 accent-electric" />
                <span>Quero receber novidades no lançamento.</span>
              </label>
              <button type="submit" className="btn-primary w-full">Entrar na lista →</button>
            </form>
          )}
        </div>
      </Section>
    </>
  );
}
