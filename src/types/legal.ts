import type { ContentLink } from "./content";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  points?: string[];
  links?: ContentLink[];
};

export type LegalDocument = {
  title: string;
  description: string;
  intro: string;
  sections: LegalSection[];
};
