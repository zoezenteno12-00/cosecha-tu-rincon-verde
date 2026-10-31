import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import img from "@/assets/plantas.jpg";
import { plantas, type Ciclo } from "@/lib/data";
import { PageHeader, NextSection, SourceNote } from "@/components/site";

export const Route = createFileRoute("/plantas")({
  head: () => ({
    meta: [
      { title: "Plantas para tu huerto casero — Tu propio huerto" },
      { name: "description", content: "24 hortalizas para cultivar en casa con su ciclo, tipo de siembra, distancia y tamaño de maceta." },
      { property: "og:title", content: "Plantas para tu huerto casero" },
      { property: "og:description", content: "Explora todo lo que puedes cultivar en casa." },
    ],
  }),
  component: Plantas,
});

const filtros: ("Todas" | Ciclo)[] = ["Todas", "Todo el año", "P-V", "O-I"];
const etiqueta: Record<string, string> = { "P-V": "Primavera–Verano", "O-I": "Otoño–Invierno", "Todo el año": "Todo el año", Todas: "Todas" };

function Plantas() {
  const [filtro, setFiltro] = useState<(typeof filtros)[number]>("Todas");
  const [q, setQ] = useState("");
  const lista = useMemo(
    () => plantas.filter((p) => (filtro === "Todas" || p.ciclo === filtro) && p.nombre.toLowerCase().includes(q.toLowerCase())),
    [filtro, q],
  );

  return (
    <>
      <PageHeader title="PLANTAS" subtitle="Explora todo lo que puedes cultivar en casa." image={img} />
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por época">
            {filtros.map((f) => (
              <button key={f} onClick={() => setFiltro(f)} aria-pressed={filtro === f}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${filtro === f ? "bg-leaf text-leaf-foreground" : "bg-accent text-accent-foreground hover:opacity-80"}`}>
                {etiqueta[f]}
              </button>
            ))}
          </div>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar planta…" aria-label="Buscar planta"
            className="w-full rounded-full border bg-card px-5 py-2.5 md:w-64" />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{lista.length} plantas</p>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((p) => (
            <li key={p.nombre} className="rounded-2xl border bg-card p-5 transition hover:shadow-md">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-2xl">{p.nombre}</h2>
                <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">{etiqueta[p.ciclo]}</span>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <dt className="text-muted-foreground">Siembra</dt><dd>{p.siembra}</dd>
                <dt className="text-muted-foreground">Distancia mínima</dt><dd>{p.distanciaCm} cm</dd>
                <dt className="text-muted-foreground">Ciclo</dt><dd>{p.dias} días</dd>
                <dt className="text-muted-foreground">Maceta</dt><dd>{p.contenedor ?? "Sin dato"}</dd>
              </dl>
            </li>
          ))}
        </ul>
        <SourceNote>INIFAP (2023), Cuadro 1; tamaños de maceta: SMA Coahuila (2021).</SourceNote>
      </section>
      <NextSection to="/materiales" label="Materiales" />
    </>
  );
}
