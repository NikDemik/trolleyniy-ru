import type { ReactNode } from "react";
import { Container } from "./primitives";

export function Hero({
  title,
  intro,
  eyebrow,
  children,
}: {
  title: string;
  intro: string;
  eyebrow?: string;
  children?: ReactNode;
}) {
  return (
    <section className="industrial-grid relative overflow-hidden border-b border-border py-14 sm:py-20">
      <div
        aria-hidden="true"
        className="absolute -right-10 top-0 font-display text-[18rem] leading-none text-transparent [-webkit-text-stroke:1px_#1e2226]"
      >
        01
      </div>
      <Container className="relative">
        <div className="hero-plate max-w-5xl p-6 sm:p-9">
          {eyebrow && <p className="eyebrow mb-5 text-accent">{eyebrow}</p>}
          <h1 className="max-w-4xl text-[clamp(2.5rem,6.8vw,6.5rem)] leading-[.98] text-silver-bright">
            {title}
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            {intro}
          </p>
          {children}
        </div>
      </Container>
    </section>
  );
}
