import type { Metadata } from "next";
import "@fontsource/anton/400.css";
import "@fontsource/archivo/400.css";
import "@fontsource/archivo/500.css";
import "@fontsource/archivo/600.css";
import "@fontsource/archivo/700.css";
import "@fontsource/archivo/800.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import { Header } from "@/components/site-header";
import { Footer } from "@/components/site-footer";
import { company } from "@/config/company";
import { StructuredData } from "@/components/structured-data";
import { CookieBanner } from "@/components/cookie-banner";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(company.website),
  title: { default: company.legalName, template: `%s | ${company.legalName}` },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-6 focus:z-50 focus:bg-background focus:p-4"
        >
          Перейти к содержимому
        </a>
        <StructuredData data={organizationSchema()} />
        <StructuredData data={websiteSchema()} />
        <Header />
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
