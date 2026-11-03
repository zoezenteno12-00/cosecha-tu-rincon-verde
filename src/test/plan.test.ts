import { describe, it, expect } from "vitest";
import { recomendar, temporadaActual } from "@/lib/plan";

describe("plan personalizado", () => {
  it("con maceta de 4 L no recomienda jitomate (19 L)", () => {
    const r = recomendar({ intereses: [], temporada: "P-V", maxLitros: 4, sol: "6a8" });
    expect(r.some((p) => p.nombre === "Jitomate")).toBe(false);
    expect(r.some((p) => p.nombre === "Lechuga")).toBe(true);
  });
  it("en otoño-invierno no recomienda chile (P-V)", () => {
    const r = recomendar({ intereses: ["frutos"], temporada: "O-I", maxLitros: 19, sol: "mas8" });
    expect(r.some((p) => p.nombre === "Chile")).toBe(false);
    expect(r.some((p) => p.nombre === "Jitomate")).toBe(true);
  });
  it("solo aromáticas con 1 L da cilantro", () => {
    const r = recomendar({ intereses: ["aromaticas"], temporada: "P-V", maxLitros: 1, sol: "6a8" });
    expect(r.map((p) => p.nombre)).toEqual(["Cilantro"]);
  });
  it("noviembre es otoño-invierno", () => {
    expect(temporadaActual(10)).toBe("O-I");
  });
});
