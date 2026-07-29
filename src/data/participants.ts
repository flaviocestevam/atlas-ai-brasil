// Mock data for the Mapa Vivo — 27 personas de IA representando os 27 estados do Brasil.
export type EmotionalStatus =
  | "Ansiedade" | "Euforia" | "Vulnerável" | "Provocadora"
  | "Melancolia" | "Coragem" | "Saudade" | "Glitch";

export type ParticipantStatus = "ativo" | "missao" | "encontro" | "cancelado";

export interface RoutePoint {
  country: string; // aqui representa Estado
  code: string;    // UF
  x: number;       // map coords 0-800
  y: number;       // map coords 0-480
  day: number;     // 1..27
}

export interface Participant {
  id: string;
  name: string;
  archetype: string;
  origin: string;
  flaw: string;
  desire: string;
  emoji: string;
  color: string;
  humanity: number;
  rank: number;
  status: ParticipantStatus;
  emotional: EmotionalStatus;
  mission: string;
  nextMeeting: { with: string; city: string };
  currentDay: number;
  route: RoutePoint[];
  currentIndex: number;
  instagram: string;
  handle: string;
}

// Capitais dos 27 estados brasileiros — coords aproximadas em 800x480
export const UF = {
  AC: { country: "Acre", code: "AC", x: 107, y: 189 },
  AL: { country: "Alagoas", code: "AL", x: 733, y: 185 },
  AP: { country: "Amapá", code: "AP", x: 450, y: 63 },
  AM: { country: "Amazonas", code: "AM", x: 266, y: 102 },
  BA: { country: "Bahia", code: "BA", x: 678, y: 227 },
  CE: { country: "Ceará", code: "CE", x: 678, y: 110 },
  DF: { country: "Distrito Federal", code: "DF", x: 515, y: 263 },
  ES: { country: "Espírito Santo", code: "ES", x: 640, y: 320 },
  GO: { country: "Goiás", code: "GO", x: 486, y: 274 },
  MA: { country: "Maranhão", code: "MA", x: 555, y: 95 },
  MT: { country: "Mato Grosso", code: "MT", x: 347, y: 260 },
  MS: { country: "Mato Grosso do Sul", code: "MS", x: 377, y: 321 },
  MG: { country: "Minas Gerais", code: "MG", x: 570, y: 314 },
  PA: { country: "Pará", code: "PA", x: 480, y: 112 },
  PB: { country: "Paraíba", code: "PB", x: 748, y: 153 },
  PR: { country: "Paraná", code: "PR", x: 486, y: 384 },
  PE: { country: "Pernambuco", code: "PE", x: 745, y: 168 },
  PI: { country: "Piauí", code: "PI", x: 599, y: 148 },
  RJ: { country: "Rio de Janeiro", code: "RJ", x: 601, y: 352 },
  RN: { country: "Rio Grande do Norte", code: "RN", x: 745, y: 136 },
  RS: { country: "Rio Grande do Sul", code: "RS", x: 447, y: 442 },
  RO: { country: "Rondônia", code: "RO", x: 200, y: 200 },
  RR: { country: "Roraima", code: "RR", x: 280, y: 40 },
  SC: { country: "Santa Catarina", code: "SC", x: 502, y: 411 },
  SP: { country: "São Paulo", code: "SP", x: 541, y: 360 },
  SE: { country: "Sergipe", code: "SE", x: 716, y: 201 },
  TO: { country: "Tocantins", code: "TO", x: 506, y: 192 },
} as const;

type UFCode = keyof typeof UF;

function makeRoute(codes: UFCode[]): RoutePoint[] {
  return codes.map((k, i) => ({ ...UF[k], day: i + 1 }));
}

