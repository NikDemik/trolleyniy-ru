import { company } from "@/config/company";
import { products } from "@/data/products";
import { solutions } from "@/data/solutions";
import { industries } from "@/data/industries";
import { processSteps } from "@/data/common";
import { Container, Section, ActionLink } from "../primitives";
import { AnimatedCounter, Reveal } from "../animated";
import { HomeHero } from "../home-hero";
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

const tickerItems = [...products.map((item) => item.label), ...solutions.map((item) => item.label)];

export function HomePage() {
  return (
    <main id="main">
      <HomeHero />

      <section className="border-b border-border py-[clamp(4rem,6vw,5rem)]">
        <Container className="grid items-start gap-12 lg:grid-cols-[1.15fr_.85fr]">
          <Reveal>
            <p className="eyebrow">00 / Позиция</p>
            <h2 className="statement-title mt-6">
              Не просто оборудование.
              <br />
              <em>Инженерный подбор</em>
              <br />
              <span>системы целиком.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-xl text-base font-medium leading-8 text-muted-foreground">
              <b className="text-foreground">{company.legalName}</b> подбирает троллейные,
              монотроллейные и фестонные системы под электрическую нагрузку, геометрию трассы и
              условия эксплуатации.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Подбор", "Комплектация", "Поставка по России"].map((item) => (
                <span key={item} className="cert-chip">
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-5 font-mono text-[10px] tracking-[.14em] text-white/35 uppercase">
              {company.distributorStatement}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-border">
        <Container>
          <Reveal className="grid grid-cols-1 sm:grid-cols-3">
            {[
              [products.length, "типа токоподвода"],
              [solutions.length, "типов оборудования"],
              [processSteps.length, "этапов комплектации"],
            ].map(([value, label], index) => (
              <div key={label} className={`stat-block ${index === 0 ? "sm:border-l-0" : ""}`}>
                <div className="stat-number">
                  <AnimatedCounter value={Number(value)} />
                  <i>+</i>
                </div>
                <p>{label}</p>
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span className="ticker-item" key={`${item}-${index}`}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="hazard" aria-hidden="true" />
      <Section id="systems" title="Системы токоподвода" eyebrow="01 / Основные направления">
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
        className="cta-band border-t border-border"
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
