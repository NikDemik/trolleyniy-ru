import Link from "next/link";
import { company } from "@/config/company";
import { externalLinks } from "@/config/externalLinks";
import { navigation } from "@/config/navigation";
import { Container } from "./primitives";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-[rgba(10,11,12,.92)] text-white backdrop-blur-xl">
      <div className="hidden border-b border-white/10 sm:block">
        <Container className="flex items-center justify-between gap-6 py-1.5 font-mono text-[10px] tracking-wider text-white/50">
          <span>{company.distributorStatement}</span>
          <a className="hover:text-white" href={externalLinks.catalog}>
            Каталог ANNENG ↗ · отдельный сайт
          </a>
        </Container>
      </div>
      <Container className="flex min-h-16 items-center justify-between gap-5">
        <Link
          href="/"
          aria-label={`${company.legalName} — главная`}
          className="flex shrink-0 items-center gap-3"
        >
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
            <rect x="3" y="7" width="24" height="3.2" fill="#c7ccd1" />
            <rect x="3" y="13.4" width="24" height="3.2" fill="#c7ccd1" />
            <rect x="3" y="19.8" width="24" height="3.2" fill="#1f7a52" />
            <rect x="11" y="1" width="8" height="4" rx="1" stroke="#4fc48d" strokeWidth="1.4" />
          </svg>
          <span className="font-display text-xl leading-none tracking-wide">
            ТРОЛЛЕЙНЫЙ
            <span className="mt-1 block font-mono text-[7px] font-medium tracking-[.22em] text-white/45">
              СИСТЕМЫ ТОКОПОДВОДА
            </span>
          </span>
        </Link>
        <nav aria-label="Основная навигация" className="hidden items-center gap-0 xl:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-3 py-3 font-mono text-[11px] font-semibold tracking-[.1em] text-white/65 uppercase hover:text-white after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 xl:flex">
          {company.phone && (
            <a
              className="font-mono text-xs text-white/65"
              href={`tel:${company.phone.replace(/[^+\d]/g, "")}`}
            >
              {company.phone}
            </a>
          )}
          <Link
            href="/podbor-oborudovaniya/"
            className="border border-silver/70 px-4 py-2 font-sans text-[11px] font-extrabold tracking-[.12em] uppercase hover:bg-silver-bright hover:text-ink"
          >
            Подбор ↗
          </Link>
        </div>
        <MobileMenu />
      </Container>
    </header>
  );
}
