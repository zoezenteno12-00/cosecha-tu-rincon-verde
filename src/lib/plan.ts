import { plantas, type Planta } from "./data";

export type Interes = "hojas" | "frutos" | "raices" | "aromaticas";
export type Temporada = "P-V" | "O-I";
export type Sol = "menos6" | "6a8" | "mas8";

// Parte que se aprovecha de cada planta (clasificación general).
export const categoria: Record<string, Interes> = {
  Acelga: "hojas", Apio: "hojas", Col: "hojas", Espinaca: "hojas", Lechuga: "hojas", Brócoli: "hojas", Coliflor: "hojas",
  Calabacita: "frutos", Calabaza: "frutos", Chícharo: "frutos", Chile: "frutos", Ejote: "frutos", Jitomate: "frutos",
  Maíz: "frutos", Pepino: "frutos", "Tomate verde": "frutos",
  Ajo: "raices", Betabel: "raices", Cebolla: "raices", Papa: "raices", Rábano: "raices", Zanahoria: "raices",
  Cilantro: "aromaticas", Perejil: "aromaticas",
};

export function litros(p: Planta): number | null {
  const m = p.contenedor?.match(/^(\d+)\s*L/);
  return m ? Number(m[1]) : null;
}

export interface Respuestas {
  intereses: Interes[];
  temporada: Temporada;
  maxLitros: number;
  sol: Sol;
}

export function recomendar(r: Respuestas): Planta[] {
  return plantas.filter((p) => {
    const l = litros(p);
    if (l === null || l > r.maxLitros) return false;
    if (p.ciclo !== "Todo el año" && p.ciclo !== r.temporada) return false;
    const c = categoria[p.nombre];
    return r.intereses.length === 0 || (c !== undefined && r.intereses.includes(c));
  });
}

export function temporadaActual(mes: number): Temporada {
  // mes 0-11; Primavera–Verano ≈ marzo a agosto
  return mes >= 2 && mes <= 7 ? "P-V" : "O-I";
}
