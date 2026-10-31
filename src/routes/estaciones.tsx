import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import img from "@/assets/estaciones.jpg";
import { plantas, type Ciclo } from "@/lib/data";
import { PageHeader, NextSection, SourceNote } from "@/components/site";

export const Route = createFileRoute("/estaciones")({
  head: () => ({
    meta: [
      { title: "Cuándo sembrar cada planta — Tu propio huerto" },
      { name: "description", content: "Qué hortalizas sembrar en primavera, verano, otoño e invierno según los ciclos agrícolas de México." },
      { property: "og:title", content: "Estaciones de siembra" },
      { property: "og:description", content: "Descubre qué sembrar en cada estación del año." },
    ],
  }),
  component: Estaciones,
});

const estaciones: { n: string; ciclo: Ciclo; icon: string }[] = [
  { n: "Primavera", ciclo: "P-V", icon: "🌱" },
  { n: "Verano", ciclo: "P-V", icon: "☀️" },
  { n: "Otoño", ciclo: "O-I", icon: "🍂" },
  { n: "Invierno", ciclo: "O-I", icon: "❄️" },
];

function Estaciones() {
  const [sel, setSel] = useState(0);
  const e = estaciones[sel] ?? estaciones[0]!;
  const propias = plantas.filter((p) => p.ciclo === e.ciclo);
  const todoAno = plantas.filter((p) => p.ciclo === "Todo el año");

  return (
    <>
      <PageHeader title="ESTACIONES" subtitle="Elige una estación y descubre qué puedes sembrar." image={img} />
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div role="tablist" className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {estaciones.map((s, i) => (
            <button key={s.n} role="tab" aria-selected={sel === i} onClick={() => setSel(i)}
              className={`rounded-2xl px-4 py-5 font-display text-xl tracking-[0.15em] transition md:text-2xl ${sel === i ? "bg-primary text-primary-foreground shadow-lg" : "bg-secondary text-secondary-foreground hover:opacity-80"}`}>
              <span aria-hidden className="mr-2">{s.icon}</span>{s.n.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="text-2xl">Ciclo {e.ciclo === "P-V" ? "Primavera–Verano" : "Otoño–Invierno"}</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {propias.map((p) => <li key={p.nombre} className="rounded-full bg-leaf px-3 py-1.5 text-sm text-leaf-foreground">{p.nombre}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="text-2xl">También se siembran todo el año</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {todoAno.map((p) => <li key={p.nombre} className="rounded-full bg-accent px-3 py-1.5 text-sm text-accent-foreground">{p.nombre}</li>)}
            </ul>
          </div>
        </div>
        <p className="mt-6 rounded-2xl bg-muted p-5 text-sm text-muted-foreground">
          Las fechas exactas varían según el clima de tu región. Para tu zona, consulta el Calendario Agrícola de SADER o las guías locales.
        </p>
        <SourceNote>INIFAP (2023), Cuadro 1; SADER, Calendario Agrícola.</SourceNote>
      </section>
      <NextSection to="/tips" label="Tips" />
    </>
  );
}
