import type { ReactNode } from "react";
import { Container } from "./primitives";
import { Reveal } from "./animated";

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
    <section className="industrial-grid relative overflow-hidden border-b border-border py-[clamp(4.5rem,8vw,7rem)]">
      <div aria-hidden="true" className="section-watermark -right-8 -top-8">
        01
      </div>
      <Container className="relative z-1">
        <Reveal className="hero-plate max-w-5xl p-6 sm:p-9">
          {eyebrow && <p className="eyebrow mb-5 text-accent">{eyebrow}</p>}
          <h1 className="max-w-4xl text-[clamp(2.7rem,6.8vw,6.5rem)] leading-[.94] text-silver-bright">
            {title}
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            {intro}
          </p>
          {children}
        </Reveal>
      </Container>
    </section>
  );
}
