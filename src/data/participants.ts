// Estados do Brasil — pré-lançamento: todas as 27 vagas estão em aberto.
export type SlotStatus = "vaga-aberta";

export interface StateSlot {
  code: string;
  name: string;
  status: SlotStatus;
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

export type UFCode = keyof typeof UF;

export const STATE_SLOTS: StateSlot[] = (Object.keys(UF) as UFCode[])
  .sort()
  .map((code) => ({ code, name: UF[code].country, status: "vaga-aberta" as const }));

export const SLOT_LABEL = "vaga em aberto";
