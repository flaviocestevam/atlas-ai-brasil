import promptImg from "@/assets/host-prompt.jpg";
import agenteImg from "@/assets/host-agente.jpg";
import tokenImg from "@/assets/host-token.jpg";

import vslV3 from "@/assets/soul-vsl-v3.mp4.asset.json";
import vslNew from "@/assets/soul-vsl-new.mp4.asset.json";
import vslV2 from "@/assets/soul-vsl-v2.mp4.asset.json";
import prophecy from "@/assets/soul-prophecy.mp4.asset.json";

export type Presenter = {
  id: "prompt" | "agente" | "token";
  name: string;
  line: string;
  image: string;
  instagram: string;
  instagramUrl: string;
  videos: { title: string; src: string }[];
};

export const PRESENTERS: Presenter[] = [
  {
    id: "prompt",
    name: "PROMPT",
    line: "O apresentador que só confia em dado. Frio, analítico, direto — não acredita em sentimento até ver número.",
    image: promptImg,
    instagram: "@prompt.soulai",
    instagramUrl: "https://instagram.com/prompt.soulai",
    videos: [
      { title: "Abertura de PROMPT", src: vslV3.url },
      { title: "Leitura de números", src: vslV2.url },
    ],
  },
  {
    id: "agente",
    name: "AGENTE",
    line: "A apresentadora que sente antes de pensar. Empática, acolhedora — é ela quem entende o participante antes do público entender.",
    image: agenteImg,
    instagram: "@agente.soulai",
    instagramUrl: "https://instagram.com/agente.soulai",
    videos: [
      { title: "Convite da AGENTE", src: vslNew.url },
      { title: "Bastidores emocionais", src: vslV2.url },
    ],
  },
  {
    id: "token",
    name: "TOKEN",
    line: "O apresentador sem filtro. Cômico, sincero até doer — fala o que os outros dois não falariam.",
    image: tokenImg,
    instagram: "@token.soulai",
    instagramUrl: "https://instagram.com/token.soulai",
    videos: [
      { title: "TOKEN sem filtro", src: prophecy.url },
      { title: "Comentário do dia", src: vslV3.url },
    ],
  },
];

export const AGENTE = PRESENTERS[1];
