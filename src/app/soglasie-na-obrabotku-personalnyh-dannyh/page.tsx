import { LegalPage } from "@/components/pages/legal-page";
import { legalLinks } from "@/config/legal";
import { legalDocuments } from "@/data/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  legalDocuments.consent.title,
  legalDocuments.consent.description,
  legalLinks.consent.href,
);

export default function Page() {
  return <LegalPage document="consent" />;
}
