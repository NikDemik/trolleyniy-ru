import { company } from "./company";

// /catalog и /configurator найдены в src/components/home соседнего проекта
// shinoprovod-anneng. Доступность на production нужно проверить перед публикацией.
export const externalLinks = {
  shop: company.shopUrl,
  catalog: `${company.shopUrl}/catalog`,
  configurator: `${company.shopUrl}/configurator`,
  // TODO: точные URL соответствующих категорий; не подставлять выдуманные slug.
  trolley: null as string | null,
  mono: null as string | null,
  festoon: null as string | null,
};

export function catalogLink(key?: "trolley" | "mono" | "festoon") {
  const specific = key ? externalLinks[key] : null;
  return { href: specific ?? externalLinks.catalog, specific: Boolean(specific) };
}
