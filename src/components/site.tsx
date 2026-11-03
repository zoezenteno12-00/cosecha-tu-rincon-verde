import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const secciones = [
  { to: "/plantas", label: "Plantas", hint: "Qué cultivar" },
  { to: "/materiales", label: "Materiales", hint: "Qué necesitas" },
  { to: "/estaciones", label: "Estaciones", hint: "Cuándo sembrar" },
  { to: "/tips", label: "Tips", hint: "Cuidados" },
  { to: "/fuentes", label: "Fuentes", hint: "De dónde viene la info" },
  { to: "/mi-plan", label: "Mi plan", hint: "Plan personalizado" },
] as const;

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <Link to="/" className="flex items-baseline gap-2 self-center md:self-auto">
          <span className="font-script text-2xl text-primary">tu propio</span>
          <span className="font-display text-2xl tracking-[0.2em]">HUERTO</span>
        </Link>
        <nav aria-label="Secciones" className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
          <ul className="flex w-max gap-2">
            {secciones.map((s) => (
              <li key={s.to}>
                <Link
                  to={s.to}
                  className="block rounded-full border border-primary/40 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-secondary-foreground transition hover:bg-secondary"
                  activeProps={{ className: "!bg-primary !text-primary-foreground !border-primary" }}
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export function PageHeader({ script, title, subtitle, image }: { script?: string; title: string; subtitle: string; image: string }) {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-16">
      <div className="text-center md:text-left">
        {script && <p className="font-script text-4xl text-primary md:text-5xl">{script}</p>}
        <h1 className="text-5xl md:text-7xl">{title}</h1>
        <div className="rule-line my-5" />
        <p className="text-lg text-muted-foreground md:text-xl">{subtitle}</p>
      </div>
      <img src={image} alt="" width={1200} height={912} className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg" />
    </section>
  );
}

export function NextSection({ to, label }: { to: string; label: string }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 text-center">
      <Link to={to} className="inline-flex items-center gap-2 rounded-full bg-leaf px-8 py-4 text-base font-semibold uppercase tracking-wider text-leaf-foreground shadow transition hover:opacity-90">
        Siguiente: {label} →
      </Link>
    </div>
  );
}

export function SourceNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-6 text-sm text-muted-foreground">
      Fuente: {children} · <Link to="/fuentes" className="underline underline-offset-2">ver todas las fuentes</Link>
    </p>
  );
}

export function Footer() {
  return (
    <footer className="border-t bg-secondary">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 text-sm text-secondary-foreground md:flex-row md:justify-between">
        <p><span className="font-script text-xl">tu propio</span> HUERTO — guía para empezar en casa</p>
        <Link to="/fuentes" className="underline underline-offset-2">Fuentes de la información</Link>
      </div>
    </footer>
  );
}
