import { content, language } from "./contentProps";

export interface ContextProps {
  isLoading: boolean,
  data: content,
  languages: language[],
  currentLanguage: string,
  setCurrentLanguage: (v: string) => void
}