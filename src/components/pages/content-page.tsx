import { notFound } from "next/navigation";
import { getPage, hrefFor } from "@/data/registry";
import { products } from "@/data/products";
import { solutions } from "@/data/solutions";
import { industries } from "@/data/industries";
import { Breadcrumbs } from "../breadcrumbs";
import { Container, Section, CTA, ActionLink } from "../primitives";
import { Hero } from "../hero";
import { Media } from "../media";
import { CatalogCTA, Comparison, ConfiguratorBlock, FAQ, IndustryCard, ProcessSteps, ProductDirectionCard, ProjectsBlock, RelatedLinks, SolutionCard } from "../content-blocks";
import { CompanyDetails, CommercialDetails } from "../company-details";
import { ContactForm } from "../contact-form";
import { catalogLink } from "@/config/externalLinks";

export function ContentPage({ slug }: { slug: string }) {
  const page = getPage(slug);
  if (!page) notFound();
  const parent = page.parent ? getPage(page.parent) : undefined;
  const crumbs = [...(parent ? [{ label: parent.label, href: hrefFor(parent.slug) }] : []), { label: page.label, href: hrefFor(page.slug) }];
  return <main id="main">
    <Container><Breadcrumbs items={crumbs} /></Container>
    <Hero title={page.h1} intro={page.intro} eyebrow={parent?.label ?? "Троллейный шинопровод"}>
      {page.category !== "index" && slug !== "podbor-oborudovaniya" && <div className="mt-7"><ActionLink href="/podbor-oborudovaniya/">Подобрать систему</ActionLink></div>}
    </Hero>
    {slug === "produkciya" && <Section title="Основные типы систем"><div className="grid gap-5 lg:grid-cols-3">{products.map((item, i) => <ProductDirectionCard key={item.slug} page={item} number={i + 1} />)}</div></Section>}
    {slug === "resheniya" && <Section title="Выберите ваше оборудование"><div className="grid gap-x-12 lg:grid-cols-2">{solutions.map((item, i) => <SolutionCard key={item.slug} page={item} number={i + 1} />)}</div></Section>}
    {slug === "otrasli" && <Section title="Условия применения по отраслям"><div className="grid gap-5 sm:grid-cols-2">{industries.map((item) => <IndustryCard key={item.slug} page={item} />)}</div></Section>}
    {page.sections.length > 0 && <Section><div className={`grid items-start gap-10 ${page.media ? "lg:grid-cols-[1fr_.8fr]" : "lg:grid-cols-[.35fr_1fr]"}`}>
      {!page.media && <p className="eyebrow">{page.label}</p>}
      <div className="space-y-10">{page.sections.map((section) => <section key={section.title}><h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2><p className="mt-4 leading-8 text-muted-foreground">{section.text}</p>{section.points && <ul className="mt-5 space-y-3">{section.points.map((point) => <li key={point} className="flex gap-3 text-sm leading-6"><span aria-hidden="true" className="text-primary">—</span>{point}</li>)}</ul>}</section>)}</div>
      {page.media && <aside className="space-y-6"><Media asset={page.media} large /><div className="border border-border bg-surface p-6"><p className="eyebrow mb-4">Для точного подбора</p><p className="text-sm leading-7 text-muted-foreground">Схема поясняет принцип работы. Геометрия, состав и характеристики определяются конкретным исполнением и проектом.</p><div className="mt-5"><ActionLink href="/podbor-oborudovaniya/" outline>Передать параметры</ActionLink></div></div></aside>}
    </div></Section>}
    {(slug === "produkciya" || slug === "resheniya" || slug === "resheniya/mostovye-krany") && <Comparison />}
    {(slug === "resheniya" || slug === "podbor-oborudovaniya" || slug === "o-kompanii") && <ProcessSteps />}
    {slug === "podbor-oborudovaniya" && <ConfiguratorBlock />}
    {slug === "proekty" && <ProjectsBlock standalone />}
    {(slug === "kontakty" || slug === "o-kompanii") && <CompanyDetails />}
    {slug === "dostavka-i-oplata" && <CommercialDetails />}
    {slug === "garantiya" && <CommercialDetails warranty />}
    {page.series && <Section title="Обзор направления ANNENG"><div className="grid gap-5 sm:grid-cols-2">{page.series.map((series) => <article key={series.name} className="border border-border p-6"><h3 className="text-xl font-semibold">{series.name}</h3><p className="my-5 leading-7 text-muted-foreground">{series.description}</p><ActionLink href={catalogLink(page.shopKey).href} external outline>Перейти в каталог ANNENG</ActionLink></article>)}</div></Section>}
    {page.faq && <FAQ items={page.faq} />}
    {(page.category === "product" || slug === "produkciya" || slug === "brands/anneng" || slug === "kontakty") && <CatalogCTA shopKey={page.shopKey} />}
    {page.form && <Section id="podbor" title={slug === "podbor-oborudovaniya" ? "Исходные данные для расчёта" : "Расскажите о вашей задаче"} eyebrow="Инженерный подбор" className="border-t border-border"><div className="max-w-4xl"><ContactForm extended={slug === "podbor-oborudovaniya"} /></div></Section>}
    {page.related && <RelatedLinks slugs={page.related} />}
    {!page.form && <CTA />}
  </main>;
}
