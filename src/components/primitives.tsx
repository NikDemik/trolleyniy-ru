import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-[2400px] px-[clamp(22px,2vw,64px)]", className)}>
      {children}
    </div>
  );
}
export function Section({
  children,
  title,
  eyebrow,
  className,
  id,
}: {
  children: ReactNode;
  title?: string;
  eyebrow?: string;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative overflow-hidden border-b border-border py-16 sm:py-20", className)}
    >
      <Container>
        {(title || eyebrow) && (
          <div className="mb-10 max-w-4xl">
            {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
            {title && <h2 className="section-title">{title}</h2>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
export function Arrow({ external = false }: { external?: boolean }) {
  return <span aria-hidden="true">{external ? "↗" : "→"}</span>;
}
export function ActionLink({
  href,
  children,
  external = false,
  outline = false,
  className,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  outline?: boolean;
  className?: string;
}) {
  const classes = cn(buttonVariants({ variant: outline ? "outline" : "default" }), className);
  return external ? (
    <a className={classes} href={href} rel="external">
      {children}
      <Arrow external />
      <span className="sr-only"> — отдельный сайт</span>
    </a>
  ) : (
    <Link className={classes} href={href}>
      {children}
      <Arrow />
    </Link>
  );
}
export function CTA({
  title = "Подберём систему под вашу задачу",
  text = "Начните с типа оборудования, длины трассы и условий эксплуатации. Остальные параметры уточним при подборе.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <Section className="bg-ink text-white">
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="eyebrow mb-4 text-accent">Инженерный подбор</p>
          <h2 className="section-title max-w-3xl">{title}</h2>
          <p className="mt-5 max-w-2xl text-white/70">{text}</p>
        </div>
        <ActionLink href="/podbor-oborudovaniya/">Подобрать систему</ActionLink>
      </div>
    </Section>
  );
}
