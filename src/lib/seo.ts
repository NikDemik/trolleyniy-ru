import type { Metadata } from "next";
import { company } from "@/config/company";

export function pageMetadata(title: string, description: string, path = "/"): Metadata {
  const url = new URL(path, company.website).toString();
  return {
    title: { absolute: title }, description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: company.legalName, type: "website", locale: "ru_RU" },
    twitter: { card: "summary", title, description },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org", "@type": "Organization", "@id": `${company.website}/#organization`,
    name: company.companyName, legalName: company.legalName, url: company.website,
    ...(company.phone ? { telephone: company.phone } : {}),
    ...(company.email ? { email: company.email } : {}),
    ...(company.address ? { address: { "@type": "PostalAddress", streetAddress: company.address } } : {}),
    ...(company.inn ? { taxID: company.inn } : {}),
  };
}
export function websiteSchema() {
  return { "@context": "https://schema.org", "@type": "WebSite", "@id": `${company.website}/#website`, url: company.website, name: company.legalName, inLanguage: "ru-RU", publisher: { "@id": `${company.website}/#organization` } };
}
export function serializeJsonLd(data: unknown) { return JSON.stringify(data).replace(/</g, "\\u003c"); }
