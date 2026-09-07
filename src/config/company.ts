// TODO: заполнить и подтвердить перед запуском. null никогда не отображается как реквизит.
export const company = {
  companyName: "Троллейный шинопровод",
  legalName: "ООО «Троллейный шинопровод»",
  phone: null as string | null,
  email: null as string | null,
  address: null as string | null,
  workHours: null as string | null,
  inn: null as string | null,
  kpp: null as string | null,
  ogrn: null as string | null,
  website: "https://trolleyniy.ru",
  shopUrl: "https://shinoprovod-anneng.ru",
  distributorStatement: "Официальный дистрибьютор ANNENG Electric в России",
  documents: [] as { label: string; href: string }[],
  legalLinks: [] as { label: string; href: string }[],
};

export const commercialTerms = {
  payment: null as string | null,
  deliveryMethods: null as string | null,
  transportCompanies: null as string | null,
  leadTime: null as string | null,
  warrantyPeriod: null as string | null,
};
