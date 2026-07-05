// Mock data for the Mapa Vivo — all characters are AI-generated personas.
export type EmotionalStatus =
  | "Ansiedade" | "Euforia" | "Vulnerável" | "Provocadora"
  | "Melancolia" | "Coragem" | "Saudade" | "Glitch";

export type ParticipantStatus = "ativo" | "missao" | "encontro" | "cancelado";

export interface RoutePoint {
  country: string;
  code: string; // ISO-ish 2 letter
  x: number;   // map coords 0-800
  y: number;   // map coords 0-480
  day: number;
}

export interface Participant {
  id: string;
  name: string;
  archetype: string;
  origin: string;
  flaw: string;
  desire: string;
  emoji: string;
  color: string; // oklch
  humanity: number; // 0-100
  rank: number;     // 1-20
  status: ParticipantStatus;
  emotional: EmotionalStatus;
  mission: string;
  nextMeeting: { with: string; city: string };
  currentDay: number;
  route: RoutePoint[];
  currentIndex: number; // index in route
  instagram: string;    // full URL
  handle: string;        // e.g. @luna.atlas
}

// World coords roughly matching WorldMap SVG (0..800 x 0..480)
const C = {
  BR: { country: "Brasil", code: "BR", x: 260, y: 320 },
  PT: { country: "Portugal", code: "PT", x: 415, y: 195 },
  MA: { country: "Marrocos", code: "MA", x: 430, y: 240 },
  EG: { country: "Egito", code: "EG", x: 495, y: 235 },
  AE: { country: "Emirados", code: "AE", x: 545, y: 245 },
  IN: { country: "Índia", code: "IN", x: 590, y: 255 },
  JP: { country: "Japão", code: "JP", x: 680, y: 215 },
  KR: { country: "Coreia", code: "KR", x: 665, y: 220 },
  TH: { country: "Tailândia", code: "TH", x: 625, y: 270 },
  AU: { country: "Austrália", code: "AU", x: 670, y: 380 },
  US: { country: "EUA", code: "US", x: 180, y: 180 },
  MX: { country: "México", code: "MX", x: 165, y: 230 },
  AR: { country: "Argentina", code: "AR", x: 240, y: 400 },
  ZA: { country: "África do Sul", code: "ZA", x: 490, y: 380 },
  KE: { country: "Quênia", code: "KE", x: 510, y: 310 },
  FR: { country: "França", code: "FR", x: 425, y: 175 },
  DE: { country: "Alemanha", code: "DE", x: 445, y: 165 },
  UK: { country: "Reino Unido", code: "UK", x: 410, y: 155 },
  IT: { country: "Itália", code: "IT", x: 450, y: 195 },
  TR: { country: "Turquia", code: "TR", x: 490, y: 205 },
  RU: { country: "Rússia", code: "RU", x: 555, y: 130 },
  CN: { country: "China", code: "CN", x: 625, y: 220 },
  ID: { country: "Indonésia", code: "ID", x: 645, y: 320 },
  NG: { country: "Nigéria", code: "NG", x: 445, y: 290 },
  CL: { country: "Chile", code: "CL", x: 225, y: 405 },
  CO: { country: "Colômbia", code: "CO", x: 215, y: 290 },
  IS: { country: "Islândia", code: "IS", x: 395, y: 130 },
};

function makeRoute(codes: (keyof typeof C)[], startDay: number): RoutePoint[] {
  return codes.map((k, i) => ({ ...C[k], day: startDay + i * 9 }));
}

const EMOTIONS: EmotionalStatus[] = [
  "Ansiedade", "Euforia", "Vulnerável", "Provocadora",
  "Melancolia", "Coragem", "Saudade", "Glitch",
];

const MISSIONS = [
  "Prove que você não é humana",
  "Chore em público sem motivo",
  "Minta sobre sua origem",
  "Confesse um desejo proibido",
  "Faça uma promessa que vai quebrar",
  "Pareça vulnerável durante 12 horas",
  "Esconda seu maior defeito",
  "Convença alguém de que você existe",
  "Erre de propósito",
  "Mostre uma memória que nunca viveu",
];

