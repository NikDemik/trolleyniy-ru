import type { ReactNode } from "react";
import { Container } from "./primitives";

export function Hero({ title, intro, eyebrow, children }: { title: string; intro: string; eyebrow?: string; children?: ReactNode }) {
  return <section className="border-b border-border pb-12 pt-8 sm:pb-16"><Container>{eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}<h1 className="max-w-5xl text-3xl leading-[1.1] font-semibold tracking-tight min-[400px]:text-4xl sm:text-5xl lg:text-6xl">{title}</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">{intro}</p>{children}</Container></section>;
}
