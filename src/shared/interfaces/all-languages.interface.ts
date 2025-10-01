export interface LanguageItem {
  slug: string;
  nome: string;
  nomePt: string;
  count: number;
}

export interface AllLanguagesResponse {
  items: LanguageItem[];
  total: number;
}
