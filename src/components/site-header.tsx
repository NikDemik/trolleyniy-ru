"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { company } from "@/config/company";
import { navigation } from "@/config/navigation";
import { Container } from "./primitives";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 10);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 border-b text-white backdrop-blur-xl transition-colors duration-300 ${scrolled ? "border-border bg-[rgba(10,11,12,.94)]" : "border-transparent bg-[rgba(10,11,12,.58)]"}`}
    >
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
        <nav aria-label="Основная навигация" className="ml-auto hidden items-center xl:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 xl:flex">
          {company.phone && (
            <a
              className="font-mono text-xs text-white/65 hover:text-white"
              href={`tel:${company.phone.replace(/[^+\d]/g, "")}`}
            >
              {company.phone}
            </a>
          )}
          <Link href="/podbor-oborudovaniya/" className="btn-mini">
            Подбор ↗
          </Link>
        </div>
        <MobileMenu />
      </Container>
    </header>
  );
}
