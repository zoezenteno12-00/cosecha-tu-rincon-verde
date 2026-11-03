import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { recomendar, temporadaActual, type Interes, type Respuestas, type Sol, type Temporada } from "@/lib/plan";
import { SourceNote } from "@/components/site";

export const Route = createFileRoute("/mi-plan")({
  head: () => ({
    meta: [
      { title: "Arma tu plan de huerto — Tu propio huerto" },
      { name: "description", content: "Responde unas preguntas sobre tu espacio, luz y recursos y recibe un plan para empezar tu huerto." },
      { property: "og:title", content: "Arma tu plan de huerto" },
      { property: "og:description", content: "Un plan ajustado a tu espacio y posibilidades." },
    ],
  }),
  component: MiPlan,
});

type Opcion<T> = { v: T; l: string; d?: string };
const espacios: Opcion<string>[] = [
  { v: "ventana", l: "Ventana o repisa" }, { v: "balcon", l: "Balcón o terraza" },
  { v: "patio", l: "Patio o azotea" }, { v: "jardin", l: "Jardín con tierra" },
];
const soles: Opcion<Sol>[] = [
  { v: "menos6", l: "Menos de 6 h" }, { v: "6a8", l: "6 a 8 h" }, { v: "mas8", l: "Más de 8 h" },
];
const macetas: Opcion<number>[] = [
  { v: 1, l: "Pequeños", d: "~1 L (vaso, lata)" }, { v: 4, l: "Medianos", d: "~4 L (maceta, bote)" },
  { v: 8, l: "Grandes", d: "~8 L (cubeta chica)" }, { v: 19, l: "Muy grandes", d: "~19 L (cubeta, caja)" },
];
const intereses: Opcion<Interes>[] = [
  { v: "hojas", l: "Hojas", d: "lechuga, espinaca" }, { v: "frutos", l: "Frutos", d: "jitomate, chile" },
  { v: "raices", l: "Raíces y bulbos", d: "rábano, zanahoria" }, { v: "aromaticas", l: "Aromáticas", d: "cilantro, perejil" },
];
const temporadas: Opcion<Temporada>[] = [{ v: "P-V", l: "Primavera–Verano" }, { v: "O-I", l: "Otoño–Invierno" }];

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={on}
      className={`rounded-2xl border-2 px-4 py-3 text-left transition ${on ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary/50"}`}>
      {children}
    </button>
  );
}

function Pregunta({ n, t, children }: { n: number; t: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-2xl border bg-card p-5 md:p-6">
      <legend className="sr-only">{t}</legend>
      <p className="flex items-center gap-3 font-display text-2xl">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-leaf font-sans text-base text-leaf-foreground">{n}</span>{t}
      </p>
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
    </fieldset>
  );
}

