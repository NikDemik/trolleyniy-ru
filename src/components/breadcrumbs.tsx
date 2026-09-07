import Link from "next/link";
import { company } from "@/config/company";
import type { ContentLink } from "@/types/content";
import { StructuredData } from "./structured-data";

export function Breadcrumbs({ items }: { items: ContentLink[] }) {
  const links = [{ label: "Главная", href: "/" }, ...items];
  return <>
    <nav aria-label="Хлебные крошки" className="py-6 text-sm text-muted-foreground">
      <ol className="flex flex-wrap gap-x-3 gap-y-2">{links.map((item, i) => <li key={item.href} className="flex items-center gap-3">
        {i > 0 && <span aria-hidden="true" className="text-muted-foreground/60">/</span>}
        {i === links.length - 1 ? <span aria-current="page">{item.label}</span> : <Link className="hover:text-primary hover:underline" href={item.href}>{item.label}</Link>}
      </li>)}</ol>
    </nav>
    <StructuredData data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: links.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.label, item: new URL(item.href, company.website).toString() })) }} />
  </>;
}
