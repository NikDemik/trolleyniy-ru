import { notFound } from "next/navigation";
import { pages, getPage, hrefFor } from "@/data/registry";
import { pageMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/pages/content-page";

type Props = { params: Promise<{ slug: string[] }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return pages.map((page) => ({ slug: page.slug.split("/") }));
}
export async function generateMetadata({ params }: Props) {
  const page = getPage((await params).slug.join("/"));
  if (!page) notFound();
  return pageMetadata(page.title, page.description, hrefFor(page.slug));
}
export default async function Page({ params }: Props) {
  return <ContentPage slug={(await params).slug.join("/")} />;
}
