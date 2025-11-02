export interface YearItem {
  year: number;
  count: number;
}

export interface YearResponse {
  items: YearItem[];
  total: number;
  minYear: number;
  maxYear: number;
}
