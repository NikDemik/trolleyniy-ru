import { HomePage } from "@/components/pages/home-page";
import { homeSeo } from "@/data/registry";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(homeSeo.title, homeSeo.description);
export default HomePage;
