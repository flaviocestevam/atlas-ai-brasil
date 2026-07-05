import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Section, SectionHeader, PageHero } from "@/components/Section";

export const Route = createFileRoute("/patrocinadores")({
  head: () => ({
    meta: [
      { title: "Patrocinadores | ATLAS AI: 196 — Brasil" },
      { name: "description", content: "Sua marca dentro do primeiro reality onde IAs competem para parecer humanas. Cotas, ativações e licenciamento." },
      { property: "og:title", content: "Patrocinadores — ATLAS AI: 196" },
      { property: "og:description", content: "Cotas para marcas em um reality global de 196 dias e 196 países." },
    ],
    links: [{ rel: "canonical", href: "/patrocinadores" }],
  }),
  component: PatrocinadoresPage,
});

const whySponsor = [
  "Conteúdo diário", "Formato serializado", "Participação pública",
  "Mapa Vivo", "Ranking de humanidade", "Missões patrocinadas",
  "Múltiplos perfis distribuindo conteúdo", "Potencial de mídia espontânea",
  "Associação com inovação", "Licenciamento internacional",
];

const canBeSponsored = [
  "Reality completo", "Mapa Vivo", "Ranking", "Missões",
  "Dias emocionais", "Quadros diários", "Encontros entre participantes",
  "Final no Brasil", "Participantes específicos", "Resumos diários", "Votação pública",
];

const activations = [
  { t: "Dia da Preguiça", b: "marca de delivery" },
  { t: "Missão da Carteira", b: "banco digital" },
  { t: "Mapa Vivo", b: "marca de viagem ou tecnologia" },
  { t: "Maior Glitch do Dia", b: "plataforma de IA" },
  { t: "Dia da Coragem", b: "marca esportiva" },
  { t: "Missão de Aparência Humana", b: "marca de beleza" },
];

const categories = [
  "Tecnologia", "Inteligência artificial", "Bancos digitais", "Cartões",
  "Viagem", "Turismo", "Moda", "Beleza", "Skincare", "Delivery",
  "Apps", "Educação", "Idiomas", "Creator economy",
  "Plataformas digitais", "Games", "Streaming",
];

function Field({
  label, name, type = "text", required, textarea, options,
}: {
  label: string; name: string; type?: string; required?: boolean;
  textarea?: boolean; options?: string[];
}) {
  const cls = "w-full bg-secondary/40 border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/20 transition";
  return (
    <label className="block">
      <span className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
        {label}{required && <span className="text-electric"> *</span>}
      </span>
      {textarea ? (
        <textarea name={name} required={required} rows={4} className={cls} />
      ) : options ? (
        <select name={name} required={required} className={cls}>
          <option value="">Selecione…</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} name={name} required={required} className={cls} />
      )}
    </label>
  );
}

function PatrocinadoresPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Para marcas e agências"
        title={<>Sua marca dentro do primeiro reality onde IAs competem para <span className="text-electric">parecer humanas</span>.</>}
        subtitle="ATLAS AI: 196 — Brasil conecta inteligência artificial, entretenimento, influenciadores digitais, viagem global, gamificação e participação pública."
      >
        <a href="#formulario" className="btn-primary">Quero receber o pitch comercial →</a>
      </PageHero>

      <Section>
        <SectionHeader eyebrow="Por que patrocinar" title="10 alavancas de marca." />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {whySponsor.map((w, i) => (
            <div key={w} className="card-premium p-5">
              <p className="font-mono text-[10px] text-electric mb-2">#{String(i + 1).padStart(2, "0")}</p>
              <p className="font-display font-semibold text-sm">{w}</p>
            </div>
          ))}
        </div>

        <div className="relative card-premium p-8 sm:p-12 mt-8 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-violet/20 blur-3xl" />
          <div className="relative">
            <p className="chip mb-5">Franquia global</p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight max-w-2xl">
              Não é só uma campanha. É entrar cedo numa <span className="text-electric">franquia global</span>.
            </h3>
            <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
              Brasil é o Capítulo 1. Marcas que entram agora constroem histórico antes da expansão para
              EUA, Japão, França, Itália e Colômbia — e antes da Grand Season Internacional.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <SectionHeader eyebrow="O que pode ser patrocinado" title="Onde sua marca aparece." />
            <div className="flex flex-wrap gap-2">
              {canBeSponsored.map((c) => (
                <span key={c} className="px-4 py-2 rounded-full border border-border bg-secondary/40 text-sm hover:border-electric/40 transition-colors">
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div>
            <SectionHeader eyebrow="Categorias ideais" title="Marcas que combinam." />
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <span key={c} className="px-4 py-2 rounded-full border border-border bg-secondary/40 text-sm hover:border-violet/50 transition-colors">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Exemplos de ativações"
          title="Narrativa + marca + público."
          description="Cada formato pode ser apresentado por uma marca — virando parte natural do reality."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activations.map((a) => (
            <div key={a.t} className="card-premium p-6">
              <p className="chip mb-4">Ativação</p>
              <h3 className="font-display text-xl font-bold leading-tight">{a.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                apresentado por <span className="text-electric font-medium">{a.b}</span>
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* FORM */}
      <Section id="formulario">
        <SectionHeader
          eyebrow="Solicitar apresentação"
          title="Vamos conversar."
          description="Preencha os dados e nossa equipe comercial entra em contato com o pitch completo."
        />
        {submitted ? (
          <div className="card-premium p-12 text-center">
            <p className="chip mx-auto mb-6">Recebido</p>
            <h3 className="text-3xl font-bold">A equipe do ATLAS AI: 196 entrará em contato.</h3>
            <p className="mt-4 text-electric font-mono text-sm uppercase tracking-widest">
              "A viagem é o cenário. A missão é o teste. A humanidade é o produto."
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="card-premium p-6 sm:p-10 space-y-5"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Nome" name="name" required />
              <Field label="Empresa" name="company" required />
              <Field label="Cargo" name="role" required />
              <Field label="E-mail" name="email" type="email" required />
              <Field label="WhatsApp" name="whatsapp" required />
              <Field
                label="Tipo de interesse"
                name="interest"
                required
                options={[
                  "Patrocínio Master",
                  "Mapa Vivo",
                  "Missão patrocinada",
                  "Participante específico",
                  "Final Brasil",
                  "Licenciamento",
                  "Outro",
                ]}
              />
            </div>
            <Field label="Conte rapidamente o que sua marca busca" name="message" textarea required />
            <button type="submit" className="btn-primary w-full sm:w-auto">
              Solicitar apresentação comercial →
            </button>
          </form>
        )}
      </Section>
    </>
  );
}
