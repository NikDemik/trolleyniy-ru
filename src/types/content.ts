export type ContentLink = { label: string; href: string };
export type MediaAsset = {
  src: string | null;
  alt: string;
  kind: "rail" | "mono" | "festoon" | "industrial";
};
export type ContentSection = { title: string; text: string; points?: string[] };
export type FaqItem = { question: string; answer: string };
export type PageContent = {
  slug: string;
  label: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  category: "product" | "solution" | "industry" | "company" | "index";
  parent?: string;
  sections: ContentSection[];
  related?: string[];
  faq?: FaqItem[];
  media?: MediaAsset;
  shopKey?: "trolley" | "mono" | "festoon";
  form?: boolean;
};
export type ProjectCase = {
  slug: string;
  title: string;
  objectType: string;
  task: string;
  initialData: string;
  solution: string;
  products: string[];
  result: string;
  photos: MediaAsset[];
  related: string[];
};
