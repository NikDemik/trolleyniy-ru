import { legalLinks } from "@/config/legal";

export const cookieConsent = {
  cookieName: "analytics_consent",
  version: "2026-09-11",
  maxAgeSeconds: 60 * 60 * 24 * 365,
  title: "Настройки cookie",
  description:
    "С вашего разрешения ООО «Троллейный шинопровод» подключит Яндекс Метрику и Вебвизор для сбора сведения о посещении и действиях на сайте. Это помогает улучшать сайт. Вы можете отказаться — сайт продолжит работать.",
  detailsLabel: "Подробнее в политике конфиденциальности",
  detailsHref: `${legalLinks.privacy.href}#cookies`,
  acceptLabel: "Разрешить",
  rejectLabel: "Отклонить",
  settingsLabel: "Настройки cookie",
  settingsEvent: "open-cookie-settings",
} as const;

export type AnalyticsConsent = "granted" | "denied";
