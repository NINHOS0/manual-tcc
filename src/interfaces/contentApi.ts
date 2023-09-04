export interface data {
  languages: language[];
  content: content;
}

export interface language {
  id: string;
  name: string;
}

export interface content {
  [langId: string]: section[];
}

export interface section {
  id: string;
  name: string;
  content?: (textItem | linkItem | galleryItem)[];
  routes?: subsection[];
}

export interface subsection {
  id: string;
  name: string;
  content: (textItem | linkItem | galleryItem)[];
}

export interface textItem {
  type: 'text';
  fontSize?: sizes;
  fontWeight?: weights;
  value: string;
}

export interface linkItem {
  type: 'link';
  fontSize?: sizes;
  fontWeight?: weights;
  value: string;
  url: string;
}

export interface galleryItem {
  type: 'gallery';
  images: image[];
}

interface image {
  src: string
  alt: string
}

export type sizes = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
export type weights = "light" | "normal" | "bold";
export type types = "text" | "title" | "link";

export interface ContextProps {
  data: { process: boolean, result: content },
  languages: { process: boolean, result: language[] },
  currentLanguage: string,
  setCurrentLanguage: (v: string) => void
}