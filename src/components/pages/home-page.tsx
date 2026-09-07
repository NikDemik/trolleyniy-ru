import { company } from "@/config/company";
import { externalLinks } from "@/config/externalLinks";
import { homeSeo } from "@/data/registry";
import { products } from "@/data/products";
import { solutions } from "@/data/solutions";
import { industries } from "@/data/industries";
import { Container, Section, ActionLink } from "../primitives";
import { Media } from "../media";
import { Advantages, BrandBlock, ConfiguratorBlock, IndustryCard, ProcessSteps, ProductDirectionCard, ProjectsBlock, SolutionCard } from "../content-blocks";
import { ContactForm } from "../contact-form";

export function HomePage() {
  return <main id="main">
    <section className="bg-ink pb-12 pt-10 text-white sm:pb-16 sm:pt-16"><Container>
      <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_.75fr]">
        <div><p className="eyebrow mb-7 text-accent">Инженерный подход к движению</p><h1 className="max-w-3xl text-[clamp(2.2rem,4.1vw,4rem)] leading-[1.08] font-semibold tracking-tight">{homeSeo.h1}</h1><p className="mt-7 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">Троллейные и монотроллейные шинопроводы, фестонные системы и комплектующие для кранового и промышленного оборудования.</p><div className="mt-9 flex flex-wrap gap-3"><ActionLink href="/podbor-oborudovaniya/">Подобрать систему</ActionLink><ActionLink href={externalLinks.shop} external outline>Каталог продукции</ActionLink></div><p className="mt-4 text-xs text-white/50">Каталог открывается на отдельном сайте shinoprovod-anneng.ru</p></div>
        <div><Media asset={{ src: null, alt: "Условная схема передачи питания от линии к подвижному потребителю", kind: "industrial" }} large /><div className="grid grid-cols-3 border-t border-white/15 pt-5 text-xs text-white/60"><span>Линия питания</span><span>Токосъём</span><span>Движение →</span></div></div>
      </div>
      <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-white/15 pt-6"><p className="text-sm text-white/75">{company.distributorStatement}</p><span className="text-sm font-semibold tracking-[.2em] text-white/60">ANNENG ELECTRIC</span></div>
    </Container></section>
    <Section title="Системы токоподвода" eyebrow="01 / Основные направления"><div className="grid gap-5 lg:grid-cols-3">{products.map((page, i) => <ProductDirectionCard key={page.slug} page={page} number={i + 1} />)}</div></Section>
    <Section title="Подбираем токоподвод под ваше оборудование" eyebrow="02 / Решения" className="bg-surface"><div className="grid gap-x-12 lg:grid-cols-2">{solutions.map((page, i) => <SolutionCard key={page.slug} page={page} number={i + 1} />)}</div></Section>
    <BrandBlock /><Advantages /><ProcessSteps /><ConfiguratorBlock />
    <Section title="Где применяются системы токоподвода" eyebrow="Отрасли" className="bg-surface"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{industries.map((page) => <IndustryCard key={page.slug} page={page} />)}</div></Section>
    <ProjectsBlock />
    <Section title="Нужен подбор шинопровода?" eyebrow="Обсудим задачу" className="border-t border-border"><div className="grid items-start gap-10 lg:grid-cols-[.6fr_1fr]"><div><p className="text-lg leading-8 text-muted-foreground">Укажите основные параметры. Для детального подбора подготовьте схему трассы, нагрузки и условия эксплуатации.</p><div className="mt-7"><ActionLink href="/podbor-oborudovaniya/" outline>Расширенная форма</ActionLink></div></div><ContactForm /></div></Section>
  </main>;
}
