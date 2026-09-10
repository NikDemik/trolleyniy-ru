import type { MetadataRoute } from "next";
import { company } from "@/config/company";
import { pages, hrefFor } from "@/data/registry";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    ...pages.map((page) => hrefFor(page.slug)),
    ...company.legalLinks.map((link) => link.href),
  ].map((path) => ({
    url: new URL(path, company.website).toString(),
  }));
}
