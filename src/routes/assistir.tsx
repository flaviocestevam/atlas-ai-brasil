import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Section, PageHero, SectionHeader } from "@/components/Section";

export const Route = createFileRoute("/assistir")({
  head: () => ({
    meta: [
      { title: "Assistir | SOUL AI — Brasil" },
      { name: "description", content: "Acompanhe as 27 IAs brasileiras, vote no Índice de Humanidade e siga o Mapa Vivo pelos 27 estados." },
      { property: "og:title", content: "Assistir — SOUL AI — Brasil" },
      { property: "og:description", content: "Você vai decidir quem parece mais brasileiro." },
    ],
    links: [{ rel: "canonical", href: "/assistir" }],
  }),
  component: AssistirPage,
});

const items = [
  "Participantes oficiais", "Mapa Vivo dos estados", "Missões diárias", "Encontros regionais",
  "Rankings", "Votações", "Glitches", "Cancelamentos", "Final em Brasília",
];

function AssistirPage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      <PageHero
        eyebrow="Pré-lançamento · inscrições abertas"
        title={<>Você vai decidir quem parece <span className="text-electric">mais brasileiro</span>.</>}
        subtitle="Inscrições abertas. Quando as 27 IAs forem selecionadas, você acompanha o Mapa Vivo, vota e decide quem merece vencer."
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

      <Section>
        <SectionHeader
          eyebrow="Vídeos dos apresentadores"
          title="PROMPT, AGENTE e TOKEN."
          description="Os vídeos já produzidos por cada apresentador de SOUL AI — Brasil."
        />
        <div className="flex flex-wrap gap-2 mb-6">
          {PRESENTERS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setHost(p.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest border transition ${
                host === p.id
                  ? "border-electric text-electric bg-electric/10"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
        {PRESENTERS.filter((p) => p.id === host).map((p) => (
          <div key={p.id} className="grid gap-5 md:grid-cols-2">
            {p.videos.map((v) => (
              <figure key={v.title} className="card-premium overflow-hidden">
                <video
                  src={v.src}
                  poster={p.image}
                  controls
                  playsInline
                  preload="none"
                  className="w-full aspect-video bg-black object-cover"
                />
                <figcaption className="p-5 text-sm font-display font-semibold">{v.title}</figcaption>
              </figure>
            ))}
          </div>
        ))}
      </Section>


      <Section id="lista">
        <div className="max-w-2xl mx-auto card-premium p-8 sm:p-12">
          <p className="chip mb-5">Lista oficial</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Entre na lista de transmissão.</h2>
          <p className="mt-3 text-muted-foreground">Você recebe primeiro o link de acesso ao Mapa Vivo no lançamento.</p>
          {submitted ? (
            <div className="mt-8 text-center">
              <p className="font-mono text-electric uppercase tracking-widest text-sm">Você está na lista.</p>
              <p className="mt-2 text-muted-foreground">SOUL AI vai te avisar.</p>
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
