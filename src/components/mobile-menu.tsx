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
  return (
    <div
      className="xl:hidden"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        className="min-h-10 border border-border px-3 font-mono text-[10px] tracking-[.14em] uppercase"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? "Закрыть ×" : "Меню ☰"}
      </button>
      <div
        id="mobile-navigation"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[65px] z-40 overflow-y-auto border-t border-border bg-ink p-6 sm:top-[89px]"
      >
        {open && (
          <motion.nav
            aria-label="Мобильная навигация"
            initial={{ opacity: reduced ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-border py-3 font-display text-3xl uppercase text-white/70 hover:pl-2 hover:text-white"
              >
                <span>{item.label}</span>
                <span className="font-mono text-[10px] tracking-widest text-white/35">
                  0{index + 1}
                </span>
              </Link>
            ))}
            <Link
              onClick={() => setOpen(false)}
              href="/podbor-oborudovaniya/"
              className="mt-6 block border border-silver bg-silver px-4 py-4 text-center text-xs font-extrabold tracking-widest text-ink uppercase"
            >
              Подобрать систему →
            </Link>
            <a href={externalLinks.catalog} className="block py-4 font-mono text-xs text-accent">
              Каталог ANNENG ↗ <span className="text-white/50">Отдельный сайт</span>
            </a>
          </motion.nav>
        )}
      </div>
    </div>
  );
}
