import { company } from "@/config/company";
import { externalLinks } from "@/config/externalLinks";
import { homeSeo } from "@/data/registry";
import { products } from "@/data/products";
import { solutions } from "@/data/solutions";
import { industries } from "@/data/industries";
import { Container, Section, ActionLink } from "../primitives";
import { Media } from "../media";
import {
  Advantages,
  BrandBlock,
  ConfiguratorBlock,
  IndustryCard,
  ProcessSteps,
  ProductDirectionCard,
  ProjectsBlock,
  SolutionCard,
} from "../content-blocks";
import { ContactForm } from "../contact-form";

export function HomePage() {
  return (
    <main id="main">
      <section className="industrial-grid relative min-h-[calc(100svh-65px)] overflow-hidden border-b border-border bg-ink text-white sm:min-h-[650px]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_76%_44%,rgba(31,122,82,.18),transparent_36%),linear-gradient(90deg,rgba(10,11,12,.35),rgba(10,11,12,.08))]"
        />
        <Container className="relative flex min-h-[calc(100svh-65px)] flex-col justify-center py-12 sm:min-h-[650px] sm:py-16">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[1.2fr_.8fr]">
            <div className="hero-plate min-w-0 max-w-4xl p-6 sm:p-8">
              <p className="eyebrow mb-6 text-accent">Инженерный подход к движению</p>
              <h1 className="max-w-4xl text-[clamp(2rem,3.8vw,4rem)] leading-[.96] text-silver-bright">
                {homeSeo.h1}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/60">
                Троллейные и монотроллейные шинопроводы, фестонные системы и комплектующие для
                кранового и промышленного оборудования.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ActionLink href="/podbor-oborudovaniya/">Подобрать систему</ActionLink>
                <ActionLink href={externalLinks.shop} external outline>
                  Каталог продукции
                </ActionLink>
              </div>
              <p className="mt-4 break-all font-mono text-[10px] tracking-wide text-white/40">
                Каталог открывается на отдельном сайте shinoprovod-anneng.ru
              </p>
            </div>
            <div className="hidden lg:block">
              <Media
                asset={{
                  src: null,
                  alt: "Условная схема передачи питания от линии к подвижному потребителю",
                  kind: "industrial",
                }}
                large
              />
              <div className="grid grid-cols-3 border-t border-white/15 pt-4 font-mono text-[10px] tracking-wider text-white/45">
                <span>Линия питания</span>
                <span>Токосъём</span>
                <span>Движение →</span>
              </div>
            </div>
          </div>
          <div className="mt-6 flex w-full flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-4 sm:absolute sm:bottom-5 sm:left-[22px] sm:right-[22px] sm:mt-0 sm:w-auto">
            <p className="font-mono text-[10px] tracking-wider text-white/55">
              {company.distributorStatement}
            </p>
            <span className="font-mono text-[10px] font-semibold tracking-[.2em] text-white/45">
              ANNENG ELECTRIC
            </span>
          </div>
        </Container>
      </section>
      <div className="hazard" aria-hidden="true" />
      <Section title="Системы токоподвода" eyebrow="01 / Основные направления">
        <div className="grid gap-5 lg:grid-cols-3">
          {products.map((page, i) => (
            <ProductDirectionCard key={page.slug} page={page} number={i + 1} />
          ))}
        </div>
      </Section>
      <Section
        title="Подбираем токоподвод под ваше оборудование"
        eyebrow="02 / Решения"
        className="bg-surface"
      >
        <div className="grid gap-x-12 lg:grid-cols-2">
          {solutions.map((page, i) => (
            <SolutionCard key={page.slug} page={page} number={i + 1} />
          ))}
        </div>
      </Section>
      <BrandBlock />
      <Advantages />
      <ProcessSteps />
      <ConfiguratorBlock />
      <Section title="Где применяются системы токоподвода" eyebrow="Отрасли" className="bg-surface">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((page) => (
            <IndustryCard key={page.slug} page={page} />
          ))}
        </div>
      </Section>
      <ProjectsBlock />
      <Section
        title="Нужен подбор шинопровода?"
        eyebrow="Обсудим задачу"
        className="border-t border-border"
      >
        <div className="grid items-start gap-10 lg:grid-cols-[.6fr_1fr]">
          <div>
            <p className="text-lg leading-8 text-muted-foreground">
              Укажите основные параметры. Для детального подбора подготовьте схему трассы, нагрузки
              и условия эксплуатации.
            </p>
            <div className="mt-7">
              <ActionLink href="/podbor-oborudovaniya/" outline>
                Расширенная форма
              </ActionLink>
            </div>
          </div>
          <ContactForm />
        </div>
      </Section>
    </main>
  );
}
