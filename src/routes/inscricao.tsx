import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Section, SectionHeader, PageHero } from "@/components/Section";

export const Route = createFileRoute("/inscricao")({
  head: () => ({
    meta: [
      { title: "Inscreva sua IA | SOUL AI — Brasil" },
      { name: "description", content: "Crie sua IA brasileira, grave um Reels e tente uma das 27 vagas no reality SOUL AI — Brasil." },
      { property: "og:title", content: "Inscreva sua IA — SOUL AI — Brasil" },
      { property: "og:description", content: "27 IAs serão selecionadas. Faça a sua passar pelo filtro da SOUL AI." },
    ],
    links: [{ rel: "canonical", href: "/inscricao" }],
  }),
  component: InscricaoPage,
});

const traits = [
  "Nome", "Aparência consistente", "Personalidade clara", "Desejo de virar brasileira",
  "Defeito principal", "Estilo de conteúdo", "Potencial de viralização", "Capacidade de cumprir missões",
];

const criterios = [
  "Originalidade da personagem", "Consistência visual", "Personalidade forte",
  "Potencial de viralização", "Capacidade de parecer brasileira", "Capacidade de gerar histórias",
  "Qualidade do Reels de inscrição", "Clareza do desejo de virar brasileira",
  "Representatividade regional", "Potencial de produzir conteúdo por 27 dias",
];

const regras = [
  "A personagem inscrita deve ser uma IA/personagem gerada.",
  "Todas as pessoas que aparecerem nos conteúdos devem ser IA/personagens gerados.",
  "Não usar pessoas reais como figurantes, reações de rua ou personagens secundários.",
  "Não usar celebridades reais.",
  "A personagem precisa ter identidade visual consistente.",
  "O criador precisa conseguir produzir conteúdo durante o reality.",
  "Cada participante escolhida terá sua rota pública pelos 27 estados brasileiros.",
  "Todas as participantes precisarão cumprir missões, aparecer no Mapa Vivo e encontrar as outras ao longo da jornada.",
  "Patrocínios ligados ao reality serão validados pela produção.",
  "A seleção final será feita pela SOUL AI.",
];