function MiPlan() {
  const [espacio, setEspacio] = useState("balcon");
  const [r, setR] = useState<Respuestas>({ intereses: [], temporada: "P-V", maxLitros: 4, sol: "6a8" });
  const [plan, setPlan] = useState<Respuestas | null>(null);
  useEffect(() => setR((x) => ({ ...x, temporada: temporadaActual(new Date().getMonth()) })), []);

  const toggle = (i: Interes) =>
    setR((x) => ({ ...x, intereses: x.intereses.includes(i) ? x.intereses.filter((y) => y !== i) : [...x.intereses, i] }));

  const lista = plan ? recomendar(plan) : [];

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 md:py-16">
      <div className="text-center">
        <p className="font-script text-4xl text-primary md:text-5xl">arma</p>
        <h1 className="text-5xl md:text-7xl">TU PLAN</h1>
        <div className="rule-line my-5" />
        <p className="text-lg text-muted-foreground">Cuéntanos con qué cuentas y te sugerimos cómo empezar.</p>
      </div>

      <form className="mt-10 space-y-4" onSubmit={(e) => { e.preventDefault(); setPlan(r); setTimeout(() => document.getElementById("resultado")?.scrollIntoView({ behavior: "smooth" }), 50); }}>
        <Pregunta n={1} t="¿Dónde pondrás tu huerto?">
          {espacios.map((o) => <Chip key={o.v} on={espacio === o.v} onClick={() => setEspacio(o.v)}>{o.l}</Chip>)}
        </Pregunta>
        <Pregunta n={2} t="¿Cuántas horas de sol directo recibe?">
          {soles.map((o) => <Chip key={o.v} on={r.sol === o.v} onClick={() => setR({ ...r, sol: o.v })}>{o.l}</Chip>)}
        </Pregunta>
        <Pregunta n={3} t="¿Qué recipientes tienes o puedes conseguir?">
          {macetas.map((o) => (
            <Chip key={o.v} on={r.maxLitros === o.v} onClick={() => setR({ ...r, maxLitros: o.v })}>
              <span className="block font-semibold">{o.l}</span><span className="text-sm opacity-80">{o.d}</span>
            </Chip>
          ))}
        </Pregunta>
        <Pregunta n={4} t="¿Qué te gustaría cultivar? (elige varias)">
          {intereses.map((o) => (
            <Chip key={o.v} on={r.intereses.includes(o.v)} onClick={() => toggle(o.v)}>
              <span className="block font-semibold">{o.l}</span><span className="text-sm opacity-80">{o.d}</span>
            </Chip>
          ))}
        </Pregunta>
        <Pregunta n={5} t="¿En qué temporada empiezas?">
          {temporadas.map((o) => <Chip key={o.v} on={r.temporada === o.v} onClick={() => setR({ ...r, temporada: o.v })}>{o.l}</Chip>)}
        </Pregunta>
        <div className="pt-2 text-center">
          <button type="submit" className="w-full rounded-full bg-leaf px-10 py-4 text-lg font-semibold uppercase tracking-wider text-leaf-foreground shadow-lg transition hover:opacity-90 sm:w-auto">
            Ver mi plan
          </button>
        </div>
      </form>

      {plan && (
        <div id="resultado" className="mt-12 scroll-mt-28 space-y-4">
          <h2 className="text-center text-4xl md:text-5xl">Tu plan</h2>
          {plan.sol === "menos6" && (
            <p className="rounded-2xl bg-sun/30 p-5">⚠️ La mayoría de las hortalizas necesitan mínimo 6 horas de sol. Si es posible, busca el punto más iluminado o mueve tus macetas durante el día.</p>
          )}
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="text-2xl">1. Plantas sugeridas ({lista.length})</h3>
            {lista.length === 0 ? (
              <p className="mt-3 text-muted-foreground">Con estas opciones no encontramos coincidencias. Prueba con recipientes más grandes u otros intereses.</p>
            ) : (
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {lista.map((p) => (
                  <li key={p.nombre} className="rounded-xl bg-accent p-4 text-accent-foreground">
                    <p className="font-display text-xl">{p.nombre}</p>
                    <p className="text-sm">Maceta: {p.contenedor} · {p.siembra.toLowerCase()} · cosecha en ~{p.dias} días</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="text-2xl">2. Prepara tus materiales</h3>
            <ul className="mt-3 list-disc space-y-1 pl-6 text-muted-foreground">
              <li>Recipientes con hoyos de drenaje en la base y unos 3 cm de grava o piedras al fondo.</li>
              <li>Tierra mezclada con composta para que no se agote.</li>
              <li>Semillas o plántulas de las plantas sugeridas.</li>
              {espacio !== "ventana" && <li>Si tienes mascotas, una malla o arpillera para proteger el huerto.</li>}
            </ul>
          </div>
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="text-2xl">3. Cuídalo</h3>
            <ul className="mt-3 list-disc space-y-1 pl-6 text-muted-foreground">
              <li>Las plantas en maceta necesitan más riego y abono que en tierra.</li>
              <li>Gira las macetas de vez en cuando para que crezcan parejas.</li>
              <li>Combina plantas de hoja, raíz, fruto y aromáticas para aprovechar el espacio.</li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/plantas" className="rounded-full bg-primary px-6 py-3 text-center font-semibold text-primary-foreground">Ver todas las plantas</Link>
            <Link to="/tips" className="rounded-full border-2 border-primary px-6 py-3 text-center font-semibold text-secondary-foreground">Más tips</Link>
          </div>
          <SourceNote>INIFAP (2023); SMA Coahuila (2021). Las fechas exactas dependen del clima de tu región.</SourceNote>
        </div>
      )}
    </section>
  );
}
