import { news } from "@/data/blog";
import { Arrow, Section } from "./primitives";

export function BlogNews() {
  return (
    <Section title="Последние публикации" eyebrow="ANNENG · новости и материалы">
      <div className="grid gap-px border border-border bg-border lg:grid-cols-2">
        {news.map((item, index) => (
          <article
            key={item.sourceUrl}
            className="group flex min-h-72 flex-col bg-surface p-6 sm:p-8"
          >
            <div className="flex items-start justify-between gap-5 font-mono text-xs tracking-[.14em] text-muted-foreground uppercase">
              <span>{item.kind}</span>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <h2 className="mt-10 max-w-xl text-2xl leading-tight text-silver-bright sm:text-3xl">
              {item.title}
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-muted-foreground">{item.summary}</p>
            <a
              className="mt-auto inline-flex w-fit items-center gap-2 pt-8 font-mono text-sm text-primary hover:underline"
              href={item.sourceUrl}
              rel="external"
            >
              Читать на anneng.ru
              <Arrow external />
              <span className="sr-only"> — отдельный сайт</span>
            </a>
          </article>
        ))}
      </div>
      <p className="mt-6 max-w-3xl text-sm leading-6 text-muted-foreground">
        Анонсы подготовлены по материалам сайта ANNENG. Полные публикации открываются на сайте
        источника.
      </p>
    </Section>
  );
}
