export interface Country {
  slug: string;
  nome: string;
  nomePt: string;
  count: number;
}

export interface CountriesResponse {
  items: Country[];
  total: number;
}
