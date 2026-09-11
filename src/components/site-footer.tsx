import Link from "next/link";
import { company } from "@/config/company";
import { externalLinks } from "@/config/externalLinks";
import { footerGroups } from "@/config/navigation";
import { getPage, hrefFor } from "@/data/registry";
import { Container } from "./primitives";
import { CookieSettingsButton } from "./cookie-banner";

export function Footer() {
  return (
    <footer className="border-t border-border bg-ink py-16 text-white">
      <Container>
        <div className="mb-12 flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="font-display text-3xl uppercase">{company.legalName}</p>
            <p className="mt-3 max-w-md text-sm text-white/50">
              Системы токоподвода для промышленного и грузоподъёмного оборудования.
            </p>
          </div>
          <div className="space-y-2 font-mono text-xs text-white/60">
            {company.phone && (
              <a className="block" href={`tel:${company.phone.replace(/[^+\d]/g, "")}`}>
                {company.phone}
              </a>
            )}
            {company.email && (
              <a className="block" href={`mailto:${company.email}`}>
                {company.email}
              </a>
            )}
            {company.address && <p>{company.address}</p>}
          </div>
        </div>
        <div className="grid gap-10 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title + " — подвал"}>
              <h2 className="mb-5 font-mono text-[10px] tracking-[.2em] text-accent">
                {group.title}
              </h2>
              <ul className="space-y-3">
                {group.slugs.map((slug) => (
                  <li key={slug}>
                    <Link
                      className="inline-block py-1 text-sm text-white/60 hover:text-white"
                      href={hrefFor(slug)}
                    >
                      {getPage(slug)?.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-5 border-t border-white/15 pt-7 text-sm text-white/60">
          <span>© {company.legalName}</span>
          <a href={externalLinks.catalog} rel="external" className="hover:text-white">
            Каталог ANNENG ↗ · отдельный интернет-магазин
          </a>
          <CookieSettingsButton />
          {company.legalLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}
