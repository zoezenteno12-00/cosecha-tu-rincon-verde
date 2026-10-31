import { createFileRoute } from "@tanstack/react-router";
import img from "@/assets/materiales.jpg";
import { PageHeader, NextSection, SourceNote } from "@/components/site";

export const Route = createFileRoute("/materiales")({
  head: () => ({
    meta: [
      { title: "Materiales para un huerto casero — Tu propio huerto" },
      { name: "description", content: "Contenedores, drenaje, tierra y composta: lo que necesitas para iniciar tu huerto en casa." },
      { property: "og:title", content: "Materiales para tu huerto" },
      { property: "og:description", content: "¿Qué necesito para iniciar mi huerto casero?" },
    ],
  }),
  component: Materiales,
});

const materiales = [
  { t: "Contenedores", d: "Macetas de plástico o barro, cubetas viejas, canastos o cajas de madera. Para hortalizas anuales se recomienda una profundidad de 40–50 cm." },
  { t: "Drenaje", d: "Haz hoyos en la base (por ejemplo con un clavo caliente, separados unos 2 cm). Agrega unos 3 cm de grava o piedras al fondo; no sustituye a los hoyos." },
  { t: "Tierra y composta", d: "La composta aporta nutrientes, mejora la estructura y ayuda a retener agua. Puede usarse a partir de los 3 meses de elaborada." },
  { t: "Semillas o plántulas", d: "Algunas plantas se siembran directo y otras por trasplante desde un semillero. Revisa cada una en la sección Plantas." },
];

function Materiales() {
  return (
    <>
      <PageHeader script="nuestros" title="MATERIALES" subtitle="¿Qué necesito para iniciar mi huerto casero?" image={img} />
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {materiales.map((m, i) => (
            <li key={m.t} className="rounded-2xl border bg-card p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-primary font-bold text-primary-foreground">{i + 1}</span>
              <h2 className="mt-4 text-2xl">{m.t}</h2>
              <p className="mt-2 text-muted-foreground">{m.d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 rounded-2xl bg-accent p-6 text-accent-foreground">
          <h2 className="text-2xl">¿Cómo sé que mi composta está lista?</h2>
          <p className="mt-2">Cuando reduce su volumen alrededor de 60%, los materiales ya no se reconocen, huele a tierra mojada, es de color café oscuro o negro y se desmorona fácilmente.</p>
        </div>
        <SourceNote>SMA Coahuila (2021), "Manual de trabajo: Huertos urbanos".</SourceNote>
      </section>
      <NextSection to="/estaciones" label="Estaciones" />
    </>
  );
}
