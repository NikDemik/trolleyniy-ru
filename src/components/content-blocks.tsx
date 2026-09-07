import Link from "next/link";
import { company } from "@/config/company";
import { externalLinks, catalogLink } from "@/config/externalLinks";
import { advantages, processSteps, comparison, projects } from "@/data/common";
import { getPage, hrefFor } from "@/data/registry";
import type { FaqItem, PageContent, ProjectCase } from "@/types/content";
import { Arrow, ActionLink, Section } from "./primitives";
import { Media } from "./media";
import { StructuredData } from "./structured-data";

export function ProductDirectionCard({ page, number }: { page: PageContent; number: number }) {
  return <article className="group min-w-0 border border-border bg-surface transition-colors hover:border-[#4a5157]">
    {page.media && <Media asset={page.media} />}
    <div className="p-6"><p className="mb-5 font-mono text-xs text-muted-foreground">НАПРАВЛЕНИЕ / 0{number}</p><h3 className="text-2xl leading-tight font-semibold"><Link className="hover:text-primary" href={hrefFor(page.slug)}>{page.label}</Link></h3><p className="mt-4 text-sm leading-6 text-muted-foreground">{page.intro}</p><Link className="mt-6 inline-flex min-h-11 items-center gap-5 text-sm font-semibold text-primary" href={hrefFor(page.slug)}>О системе <Arrow /><span className="sr-only">: {page.label}</span></Link></div>
  </article>;
}
export function SolutionCard({ page, number }: { page: PageContent; number: number }) {
  return <article className="border-t border-border py-6"><Link href={hrefFor(page.slug)} className="group grid grid-cols-[2rem_1fr_auto] items-start gap-4"><span className="pt-1 font-mono text-sm text-muted-foreground">0{number}</span><div><h3 className="text-xl font-semibold group-hover:text-primary">{page.label}</h3><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{page.intro}</p></div><span className="text-xl text-primary"><Arrow /></span></Link></article>;
}
export function IndustryCard({ page }: { page: PageContent }) {
  return <Link href={hrefFor(page.slug)} className="flex min-h-28 items-center justify-between gap-6 border border-border bg-surface p-6 text-lg font-semibold uppercase tracking-wide hover:border-primary hover:text-accent">{page.label}<Arrow /></Link>;
}
export function Advantages() {
  return <Section title="Комплексная поставка систем токоподвода" eyebrow="Подход к работе"><div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">{advantages.map((item) => <article key={item.title} className="border-t border-border pt-6"><span aria-hidden="true" className="text-primary">✳</span><h3 className="mt-4 text-lg font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p></article>)}</div></Section>;
}
export function ProcessSteps() {
  return <Section title="От задачи до готовой спецификации" eyebrow="Процесс" className="bg-surface"><ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{processSteps.map((step, i) => <li key={step.title} className="border-t border-border pt-5"><span className="font-mono text-sm text-primary">0{i + 1}</span><h3 className="mt-4 text-xl font-semibold">{step.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{step.text}</p></li>)}</ol></Section>;
}
export function Comparison() {
  return <Section title="Три технологии. Разные условия выбора." eyebrow="Сравнение"><div className="overflow-x-auto" role="region" aria-label="Сравнение систем токоподвода" tabIndex={0}><table className="w-full min-w-[640px] border-collapse text-left text-sm"><caption className="sr-only">Конструкция и критерии проверки для трёх систем</caption><thead><tr className="bg-surface"><th scope="col" className="p-5">Система</th><th scope="col" className="p-5">Конструкция</th><th scope="col" className="p-5">Что проверить</th></tr></thead><tbody>{comparison.map((row) => <tr key={row.slug} className="border-b border-border"><th scope="row" className="p-5 font-semibold"><Link className="text-primary hover:underline" href={hrefFor(row.slug)}>{row.title}</Link></th><td className="p-5">{row.structure}</td><td className="max-w-sm p-5 text-muted-foreground">{row.check}</td></tr>)}</tbody></table></div><p className="mt-4 text-sm text-muted-foreground">Сравнение принципов работы. Допустимые параметры определяются выбранной серией и проектом.</p></Section>;
}
export function FAQ({ items }: { items: FaqItem[] }) {
  return <Section title="Вопросы о подборе" eyebrow="FAQ"><div className="max-w-4xl">{items.map((item) => <details key={item.question} className="border-t border-border py-5"><summary className="cursor-pointer py-2 text-lg font-semibold">{item.question}</summary><p className="mt-4 max-w-3xl leading-7 text-muted-foreground">{item.answer}</p></details>)}</div><StructuredData data={{ "@context": "https://schema.org", "@type": "FAQPage", publisher: { "@id": `${company.website}/#organization` }, mainEntity: items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }} /></Section>;
}
export function RelatedLinks({ slugs }: { slugs: string[] }) {
  return <Section title="По теме" className="border-t border-border"><div className="grid gap-3 sm:grid-cols-2">{slugs.map((slug) => { const page = getPage(slug); return page ? <Link key={slug} href={hrefFor(slug)} className="flex min-h-14 items-center justify-between gap-5 border-b border-border py-4 font-medium hover:text-primary">{page.label}<Arrow /></Link> : null; })}</div></Section>;
}
export function BrandBlock() {
  return <Section className="bg-ink text-white" eyebrow="Бренды" title="Официальный дистрибьютор ANNENG Electric"><div className="grid gap-10 lg:grid-cols-[1fr_1fr]"><div><p className="max-w-xl text-lg leading-8 text-white/70">Закрытые троллейные системы, монотроллеи и кабельный токоподвод. Инженерный подбор и комплектация для вашего оборудования.</p><div className="mt-8 flex flex-wrap gap-3"><ActionLink href="/brands/anneng/">Подробнее об ANNENG</ActionLink><ActionLink href={externalLinks.catalog} external outline>Каталог ANNENG</ActionLink></div></div><div className="flex flex-col justify-center border-l-2 border-accent pl-8"><p className="text-5xl font-bold tracking-tight sm:text-6xl">ANNENG<span className="block text-2xl font-normal tracking-widest text-white/50">ELECTRIC</span></p><p className="mt-6 text-sm text-white/60">Системы токоподвода · Россия</p></div></div></Section>;
}
export function CatalogCTA({ shopKey }: { shopKey?: "trolley" | "mono" | "festoon" }) {
  const link = catalogLink(shopKey);
  return <Section className="bg-surface"><div className="flex flex-wrap items-center justify-between gap-8"><div className="max-w-xl"><p className="eyebrow mb-3">Отдельный интернет-магазин</p><h2 className="text-2xl font-semibold">Модели и комплектующие ANNENG</h2><p className="mt-4 text-muted-foreground">Характеристики, исполнения и товарные позиции доступны в специализированном каталоге.</p></div><ActionLink href={link.href} external>{link.specific ? "Смотреть системы в каталоге" : "Открыть каталог ANNENG"}</ActionLink></div></Section>;
}
export function ConfiguratorBlock() {
  return <Section title="Предварительно рассчитайте систему самостоятельно" eyebrow="Конфигуратор" className="border-y border-border"><div className="flex flex-wrap items-center justify-between gap-8"><p className="max-w-2xl text-muted-foreground">Задайте параметры линии в конфигураторе интернет-магазина ANNENG. Предварительный результат поможет подготовиться к обсуждению комплектации.</p><ActionLink href={externalLinks.configurator} external>Открыть конфигуратор</ActionLink></div></Section>;
}
export function ProjectCard({ project }: { project: ProjectCase }) {
  return <article className="border border-border p-6"><p className="eyebrow">{project.objectType}</p><h3 className="mt-4 text-2xl font-semibold">{project.title}</h3><dl className="mt-6 space-y-5">{[["Задача", project.task], ["Исходные данные", project.initialData], ["Решение", project.solution], ["Результат", project.result]].map(([label, text]) => <div key={label}><dt className="font-semibold">{label}</dt><dd className="mt-2 text-muted-foreground">{text}</dd></div>)}</dl><p className="mt-5">Применённая продукция: {project.products.join(", ")}</p>{project.photos.map((photo, i) => <Media key={i} asset={photo} />)}<div className="mt-5 flex flex-wrap gap-4">{project.related.map((slug) => <Link key={slug} href={hrefFor(slug)} className="text-primary underline">{getPage(slug)?.label}</Link>)}</div></article>;
}
export function ProjectsBlock({ standalone = false }: { standalone?: boolean }) {
  if (projects.length) return <Section title={standalone ? "Задачи и решения" : "Реализованные решения"}><div className="grid gap-6 lg:grid-cols-2">{projects.slice(0, standalone ? undefined : 3).map((project) => <ProjectCard key={project.slug} project={project} />)}</div></Section>;
  return <Section title={standalone ? "Ваш объект — отдельная инженерная задача" : "Реализованные решения"} eyebrow="Проекты"><div className="flex flex-wrap items-center justify-between gap-8"><p className="max-w-2xl text-muted-foreground">Материалы о проектах готовятся к публикации. Обсудим исходные данные вашего объекта и подходящую систему токоподвода.</p><ActionLink href="/podbor-oborudovaniya/" outline>Обсудить задачу</ActionLink></div></Section>;
}
