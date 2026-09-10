import { legalLinks } from "./legal";

// TODO: заполнить и подтвердить перед запуском. null никогда не отображается как реквизит.
export const company = {
  companyName: "Троллейный шинопровод",
  legalName: "ООО «Троллейный шинопровод»",
  phone: "+7 (499) 113-11-58" as string | null,
  email: "info@trolleyniy.ru" as string | null,
  address:
    "Московская обл, г.о. Долгопрудный, г Долгопрудный, пр-кт Лихачевский, д. 46, стр. 1, этаж 3, ПОМЕЩЕНИЕ №14" as
      string | null,
  workHours: "пн-пт: 9:00-18:00, сб-вс: выходной" as string | null,
  inn: "5047310649" as string | null,
  kpp: "504701001" as string | null,
  ogrn: "1255000018613" as string | null,
  website: "https://trolleyniy.ru",
  shopUrl: "https://shinoprovod-anneng.ru",
  distributorStatement: "Официальный дистрибьютор ANNENG Electric в России",
  documents: [
    {
      label: "Каталог продукции ANNENG Electric",
      href: "/documents/catalog-anneng-2026.pdf",
    },
    {
      label: "Сертификат соответствия",
      href: "/documents/certificate-conformity-anneng.pdf",
    },
    {
      label: "Подтверждение статуса официального дистрибьютора",
      href: "/documents/distributor-authorization-anneng.pdf",
    },
  ] as { label: string; href: string }[],
  legalLinks: Object.values(legalLinks),
};

export const commercialTerms = {
  payment: null as string | null,
  deliveryMethods: null as string | null,
  transportCompanies: null as string | null,
  leadTime: null as string | null,
  warrantyPeriod: null as string | null,
};
