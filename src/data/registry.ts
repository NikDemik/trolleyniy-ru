import { products } from "./products";
import { solutions } from "./solutions";
import { industries } from "./industries";
import { corePages } from "./pages";

export const pages = [...corePages, ...products, ...solutions, ...industries];
export function getPage(slug: string) {
  return pages.find((page) => page.slug === slug);
}
export function hrefFor(slug: string) {
  return `/${slug}/`;
}
export const homeSeo = {
  title: "Троллейный шинопровод и системы токоподвода — ООО «Троллейный шинопровод»",
  h1: "Системы токоподвода для промышленного и грузоподъемного оборудования",
  description:
    "ООО «Троллейный шинопровод» — поставщик систем токоподвода для кранового и промышленного оборудования. Троллейные и монотроллейные шинопроводы, фестонные системы. Официальный дистрибьютор ANNENG Electric в России.",
};