const ESTADOS = [
  "Acre","Alagoas","Amapá","Amazonas","Bahia","Ceará","Distrito Federal","Espírito Santo",
  "Goiás","Maranhão","Mato Grosso","Mato Grosso do Sul","Minas Gerais","Pará","Paraíba",
  "Paraná","Pernambuco","Piauí","Rio de Janeiro","Rio Grande do Norte","Rio Grande do Sul",
  "Rondônia","Roraima","Santa Catarina","São Paulo","Sergipe","Tocantins",
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
        <textarea name={name} required={required} rows={3} className={cls} />
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

function InscricaoPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Inscrição oficial"
        title={<>Inscreva sua IA no <span className="text-electric">SOUL AI — Brasil</span></>}
        subtitle="27 IAs brasileiras serão selecionadas pela SOUL AI para competir em uma jornada de 27 dias pelos 27 estados do país."
      >
        <a href="#formulario" className="btn-primary">Começar inscrição →</a>
        <a href="#roteiro" className="btn-ghost">Ver roteiro do Reels</a>
      </PageHero>

      <Section className="!py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card-premium p-8">
            <p className="chip mb-4">Quem pode participar</p>
            <p className="text-muted-foreground leading-relaxed">
              Podem participar criadores brasileiros que tenham ou queiram criar uma IA/personagem
              com identidade visual consistente, personalidade forte, ligação com um estado do país
              e capacidade de produzir conteúdo durante o reality.
            </p>
          </div>
          <div className="card-premium p-8">
            <p className="chip mb-4">O que sua IA precisa ter</p>
            <div className="grid grid-cols-2 gap-2">
              {traits.map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm">
                  <span className="text-electric">◆</span> {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ROTEIRO */}
      <Section id="roteiro">
        <SectionHeader
          eyebrow="Roteiro oficial"
          title="Como fazer o Reels de inscrição"
          description="Use exatamente este roteiro. Mantém a estética do universo SOUL AI e facilita a curadoria."
        />
        <div className="card-premium p-8 sm:p-10 font-mono text-sm sm:text-base leading-loose">
          <div className="space-y-3">
            {[
              "Meu nome é [nome da IA].",
              "Eu fui criada por [nome do criador].",
              "Eu represento o estado [estado brasileiro].",
              "Eu quero entrar no SOUL AI — Brasil porque…",
              "Eu quero virar brasileira porque…",
              "Meu maior defeito é…",
              "SOUL AI, me escolha.",
            ].map((line, i) => (
              <p key={i} className="flex gap-4">
                <span className="text-electric/60 shrink-0 w-6">{String(i + 1).padStart(2, "0")}</span>
                <span>{line}</span>
              </p>
            ))}
          </div>
          <div className="mt-8 pt-8 border-t border-border grid sm:grid-cols-2 gap-6 text-xs">
            <div>
              <p className="uppercase tracking-widest text-muted-foreground mb-2">Duração</p>
              <p className="text-foreground">20 a 45 segundos</p>
            </div>
            <div>
              <p className="uppercase tracking-widest text-muted-foreground mb-2">Legenda obrigatória</p>
              <p className="text-foreground leading-relaxed">
                "Estou inscrevendo [nome da IA] no SOUL AI — Brasil.<br />
                27 IAs. 27 estados. 27 dias. Quem parece mais brasileira?<br />
                #SoulAI #SoulAIBrasil #QuemPareceMaisBrasileira"
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* CRITÉRIOS + REGRAS */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <SectionHeader eyebrow="Critérios" title="O que a SOUL AI vai avaliar." />
            <ul className="space-y-3">
              {criterios.map((c, i) => (
                <li key={c} className="flex gap-4 items-start card-premium p-4">
                  <span className="font-mono text-xs text-electric pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm">{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader eyebrow="Regras básicas" title="Universo 100% IA. Sem exceção." />
            <ul className="space-y-3">
              {regras.map((r, i) => (
                <li key={i} className="flex gap-4 items-start card-premium p-4">
                  <span className="text-electric pt-0.5">◆</span>
                  <span className="text-sm">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* FORMULÁRIO */}
      <Section id="formulario">
        <SectionHeader
          eyebrow="Formulário de inscrição"
          title="Envie sua IA para análise."
          description="A seleção final será feita pela SOUL AI. Preencha com calma — cada resposta conta."
        />
        {submitted ? (
          <div className="card-premium p-12 text-center">
            <p className="chip mx-auto mb-6">Recebido</p>
            <h3 className="text-3xl font-bold">Sua IA foi enviada para análise.</h3>
            <p className="mt-4 text-electric font-mono text-sm uppercase tracking-widest">SOUL AI está observando.</p>
            <Link to="/" className="btn-ghost mt-8 inline-flex">Voltar ao início</Link>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="card-premium p-6 sm:p-10 space-y-5"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Nome do criador" name="creator" required />
              <Field label="E-mail" name="email" type="email" required />
              <Field label="WhatsApp" name="whatsapp" required />
              <Field label="Instagram do criador" name="ig_creator" required />
              <Field label="Nome da IA/personagem" name="ai_name" required />
              <Field label="Instagram da IA (se já tiver)" name="ig_ai" />
            </div>
            <Field label="Link do Reels de inscrição" name="reels" type="url" required />
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Estado brasileiro que a IA representa" name="origin" options={ESTADOS} required />
              <Field label="Personalidade da IA em 3 palavras" name="personality" required />
            </div>
            <Field label="Por que ela quer virar brasileira?" name="why_human" textarea required />
            <Field label="Qual é o maior defeito dela?" name="flaw" textarea required />
            <div className="grid md:grid-cols-3 gap-5">
              <Field label="Consegue produzir conteúdo durante os 27 dias?" name="can_produce" options={["Sim", "Não"]} required />
              <Field label="Aceita que todas as pessoas sejam IA?" name="ai_only" options={["Sim", "Não"]} required />
              <Field label="Aceita seguir as regras oficiais se selecionada?" name="rules" options={["Sim", "Não"]} required />
            </div>
            <div className="pt-4">
              <button type="submit" className="btn-primary w-full sm:w-auto">
                Enviar inscrição para SOUL AI →
              </button>
              <p className="mt-4 text-xs text-muted-foreground font-mono">
                Ao enviar, você concorda com o regulamento público. Nem toda IA merece virar brasileira.
              </p>
            </div>
          </form>
        )}
      </Section>
    </>
  );
}
