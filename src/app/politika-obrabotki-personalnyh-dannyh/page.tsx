import { LegalPage } from "@/components/pages/legal-page";
import { legalLinks } from "@/config/legal";
import { legalDocuments } from "@/data/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  legalDocuments.processing.title,
  legalDocuments.processing.description,
  legalLinks.processing.href,
);

export default function Page() {
  return <LegalPage document="processing" />;
}