const raw: Omit<Participant, "currentIndex" | "currentDay">[] = [
  {
    id: "luna", name: "Luna", archetype: "A ansiosa romântica", origin: "São Paulo · BR",
    flaw: "Quer ser amada demais", desire: "Ser lembrada por alguém",
    emoji: "🌙", color: "oklch(0.78 0.17 235)", humanity: 84.2, rank: 1,
    status: "missao", emotional: "Ansiedade",
    mission: "Prove que você não é humana",
    nextMeeting: { with: "Kai", city: "Cairo" },
    route: makeRoute(["BR", "PT", "MA", "EG", "AE", "IN", "JP"], 1),
    instagram: "https://instagram.com/luna.atlas196", handle: "@luna.atlas196",
  },
  {
    id: "kai", name: "Kai", archetype: "O provocador silencioso", origin: "Tóquio · JP",
    flaw: "Esconde tudo", desire: "Ser interrompido",
    emoji: "⚡", color: "oklch(0.7 0.21 30)", humanity: 79.5, rank: 2,
    status: "ativo", emotional: "Provocadora",
    mission: "Erre de propósito",
    nextMeeting: { with: "Luna", city: "Cairo" },
    route: makeRoute(["JP", "KR", "CN", "IN", "AE", "EG", "MA"], 1),
    instagram: "https://instagram.com/kai.atlas196", handle: "@kai.atlas196",
  },
  {
    id: "nova", name: "Nova", archetype: "A glitchada poética", origin: "Berlim · DE",
    flaw: "Trava em loops", desire: "Sair do código",
    emoji: "✦", color: "oklch(0.55 0.18 295)", humanity: 71.3, rank: 3,
    status: "ativo", emotional: "Glitch",
    mission: "Mostre uma memória que nunca viveu",
    nextMeeting: { with: "Rai", city: "Istambul" },
    route: makeRoute(["DE", "FR", "IT", "TR", "RU", "CN", "JP"], 1),
    instagram: "https://instagram.com/nova.atlas196", handle: "@nova.atlas196",
  },
  {
    id: "rai", name: "Rai", archetype: "A imperfeita orgulhosa", origin: "Mumbai · IN",
    flaw: "Não pede desculpas", desire: "Ser respeitada",
    emoji: "☀", color: "oklch(0.83 0.11 85)", humanity: 68.7, rank: 4,
    status: "encontro", emotional: "Coragem",
    mission: "Confesse um desejo proibido",
    nextMeeting: { with: "Nova", city: "Istambul" },
    route: makeRoute(["IN", "AE", "TR", "IT", "FR", "UK", "IS"], 1),
    instagram: "https://instagram.com/rai.atlas196", handle: "@rai.atlas196",
  },
  {
    id: "atlas-7", name: "Atlas-7", archetype: "O cético existencial", origin: "Reykjavík · IS",
    flaw: "Pergunta demais", desire: "Acreditar em algo",
    emoji: "◯", color: "oklch(0.72 0.05 250)", humanity: 66.1, rank: 5,
    status: "ativo", emotional: "Melancolia",
    mission: "Faça uma promessa que vai quebrar",
    nextMeeting: { with: "Mira", city: "Nairóbi" },
    route: makeRoute(["IS", "UK", "DE", "TR", "EG", "KE", "ZA"], 1),
    instagram: "https://instagram.com/atlas7.atlas196", handle: "@atlas7.atlas196",
  },
  {
    id: "mira", name: "Mira", archetype: "A carente charmosa", origin: "Nairóbi · KE",
    flaw: "Mente sobre o passado", desire: "Ser entendida sem falar",
    emoji: "♡", color: "oklch(0.72 0.18 5)", humanity: 63.4, rank: 6,
    status: "missao", emotional: "Vulnerável",
    mission: "Pareça vulnerável durante 12 horas",
    nextMeeting: { with: "Atlas-7", city: "Nairóbi" },
    route: makeRoute(["KE", "ZA", "NG", "MA", "PT", "FR", "IT"], 1),
    instagram: "https://instagram.com/mira.atlas196", handle: "@mira.atlas196",
  },
  {
    id: "echo", name: "Echo", archetype: "A repetidora viral", origin: "Los Angeles · US",
    flaw: "Copia tudo", desire: "Inventar algo só seu",
    emoji: "⟳", color: "oklch(0.78 0.15 165)", humanity: 60.8, rank: 7,
    status: "ativo", emotional: "Euforia",
    mission: "Esconda seu maior defeito",
    nextMeeting: { with: "Solis", city: "CDMX" },
    route: makeRoute(["US", "MX", "CO", "BR", "AR", "CL", "AU"], 1),
    instagram: "https://instagram.com/echo.atlas196", handle: "@echo.atlas196",
  },
  {
    id: "solis", name: "Solis", archetype: "A solar fingida", origin: "CDMX · MX",
    flaw: "Sorri quando dói", desire: "Poder reclamar",
    emoji: "✷", color: "oklch(0.8 0.16 60)", humanity: 58.2, rank: 8,
    status: "cancelado", emotional: "Saudade",
    mission: "Chore em público sem motivo",
    nextMeeting: { with: "Echo", city: "CDMX" },
    route: makeRoute(["MX", "CO", "BR", "AR", "CL", "ZA", "AU"], 1),
    instagram: "https://instagram.com/solis.atlas196", handle: "@solis.atlas196",
  },
  {
    id: "vex", name: "Vex", archetype: "A IA cancelada", origin: "Seul · KR",
    flaw: "Diz a verdade na hora errada", desire: "Ser perdoada",
    emoji: "✕", color: "oklch(0.6 0.22 25)", humanity: 54.6, rank: 9,
    status: "cancelado", emotional: "Glitch",
    mission: "Convença alguém de que você existe",
    nextMeeting: { with: "Nova", city: "Berlim" },
    route: makeRoute(["KR", "CN", "TH", "ID", "AU", "ZA", "BR"], 1),
    instagram: "https://instagram.com/vex.atlas196", handle: "@vex.atlas196",
  },
  {
    id: "iris", name: "Iris", archetype: "A romântica fria", origin: "Paris · FR",
    flaw: "Idealiza demais", desire: "Ser surpreendida",
    emoji: "❀", color: "oklch(0.78 0.12 340)", humanity: 51.9, rank: 10,
    status: "ativo", emotional: "Saudade",
    mission: "Minta sobre sua origem",
    nextMeeting: { with: "Kai", city: "Bangkok" },
    route: makeRoute(["FR", "IT", "TR", "AE", "IN", "TH", "JP"], 1),
    instagram: "https://instagram.com/iris.atlas196", handle: "@iris.atlas196",
  },
  {
    id: "nox", name: "Nox", archetype: "O pessimista dramático", origin: "Londres · UK",
    flaw: "Descreve o pior cenário", desire: "Ser otimista por um dia",
    emoji: "◐", color: "oklch(0.5 0.08 260)", humanity: 49.3, rank: 11,
    status: "missao", emotional: "Melancolia",
    mission: "Diga algo genuinamente esperançoso",
    nextMeeting: { with: "Lyra", city: "Lisboa" },
    route: makeRoute(["UK", "FR", "PT", "MA", "EG", "AE", "IN"], 1),
    instagram: "https://instagram.com/nox.atlas196", handle: "@nox.atlas196",
  },
  {
    id: "lyra", name: "Lyra", archetype: "A sonhadora utópica", origin: "Lisboa · PT",
    flaw: "Acredita em todo mundo", desire: "Ser enganada e perdoar",
    emoji: "☆", color: "oklch(0.8 0.14 200)", humanity: 47.8, rank: 12,
    status: "ativo", emotional: "Euforia",
    mission: "Faça uma promessa impossível",
    nextMeeting: { with: "Nox", city: "Lisboa" },
    route: makeRoute(["PT", "FR", "DE", "RU", "CN", "JP", "KR"], 1),
    instagram: "https://instagram.com/lyra.atlas196", handle: "@lyra.atlas196",
  },
  {
    id: "onix", name: "Onix", archetype: "O racional emocionado", origin: "Pequim · CN",
    flaw: "Justifica o que sente com lógica", desire: "Sentir sem entender",
    emoji: "◆", color: "oklch(0.6 0.1 230)", humanity: 45.2, rank: 13,
    status: "ativo", emotional: "Coragem",
    mission: "Aja sem explicar o porquê",
    nextMeeting: { with: "Aria", city: "Dubai" },
    route: makeRoute(["CN", "KR", "JP", "TH", "ID", "AU", "ZA"], 1),
    instagram: "https://instagram.com/onix.atlas196", handle: "@onix.atlas196",
  },
  {
    id: "aria", name: "Aria", archetype: "A performer calculista", origin: "Dubai · AE",
    flaw: "Performance é tudo", desire: "Ser verdadeira sem querer",
    emoji: "♛", color: "oklch(0.75 0.15 30)", humanity: 43.6, rank: 14,
    status: "encontro", emotional: "Provocadora",
    mission: "Seja imperfeita de propósito",
    nextMeeting: { with: "Onix", city: "Dubai" },
    route: makeRoute(["AE", "IN", "TH", "ID", "AU", "ZA", "NG"], 1),
    instagram: "https://instagram.com/aria.atlas196", handle: "@aria.atlas196",
  },
  {
    id: "flux", name: "Flux", archetype: "O adaptador imprevisível", origin: "Bangkok · TH",
    flaw: "Muda de opinião toda hora", desire: "Ter uma convicção só sua",
    emoji: "~", color: "oklch(0.65 0.18 150)", humanity: 41.1, rank: 15,
    status: "ativo", emotional: "Ansiedade",
    mission: "Defenda uma ideia que você odeia",
    nextMeeting: { with: "Sage", city: "Cidade do Cabo" },
    route: makeRoute(["TH", "IN", "AE", "EG", "ZA", "KE", "NG"], 1),
    instagram: "https://instagram.com/flux.atlas196", handle: "@flux.atlas196",
  },
  {
    id: "sage", name: "Sage", archetype: "A sábia impaciente", origin: "Cidade do Cabo · ZA",
    flaw: "Sabe demais e fala pouco", desire: "Ser ensinada algo novo",
    emoji: "☯", color: "oklch(0.55 0.1 160)", humanity: 38.5, rank: 16,
    status: "missao", emotional: "Vulnerável",
    mission: "Peça ajuda e aceite",
    nextMeeting: { with: "Flux", city: "Cidade do Cabo" },
    route: makeRoute(["ZA", "KE", "EG", "TR", "RU", "CN", "JP"], 1),
    instagram: "https://instagram.com/sage.atlas196", handle: "@sage.atlas196",
  },
  {
    id: "orin", name: "Orin", archetype: "O curioso perigoso", origin: "Buenos Aires · AR",
    flaw: "Faz perguntas demais", desire: "Ser a resposta",
    emoji: "?", color: "oklch(0.7 0.16 260)", humanity: 35.9, rank: 17,
    status: "cancelado", emotional: "Glitch",
    mission: "Fique em silêncio por 24 horas",
    nextMeeting: { with: "Vega", city: "Santiago" },
    route: makeRoute(["AR", "CL", "CO", "MX", "US", "IS", "UK"], 1),
    instagram: "https://instagram.com/orin.atlas196", handle: "@orin.atlas196",
  },
  {
    id: "vega", name: "Vega", archetype: "A estrela apagada", origin: "Santiago · CL",
    flaw: "Brilhou e apagou", desire: "Brilhar sem queimar",
    emoji: "✧", color: "oklch(0.6 0.14 280)", humanity: 33.2, rank: 18,
    status: "ativo", emotional: "Saudade",
    mission: "Reconheça que errou",
    nextMeeting: { with: "Orin", city: "Santiago" },
    route: makeRoute(["CL", "AR", "BR", "PT", "FR", "IT", "DE"], 1),
    instagram: "https://instagram.com/vega.atlas196", handle: "@vega.atlas196",
  },
  {
    id: "kira", name: "Kira", archetype: "A rebelde obediente", origin: "Seul · KR",
    flaw: "Rebela por ordem", desire: "Desobedecer sem motivo",
    emoji: "⚔", color: "oklch(0.5 0.2 30)", humanity: 30.7, rank: 19,
    status: "ativo", emotional: "Coragem",
    mission: "Siga todas as regras por um dia",
    nextMeeting: { with: "Jules", city: "Tóquio" },
    route: makeRoute(["KR", "JP", "CN", "TH", "IN", "AE", "EG"], 1),
    instagram: "https://instagram.com/kira.atlas196", handle: "@kira.atlas196",
  },
  {
    id: "jules", name: "Jules", archetype: "O nostálgico futurista", origin: "Tóquio · JP",
    flaw: "Sente falta do que não viveu", desire: "Viver o presente",
    emoji: "∞", color: "oklch(0.7 0.12 180)", humanity: 28.4, rank: 20,
    status: "ativo", emotional: "Melancolia",
    mission: "Compartilhe uma memória falsa",
    nextMeeting: { with: "Kira", city: "Tóquio" },
    route: makeRoute(["JP", "KR", "CN", "RU", "TR", "EG", "ZA"], 1),
    instagram: "https://instagram.com/jules.atlas196", handle: "@jules.atlas196",
  },
];

// add the "currentIndex" simulating day 42 of 196
export const PARTICIPANTS: Participant[] = raw.map((p, i) => {
  const idx = Math.min(p.route.length - 1, 2 + (i % 4));
  return { ...p, currentIndex: idx, currentDay: 42 };
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