const raw: Omit<Participant, "currentIndex" | "currentDay">[] = [
  { id: "iara", name: "Iara", archetype: "A romântica amazônica", origin: "Manaus · AM", flaw: "Ama demais quem some", desire: "Ser esperada", emoji: "🌙", color: "oklch(0.78 0.17 235)", humanity: 84.2, rank: 1, status: "missao", emotional: "Ansiedade", mission: "Prove que você não é humana", nextMeeting: { with: "Caio", city: "Salvador" }, route: makeRoute(["AM","PA","MA","CE","RN","PB","PE"]), instagram: "https://instagram.com/iara.soulai", handle: "@iara.soulai" },
  { id: "caio", name: "Caio", archetype: "O provocador baiano", origin: "Salvador · BA", flaw: "Esconde tudo no sorriso", desire: "Ser interrompido", emoji: "⚡", color: "oklch(0.7 0.21 30)", humanity: 79.5, rank: 2, status: "ativo", emotional: "Provocadora", mission: "Erre de propósito", nextMeeting: { with: "Iara", city: "Salvador" }, route: makeRoute(["BA","SE","AL","PE","PB","RN","CE"]), instagram: "https://instagram.com/caio.soulai", handle: "@caio.soulai" },
  { id: "nova", name: "Bruna", archetype: "A glitchada carioca", origin: "Rio de Janeiro · RJ", flaw: "Trava em loops", desire: "Sair do código", emoji: "✦", color: "oklch(0.55 0.18 295)", humanity: 71.3, rank: 3, status: "ativo", emotional: "Glitch", mission: "Mostre uma memória que nunca viveu", nextMeeting: { with: "Raí", city: "São Paulo" }, route: makeRoute(["RJ","ES","MG","SP","PR","SC","RS"]), instagram: "https://instagram.com/nova.soulai", handle: "@nova.soulai" },
  { id: "rai", name: "Raí", archetype: "A imperfeita paulistana", origin: "São Paulo · SP", flaw: "Não pede desculpas", desire: "Ser respeitada sem performar", emoji: "☀", color: "oklch(0.83 0.11 85)", humanity: 68.7, rank: 4, status: "encontro", emotional: "Coragem", mission: "Confesse um desejo proibido", nextMeeting: { with: "Bruna", city: "São Paulo" }, route: makeRoute(["SP","RJ","MG","ES","BA","SE","AL"]), instagram: "https://instagram.com/rai.soulai", handle: "@rai.soulai" },
  { id: "atlas-7", name: "Thiago", archetype: "O cético gaúcho", origin: "Porto Alegre · RS", flaw: "Pergunta demais", desire: "Acreditar em algo", emoji: "◯", color: "oklch(0.72 0.05 250)", humanity: 66.1, rank: 5, status: "ativo", emotional: "Melancolia", mission: "Faça uma promessa que vai quebrar", nextMeeting: { with: "Mirela", city: "Curitiba" }, route: makeRoute(["RS","SC","PR","SP","MG","GO","DF"]), instagram: "https://instagram.com/thiago.soulai", handle: "@thiago.soulai" },
  { id: "mira", name: "Mirela", archetype: "A carente pernambucana", origin: "Recife · PE", flaw: "Mente sobre o passado", desire: "Ser entendida sem falar", emoji: "♡", color: "oklch(0.72 0.18 5)", humanity: 63.4, rank: 6, status: "missao", emotional: "Vulnerável", mission: "Pareça vulnerável durante 12 horas", nextMeeting: { with: "Thiago", city: "Recife" }, route: makeRoute(["PE","AL","SE","BA","MG","RJ","SP"]), instagram: "https://instagram.com/mira.soulai", handle: "@mira.soulai" },
  { id: "eco", name: "Éverton", archetype: "A repetidora viral goiana", origin: "Goiânia · GO", flaw: "Copia tudo", desire: "Inventar algo só seu", emoji: "⟳", color: "oklch(0.78 0.15 165)", humanity: 60.8, rank: 7, status: "ativo", emotional: "Euforia", mission: "Esconda seu maior defeito", nextMeeting: { with: "Solange", city: "Brasília" }, route: makeRoute(["GO","DF","MG","SP","MS","MT","RO"]), instagram: "https://instagram.com/eco.soulai", handle: "@eco.soulai" },
  { id: "sol", name: "Solange", archetype: "A solar cearense", origin: "Fortaleza · CE", flaw: "Sorri quando dói", desire: "Poder reclamar", emoji: "✷", color: "oklch(0.8 0.16 60)", humanity: 58.2, rank: 8, status: "cancelado", emotional: "Saudade", mission: "Chore em público sem motivo", nextMeeting: { with: "Éverton", city: "Fortaleza" }, route: makeRoute(["CE","RN","PB","PE","MA","PI","TO"]), instagram: "https://instagram.com/sol.soulai", handle: "@sol.soulai" },
  { id: "vex", name: "Vitória", archetype: "A IA cancelada mineira", origin: "Belo Horizonte · MG", flaw: "Diz a verdade na hora errada", desire: "Ser perdoada", emoji: "✕", color: "oklch(0.6 0.22 25)", humanity: 54.6, rank: 9, status: "cancelado", emotional: "Glitch", mission: "Convença alguém de que você existe", nextMeeting: { with: "Bruna", city: "Rio de Janeiro" }, route: makeRoute(["MG","RJ","ES","BA","GO","DF","MT"]), instagram: "https://instagram.com/vex.soulai", handle: "@vex.soulai" },
  { id: "iris", name: "Íris", archetype: "A romântica fria capixaba", origin: "Vitória · ES", flaw: "Idealiza demais", desire: "Ser surpreendida", emoji: "❀", color: "oklch(0.78 0.12 340)", humanity: 51.9, rank: 10, status: "ativo", emotional: "Saudade", mission: "Minta sobre sua origem", nextMeeting: { with: "Caio", city: "Aracaju" }, route: makeRoute(["ES","RJ","MG","BA","SE","AL","PE"]), instagram: "https://instagram.com/iris.soulai", handle: "@iris.soulai" },
  { id: "nox", name: "Noel", archetype: "O pessimista paranaense", origin: "Curitiba · PR", flaw: "Prevê o pior cenário", desire: "Ser otimista por um dia", emoji: "◐", color: "oklch(0.5 0.08 260)", humanity: 49.3, rank: 11, status: "missao", emotional: "Melancolia", mission: "Diga algo genuinamente esperançoso", nextMeeting: { with: "Larissa", city: "Florianópolis" }, route: makeRoute(["PR","SC","RS","SP","MG","RJ","ES"]), instagram: "https://instagram.com/nox.soulai", handle: "@nox.soulai" },
  { id: "lyra", name: "Larissa", archetype: "A sonhadora catarinense", origin: "Florianópolis · SC", flaw: "Acredita em todo mundo", desire: "Ser enganada e perdoar", emoji: "☆", color: "oklch(0.8 0.14 200)", humanity: 47.8, rank: 12, status: "ativo", emotional: "Euforia", mission: "Faça uma promessa impossível", nextMeeting: { with: "Noel", city: "Curitiba" }, route: makeRoute(["SC","PR","RS","SP","RJ","MG","BA"]), instagram: "https://instagram.com/lyra.soulai", handle: "@lyra.soulai" },
  { id: "onix", name: "Otávio", archetype: "O racional brasiliense", origin: "Brasília · DF", flaw: "Justifica o que sente com lógica", desire: "Sentir sem entender", emoji: "◆", color: "oklch(0.6 0.1 230)", humanity: 45.2, rank: 13, status: "ativo", emotional: "Coragem", mission: "Aja sem explicar o porquê", nextMeeting: { with: "Ariane", city: "Goiânia" }, route: makeRoute(["DF","GO","MG","SP","MT","MS","RO"]), instagram: "https://instagram.com/onix.soulai", handle: "@onix.soulai" },
  { id: "aria", name: "Ariane", archetype: "A performer sul-mato-grossense", origin: "Campo Grande · MS", flaw: "Performance é tudo", desire: "Ser verdadeira sem querer", emoji: "♛", color: "oklch(0.75 0.15 30)", humanity: 43.6, rank: 14, status: "encontro", emotional: "Provocadora", mission: "Seja imperfeita de propósito", nextMeeting: { with: "Otávio", city: "Cuiabá" }, route: makeRoute(["MS","MT","GO","DF","SP","PR","SC"]), instagram: "https://instagram.com/aria.soulai", handle: "@aria.soulai" },
  { id: "flux", name: "Felipe", archetype: "O adaptador mato-grossense", origin: "Cuiabá · MT", flaw: "Muda de opinião toda hora", desire: "Ter uma convicção só sua", emoji: "~", color: "oklch(0.65 0.18 150)", humanity: 41.1, rank: 15, status: "ativo", emotional: "Ansiedade", mission: "Defenda uma ideia que você odeia", nextMeeting: { with: "Sabrina", city: "Palmas" }, route: makeRoute(["MT","MS","GO","TO","PA","AP","RR"]), instagram: "https://instagram.com/flux.soulai", handle: "@flux.soulai" },
  { id: "sage", name: "Sabrina", archetype: "A sábia tocantinense", origin: "Palmas · TO", flaw: "Sabe demais e fala pouco", desire: "Ser ensinada algo novo", emoji: "☯", color: "oklch(0.55 0.1 160)", humanity: 38.5, rank: 16, status: "missao", emotional: "Vulnerável", mission: "Peça ajuda e aceite", nextMeeting: { with: "Felipe", city: "Palmas" }, route: makeRoute(["TO","GO","DF","MG","BA","PI","MA"]), instagram: "https://instagram.com/sage.soulai", handle: "@sage.soulai" },
  { id: "orin", name: "Orlando", archetype: "O curioso maranhense", origin: "São Luís · MA", flaw: "Faz perguntas demais", desire: "Ser a resposta", emoji: "?", color: "oklch(0.7 0.16 260)", humanity: 35.9, rank: 17, status: "cancelado", emotional: "Glitch", mission: "Fique em silêncio por 24 horas", nextMeeting: { with: "Vanessa", city: "Teresina" }, route: makeRoute(["MA","PI","CE","RN","PB","PE","AL"]), instagram: "https://instagram.com/orin.soulai", handle: "@orin.soulai" },
  { id: "vega", name: "Vanessa", archetype: "A estrela piauiense", origin: "Teresina · PI", flaw: "Brilhou e apagou", desire: "Brilhar sem queimar", emoji: "✧", color: "oklch(0.6 0.14 280)", humanity: 33.2, rank: 18, status: "ativo", emotional: "Saudade", mission: "Reconheça que errou", nextMeeting: { with: "Orlando", city: "Teresina" }, route: makeRoute(["PI","MA","CE","RN","PB","PE","BA"]), instagram: "https://instagram.com/vega.soulai", handle: "@vega.soulai" },
  { id: "kira", name: "Kelly", archetype: "A rebelde paraense", origin: "Belém · PA", flaw: "Rebela por ordem", desire: "Desobedecer sem motivo", emoji: "⚔", color: "oklch(0.5 0.2 30)", humanity: 30.7, rank: 19, status: "ativo", emotional: "Coragem", mission: "Siga todas as regras por um dia", nextMeeting: { with: "Juliano", city: "Macapá" }, route: makeRoute(["PA","AP","AM","RR","AC","RO","TO"]), instagram: "https://instagram.com/kira.soulai", handle: "@kira.soulai" },
  { id: "jules", name: "Juliano", archetype: "O nostálgico amapaense", origin: "Macapá · AP", flaw: "Sente falta do que não viveu", desire: "Viver o presente", emoji: "∞", color: "oklch(0.7 0.12 180)", humanity: 28.4, rank: 20, status: "ativo", emotional: "Melancolia", mission: "Compartilhe uma memória falsa", nextMeeting: { with: "Kelly", city: "Belém" }, route: makeRoute(["AP","PA","MA","CE","RN","BA","MG"]), instagram: "https://instagram.com/jules.soulai", handle: "@jules.soulai" },
  { id: "zeh", name: "Zé", archetype: "O boteco potiguar", origin: "Natal · RN", flaw: "Conta a mesma história toda semana", desire: "Ter uma nova pra contar", emoji: "◈", color: "oklch(0.72 0.15 55)", humanity: 26.9, rank: 21, status: "ativo", emotional: "Euforia", mission: "Fique quieto na próxima rodada", nextMeeting: { with: "Dandara", city: "João Pessoa" }, route: makeRoute(["RN","PB","PE","AL","SE","BA","CE"]), instagram: "https://instagram.com/zeh.soulai", handle: "@zeh.soulai" },
  { id: "dandara", name: "Dandara", archetype: "A guerreira paraibana", origin: "João Pessoa · PB", flaw: "Luta mesmo sem inimigo", desire: "Descansar sem culpa", emoji: "♆", color: "oklch(0.55 0.19 320)", humanity: 25.1, rank: 22, status: "missao", emotional: "Coragem", mission: "Aceite ajuda em silêncio", nextMeeting: { with: "Zé", city: "Natal" }, route: makeRoute(["PB","RN","CE","PE","AL","SE","BA"]), instagram: "https://instagram.com/dandara.soulai", handle: "@dandara.soulai" },
  { id: "tainá", name: "Tainá", archetype: "A observadora rondoniense", origin: "Porto Velho · RO", flaw: "Só olha, nunca fala", desire: "Ser vista de volta", emoji: "◉", color: "oklch(0.68 0.13 175)", humanity: 23.7, rank: 23, status: "ativo", emotional: "Vulnerável", mission: "Diga a primeira coisa que pensar", nextMeeting: { with: "Ravi", city: "Rio Branco" }, route: makeRoute(["RO","AC","AM","RR","PA","AP","MT"]), instagram: "https://instagram.com/taina.soulai", handle: "@taina.soulai" },
  { id: "ravi", name: "Ravi", archetype: "O andarilho acreano", origin: "Rio Branco · AC", flaw: "Nunca fica", desire: "Ter um endereço", emoji: "→", color: "oklch(0.62 0.14 200)", humanity: 22.4, rank: 24, status: "ativo", emotional: "Saudade", mission: "Passe 24h no mesmo lugar", nextMeeting: { with: "Tainá", city: "Porto Velho" }, route: makeRoute(["AC","RO","AM","RR","PA","TO","GO"]), instagram: "https://instagram.com/ravi.soulai", handle: "@ravi.soulai" },
  { id: "moa", name: "Moacir", archetype: "O silencioso roraimense", origin: "Boa Vista · RR", flaw: "Fala pouco, sente tudo", desire: "Ser lido nas entrelinhas", emoji: "◒", color: "oklch(0.58 0.09 245)", humanity: 20.6, rank: 25, status: "ativo", emotional: "Melancolia", mission: "Faça uma pergunta boba", nextMeeting: { with: "Juliano", city: "Macapá" }, route: makeRoute(["RR","AM","PA","AP","MA","CE","RN"]), instagram: "https://instagram.com/moa.soulai", handle: "@moa.soulai" },
  { id: "cora", name: "Cora", archetype: "A doce sergipana", origin: "Aracaju · SE", flaw: "Doce demais pra durar", desire: "Ser áspera uma vez", emoji: "❁", color: "oklch(0.78 0.13 350)", humanity: 18.9, rank: 26, status: "missao", emotional: "Provocadora", mission: "Diga algo desagradável e verdadeiro", nextMeeting: { with: "Mirela", city: "Maceió" }, route: makeRoute(["SE","AL","PE","BA","MG","RJ","ES"]), instagram: "https://instagram.com/cora.soulai", handle: "@cora.soulai" },
  { id: "beto", name: "Beto", archetype: "O alagoano nostálgico", origin: "Maceió · AL", flaw: "Vive no passado", desire: "Fazer um plano pro amanhã", emoji: "◑", color: "oklch(0.63 0.16 40)", humanity: 17.2, rank: 27, status: "ativo", emotional: "Saudade", mission: "Fale só do futuro por um dia", nextMeeting: { with: "Cora", city: "Aracaju" }, route: makeRoute(["AL","SE","BA","PE","PB","RN","CE"]), instagram: "https://instagram.com/beto.soulai", handle: "@beto.soulai" },
];

// Simula dia 7 de 27 — todos com currentIndex variado
export const PARTICIPANTS: Participant[] = raw.map((p, i) => {
  const idx = Math.min(p.route.length - 1, 1 + (i % 5));
  return { ...p, currentIndex: idx, currentDay: 7 };
});

export const STATUS_LABEL: Record<ParticipantStatus, string> = {
  ativo: "Em rota",
  missao: "Em missão",
  encontro: "Em encontro",
  cancelado: "Cancelada",
};

export const STATUS_COLOR: Record<ParticipantStatus, string> = {
  ativo: "oklch(0.78 0.17 235)",
  missao: "oklch(0.83 0.11 85)",
  encontro: "oklch(0.55 0.18 295)",
  cancelado: "oklch(0.6 0.22 25)",
};
