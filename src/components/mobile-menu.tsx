"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { navigation } from "@/config/navigation";
import { externalLinks } from "@/config/externalLinks";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  return <div className="xl:hidden" onKeyDown={(event) => { if (event.key === "Escape" && open) { setOpen(false); trigger.current?.focus(); } }}>
    <button ref={trigger} type="button" className="min-h-12 border border-white/25 px-4 text-sm" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? "Закрыть ×" : "Меню ☰"}</button>
    <div id="mobile-navigation" hidden={!open} className="absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-6rem)] overflow-y-auto border-t border-white/20 bg-ink p-5 shadow-xl">
      {open && <motion.nav aria-label="Мобильная навигация" initial={{ opacity: reduced ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ duration: .15 }}>
        {navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="block border-b border-white/10 py-4">{item.label}</Link>)}
        <Link onClick={() => setOpen(false)} href="/podbor-oborudovaniya/" className="mt-5 block bg-primary px-4 py-4 font-semibold text-white">Подобрать систему →</Link>
        <a href={externalLinks.catalog} className="block py-4 text-accent">Каталог ANNENG ↗ <span className="text-sm text-white/60">Отдельный сайт</span></a>
      </motion.nav>}
    </div>
  </div>;
}
