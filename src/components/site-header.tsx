import Link from "next/link";
import { company } from "@/config/company";
import { externalLinks } from "@/config/externalLinks";
import { navigation } from "@/config/navigation";
import { Container } from "./primitives";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  return <header className="relative z-30 bg-ink text-white">
    <div className="hidden border-b border-white/10 sm:block"><Container className="flex items-center justify-between gap-6 py-2 text-xs text-white/65"><span>{company.distributorStatement}</span><a className="hover:text-white" href={externalLinks.catalog}>Каталог ANNENG ↗ · отдельный сайт</a></Container></div>
    <Container className="flex min-h-24 items-center justify-between gap-5">
      <Link href="/" aria-label={`${company.legalName} — главная`} className="flex shrink-0 items-center gap-3">
        <span aria-hidden="true" className="flex size-10 items-center justify-center border border-accent/60 text-xl font-bold text-accent">Т</span>
        <span className="text-sm font-bold leading-tight tracking-wide">ТРОЛЛЕЙНЫЙ<br /><span className="font-normal text-white/65">ШИНОПРОВОД</span></span>
      </Link>
      <nav aria-label="Основная навигация" className="hidden items-center gap-5 xl:flex">{navigation.map((item) => <Link key={item.href} href={item.href} className="py-3 text-sm text-white/85 hover:text-accent">{item.label}</Link>)}</nav>
      <div className="hidden items-center gap-5 xl:flex">{company.phone && <a className="text-sm" href={`tel:${company.phone.replace(/[^+\d]/g, "")}`}>{company.phone}</a>}<Link href="/podbor-oborudovaniya/" className="border border-white/30 px-4 py-3 text-sm hover:border-accent hover:text-accent">Подобрать систему ↗</Link></div>
      <MobileMenu />
    </Container>
  </header>;
}

