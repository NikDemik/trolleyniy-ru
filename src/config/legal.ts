export const legalLinks = {
  processing: {
    label: "Политика обработки персональных данных",
    href: "/politika-obrabotki-personalnyh-dannyh/",
  },
  consent: {
    label: "Согласие на обработку персональных данных",
    href: "/soglasie-na-obrabotku-personalnyh-dannyh/",
  },
  privacy: { label: "Политика конфиденциальности", href: "/politika-konfidencialnosti/" },
} as const;

export const legalConfig = {
  version: "2026-09-11",
  versionLabel: "11 сентября 2026 года",
  inquiryEmail: "zapros@trolleyniy.ru",
  inquiryRetention: "не более одного года с даты получения обращения",
} as const;
