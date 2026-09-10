import Link from "next/link";
import { company } from "@/config/company";
import { legalConfig, legalLinks } from "@/config/legal";
import { legalDocuments } from "@/data/legal";
import { Breadcrumbs } from "../breadcrumbs";
import { Container } from "../primitives";

export function LegalPage({ document }: { document: keyof typeof legalLinks }) {
  const page = legalDocuments[document];
  return (
    <main id="main">
      <Container>
        <Breadcrumbs items={[legalLinks[document]]} />
        <article className="mx-auto max-w-4xl pb-20 pt-6 sm:pt-10">
          <header className="border-b border-border pb-8">
            <p className="eyebrow mb-5">Правовая информация</p>
            <h1 className="font-sans text-3xl font-semibold normal-case leading-tight tracking-tight sm:text-5xl">
              {page.title}
            </h1>
            <p className="mt-5 text-sm text-muted-foreground">
              Редакция от <time dateTime={legalConfig.version}>{legalConfig.versionLabel}</time>
            </p>
            <p className="mt-6 leading-8 text-muted-foreground">{page.intro}</p>
          </header>
          <nav
            aria-label="Содержание документа"
            className="my-8 border border-border bg-surface p-5 sm:p-7"
          >
            <p className="mb-4 font-semibold">Содержание</p>
            <ol className="list-decimal space-y-2 pl-5">
              {page.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-primary underline underline-offset-4">
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="space-y-10">
            {page.sections.map((section, index) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
                <h2
                  id={`${section.id}-title`}
                  className="font-sans text-xl font-semibold normal-case tracking-normal sm:text-2xl"
                >
                  {index + 1}. {section.title}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-4 break-words leading-8 text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
                {section.points && (
                  <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-muted-foreground">
                    {section.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
                {section.links && (
                  <ul className="mt-4 space-y-3">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="break-words text-primary underline underline-offset-4"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
          <aside
            className="mt-12 border-t border-border pt-7"
            aria-label="Обращения о персональных данных"
          >
            <p className="font-semibold">Вопросы о персональных данных и отзыв согласия</p>
            {company.email && (
              <a
                className="mt-3 inline-block text-primary underline underline-offset-4"
                href={`mailto:${company.email}`}
              >
                {company.email}
              </a>
            )}
            <p className="mt-3 break-words text-sm leading-7 text-muted-foreground">
              {company.legalName}. {company.address}
            </p>
          </aside>
          <nav aria-label="Другие юридические документы" className="mt-8 flex flex-col gap-3">
            {company.legalLinks
              .filter((link) => link.href !== legalLinks[document].href)
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-primary underline underline-offset-4"
                >
                  {link.label}
                </Link>
              ))}
          </nav>
        </article>
      </Container>
    </main>
  );
}
