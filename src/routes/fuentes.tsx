import { createFileRoute, Link } from "@tanstack/react-router";
import { fuentes } from "@/lib/data";

export const Route = createFileRoute("/fuentes")({
  head: () => ({
    meta: [
      { title: "Fuentes de la información — Tu propio huerto" },
      { name: "description", content: "Guías oficiales de INIFAP, SADER, SEDEMA CDMX y SMA Coahuila usadas en este sitio." },
      { property: "og:title", content: "Fuentes de la información" },
      { property: "og:description", content: "Documentos oficiales consultados para esta guía de huertos." },
    ],
  }),
  component: Fuentes,
});

function Fuentes() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
      <h1 className="text-center text-5xl md:text-7xl">FUENTES</h1>
      <div className="rule-line my-5" />
      <p className="text-center text-lg text-muted-foreground">Toda la información del sitio proviene de estos documentos públicos.</p>
      <ol className="mt-10 space-y-4">
        {fuentes.map((f, i) => (
          <li key={f.id} className="rounded-2xl border bg-card p-6">
            <p className="text-sm font-semibold text-primary">[{i + 1}]</p>
            <h2 className="mt-1 text-2xl">{f.titulo}</h2>
            <p className="mt-1 text-muted-foreground">{f.autor}</p>
            <p className="mt-3"><strong>Usado para:</strong> {f.uso}</p>
            <a href={f.url} target="_blank" rel="noreferrer" className="mt-4 inline-block rounded-full bg-leaf px-5 py-2 text-sm font-semibold text-leaf-foreground">Abrir documento ↗</a>
          </li>
        ))}
      </ol>
      <div className="mt-10 text-center">
        <Link to="/" className="rounded-full bg-primary px-8 py-4 font-semibold uppercase tracking-wider text-primary-foreground">Volver al inicio</Link>
      </div>
    </section>
  );
}
