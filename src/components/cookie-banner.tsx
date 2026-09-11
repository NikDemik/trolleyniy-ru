"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cookieConsent, type AnalyticsConsent } from "@/config/cookies";
import { Button } from "@/components/ui/button";

const metrikaId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
const consentValue = (choice: AnalyticsConsent) => `${cookieConsent.version}.${choice}`;

function readConsent(): AnalyticsConsent | null {
  const cookie = document.cookie
    .split(";")
    .find((item) => item.trim().startsWith(`${cookieConsent.cookieName}=`));
  let value = "";
  try {
    value = cookie ? decodeURIComponent(cookie.split("=").slice(1).join("=")) : "";
  } catch {
    return null;
  }

  if (value.startsWith(`${consentValue("granted")}.`)) return "granted";
  if (value.startsWith(`${consentValue("denied")}.`)) return "denied";
  return null;
}

function writeConsent(choice: AnalyticsConsent) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${cookieConsent.cookieName}=${encodeURIComponent(`${consentValue(choice)}.${Date.now()}`)}; Path=/; Max-Age=${cookieConsent.maxAgeSeconds}; SameSite=Lax${secure}`;
}

function removeMetrika() {
  if (!metrikaId || !/^\d+$/.test(metrikaId)) return;

  window.ym?.(Number(metrikaId), "destruct");
}

function YandexMetrika() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);
  useEffect(() => {
    if (!metrikaId || !/^\d+$/.test(metrikaId)) return;

    window.ym =
      window.ym ??
      Object.assign(
        (...args: unknown[]) => {
          (window.ym!.a = window.ym!.a ?? []).push(args);
        },
        { a: [] as unknown[][], l: Date.now() },
      );

    window.ym(Number(metrikaId), "init", {
      accurateTrackBounce: true,
      defer: true,
      clickmap: true,
      sendTitle: false,
      trackLinks: true,
      webvisor: true,
    });

    if (!document.getElementById("yandex-metrika-script")) {
      const script = document.createElement("script");
      script.id = "yandex-metrika-script";
      script.async = true;
      script.src = "https://mc.yandex.ru/metrika/tag.js";
      document.head.appendChild(script);
    }

    lastTrackedPath.current = window.location.pathname;
    window.ym(Number(metrikaId), "hit", window.location.href);

    return removeMetrika;
  }, []);

  useEffect(() => {
    if (
      !metrikaId ||
      !/^\d+$/.test(metrikaId) ||
      lastTrackedPath.current === null ||
      lastTrackedPath.current === pathname
    ) {
      return;
    }

    lastTrackedPath.current = pathname;
    window.ym?.(Number(metrikaId), "hit", window.location.href);
  }, [pathname]);

  return null;
}

export function CookieBanner() {
  const [choice, setChoice] = useState<AnalyticsConsent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const savedChoice = readConsent();
      setChoice(savedChoice);
      setIsVisible(savedChoice === null);
    });
    const openSettings = () => setIsVisible(true);
    window.addEventListener(cookieConsent.settingsEvent, openSettings);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener(cookieConsent.settingsEvent, openSettings);
    };
  }, []);

  useEffect(() => {
    if (isVisible && choice !== null) panelRef.current?.focus();
  }, [choice, isVisible]);

  function selectChoice(nextChoice: AnalyticsConsent) {
    writeConsent(nextChoice);
    setChoice(nextChoice);
    setIsVisible(false);

    if (nextChoice === "denied") removeMetrika();
  }

  return (
    <>
      {choice === "granted" && <YandexMetrika />}
      {isVisible && (
        <aside
          ref={panelRef}
          tabIndex={-1}
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
          className="fixed right-3 bottom-3 left-3 z-[1100] border border-border bg-surface/95 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-md sm:right-6 sm:bottom-6 sm:left-auto sm:max-w-xl"
        >
          <div className="h-1 bg-accent" aria-hidden="true" />
          <div className="p-5 sm:p-6">
            <p className="font-mono text-[10px] font-semibold tracking-[.2em] text-accent uppercase">
              Конфиденциальность
            </p>
            <h2
              id="cookie-consent-title"
              className="mt-2 font-display text-2xl text-silver-bright uppercase"
            >
              {cookieConsent.title}
            </h2>
            <p
              id="cookie-consent-description"
              className="mt-3 text-sm leading-6 text-muted-foreground"
            >
              {cookieConsent.description}
            </p>
            <Link
              href={cookieConsent.detailsHref}
              className="mt-3 inline-block text-sm text-silver underline decoration-border underline-offset-4 transition-colors hover:text-white"
            >
              {cookieConsent.detailsLabel}
            </Link>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Button type="button" variant="outline" onClick={() => selectChoice("denied")}>
                {cookieConsent.rejectLabel}
              </Button>
              <Button type="button" onClick={() => selectChoice("granted")}>
                {cookieConsent.acceptLabel}
              </Button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(cookieConsent.settingsEvent))}
      className="text-left hover:text-white"
    >
      {cookieConsent.settingsLabel}
    </button>
  );
}

declare global {
  interface Window {
    ym?: ((...args: unknown[]) => void) & { a?: unknown[][]; l?: number };
  }
}
