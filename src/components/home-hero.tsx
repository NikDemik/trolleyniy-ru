"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { company } from "@/config/company";
import { externalLinks } from "@/config/externalLinks";
import { products } from "@/data/products";
import { hrefFor } from "@/data/registry";
import { Media } from "./media";
import { ActionLink, Container } from "./primitives";

const slideLabels = ["Закрытая линия", "Отдельные полюса", "Кабельный токоподвод"];
const slideDuration = 5600;

export function HomeHero() {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();

  const go = (next: number) => {
    setActive((next + products.length) % products.length);
  };

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % products.length),
      slideDuration,
    );
    return () => window.clearInterval(timer);
  }, [active, reducedMotion]);

  const product = products[active];

  return (
    <section className="industrial-grid relative isolate min-h-[max(620px,calc(100svh-100px))] w-screen max-w-none overflow-hidden border-b border-border bg-ink text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(31,122,82,.2),transparent_31%),linear-gradient(90deg,#08090a_0%,rgba(8,9,10,.82)_48%,rgba(8,9,10,.18)_100%)]" />
      <AnimatePresence mode="wait">
        <motion.div
          key={product.slug}
          className="absolute inset-y-[8%] right-[-8%] w-[68%] opacity-35 max-lg:w-[92%] max-sm:right-[-34%] max-sm:w-[140%]"
          initial={reducedMotion ? false : { opacity: 0, scale: 1.08 }}
          animate={{ opacity: 0.35, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.9, ease: "easeOut" }}
          aria-hidden="true"
        >
          {product.media && <Media asset={product.media} large />}
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-y-0 left-3 z-10 hidden items-center [writing-mode:vertical-rl] rotate-180 font-mono text-[9px] tracking-[.32em] text-white/30 uppercase md:flex">
        Промышленные системы токоподвода · инженерный подбор · Россия
      </div>

      <div className="absolute left-8 bottom-19.5 z-10 flex min-h-[max(620px,calc(100svh-100px))] items-end pb-24 pt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="hero-plate w-full max-w-190 px-6 py-7 sm:px-8 sm:py-8"
            initial={reducedMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: reducedMotion ? 0 : 0.65, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <p className="mb-4 font-mono text-[11px] tracking-[.23em] text-accent uppercase">
              0{active + 1} / {slideLabels[active]}
            </p>
            <h1 className="max-w-3xl text-[clamp(2.8rem,7.3vw,4rem)] leading-[.92] text-silver-bright">
              {product.h1}
            </h1>
            <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-white/65">
              {product.intro}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
              <ActionLink href={hrefFor(product.slug)}>О системе</ActionLink>
              <ActionLink href={externalLinks.shop} external outline>
                Каталог продукции
              </ActionLink>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-16 right-5.5 z-20 flex items-center gap-3 max-sm:bottom-5">
        <button
          className="hero-control"
          type="button"
          onClick={() => go(active - 1)}
          aria-label="Предыдущий слайд"
        >
          ←
        </button>
        <span className="min-w-16 text-center font-mono text-xs tracking-[.15em] text-white/55">
          <b className="text-sm text-white">0{active + 1}</b> / 0{products.length}
        </span>
        <button
          className="hero-control"
          type="button"
          onClick={() => go(active + 1)}
          aria-label="Следующий слайд"
        >
          →
        </button>
      </div>

      <Link
        href="#systems"
        className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 font-mono text-[9px] tracking-[.28em] text-white/35 uppercase sm:flex"
      >
        Прокрутить <span className="scroll-cue">↓</span>
      </Link>
      {!reducedMotion && (
        <motion.span
          key={`progress-${active}`}
          className="absolute inset-x-0 bottom-0 z-20 h-0.75 origin-left bg-accent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: slideDuration / 1000, ease: "linear" }}
        />
      )}
      <span className="sr-only">{company.distributorStatement}</span>
    </section>
  );
}
