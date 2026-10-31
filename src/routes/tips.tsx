import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { NextSection, SourceNote } from "@/components/site";

export const Route = createFileRoute("/tips")({
  head: () => ({
    meta: [
      { title: "Consejos para tu huerto casero — Tu propio huerto" },
      { name: "description", content: "Luz, riego, abonos naturales y plantas compañeras para cuidar tu huerto en casa." },
      { property: "og:title", content: "Tips para tu huerto" },
      { property: "og:description", content: "Consejos prácticos para cuidar tu huerto casero." },
    ],
  }),
  component: Tips,
});

const categorias = [
  { t: "Luz y ubicación", items: [
    "La mayoría de las hortalizas necesitan mínimo 6 horas de sol.",
    "Marca en el suelo dónde llega el sol directo y dónde deja de llegar para contar las horas de luz.",
    "Ubica tus plantas en un sitio abierto y soleado, con al menos medio día de sol.",
    "Gira las macetas de vez en cuando para un crecimiento uniforme.",
  ]},
  { t: "Riego y cuidado", items: [
    "Las plantas en maceta necesitan más riego y abono que las cultivadas en tierra.",
    "Si tienes mascotas, protege tu huerto con malla o arpillera.",
    "Siembra en hileras con poca separación para aprovechar el espacio.",
  ]},
  { t: "Abonos naturales", items: [
    "Puedes usar cascarones de huevo, ceniza, estiércol seco o té de cáscara de plátano.",
    "El agua de cocción de verduras sin sal, mezclada con agua, sirve para regar.",
    "Agrega composta para que la tierra de tus macetas no se agote.",
  ]},
  { t: "Plantas comadres", items: [
    "Algunas plantas crecen mejor acompañadas de otras.",
    "Asociar el tomate con cebolla, flores y hierbas aromáticas mejora su sabor y lo protege de plagas.",
    "Combinar plantas de hoja, raíz, fruto y aromáticas aprovecha mejor el espacio.",
  ]},
];

function Tips() {
  const [open, setOpen] = useState(0);
  return (
    <>
      <section className="mx-auto max-w-3xl px-4 py-12 text-center md:py-16">
        <h1 className="text-5xl md:text-7xl">TIPS</h1>
        <div className="rule-line my-5" />
        <p className="text-lg text-muted-foreground">Toca una categoría para ver sus consejos.</p>
      </section>
      <section className="mx-auto max-w-3xl px-4 pb-12">
        <ul className="space-y-3">
          {categorias.map((c, i) => (
            <li key={c.t} className="overflow-hidden rounded-2xl border bg-card">
              <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                <span className="font-display text-2xl">{c.t}</span>
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-xl text-primary-foreground transition ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {open === i && (
                <ul className="list-disc space-y-2 px-10 pb-6 text-muted-foreground">
                  {c.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <SourceNote>SMA Coahuila (2021), "Manual de trabajo: Huertos urbanos".</SourceNote>
      </section>
      <NextSection to="/fuentes" label="Fuentes" />
    </>
  );
}
