import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { secciones } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tu propio huerto — empieza a cultivar en casa" },
      { name: "description", content: "Guía sencilla para iniciar un huerto casero: plantas, materiales, estaciones y consejos con fuentes oficiales." },
      { property: "og:title", content: "Tu propio huerto" },
      { property: "og:description", content: "Plantas, materiales, estaciones y consejos para tu huerto casero." },
    ],
  }),
  component: Index,
});

const pasos = [
  { n: "1", t: "Elige tus plantas", d: "Revisa cuáles se adaptan a tu espacio." },
  { n: "2", t: "Reúne materiales", d: "Contenedor con drenaje, tierra y composta." },
  { n: "3", t: "Siembra a tiempo", d: "Consulta el ciclo de cada planta." },
  { n: "4", t: "Cuida y cosecha", d: "Riego, sol y algunos trucos útiles." },
];

function Index() {
  return (
    <>
      <section className="relative overflow-hidden">
        <img src={hero} alt="Balcón con macetas de jitomate, lechuga, hierbas y chiles" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background" />
        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-16 text-center md:pt-24">
          <p className="font-script text-5xl text-primary md:text-7xl">tu propio</p>
          <h1 className="text-7xl leading-none md:text-9xl">HUERTO</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg md:text-xl">Todo lo que necesitas para empezar a cultivar tus alimentos en casa, paso a paso.</p>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {secciones.slice(0, 4).map((s) => (
              <Link key={s.to} to={s.to} className="group rounded-2xl bg-primary px-4 py-6 text-primary-foreground shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                <span className="block font-display text-xl tracking-[0.18em] md:text-2xl">{s.label.toUpperCase()}</span>
                <span className="mt-1 block text-sm opacity-90">{s.hint} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-center text-4xl md:text-5xl">¿Por dónde empiezo?</h2>
        <div className="rule-line mx-auto my-6 max-w-md" />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pasos.map((p) => (
            <li key={p.n} className="rounded-2xl border bg-card p-6">
              <span className="font-display text-5xl text-leaf">{p.n}</span>
              <h3 className="mt-2 text-xl">{p.t}</h3>
              <p className="mt-1 text-muted-foreground">{p.d}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
