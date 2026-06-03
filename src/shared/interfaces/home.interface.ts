export interface HomeMovies {
  slug: string;
  title: string;
  originalTitle: string;
  alternativeTitlePt: string;
  releaseDate: string;
  rating: string;
  posterImage: string;
}

export type GenreSections = Record<string, HomeMovies[]>;

export interface MovieList {
  id: string;
  title: string;
  slug: string;
  description: string;
  isFeatured: boolean;
}

export interface MovieListResponse {
  list: MovieList;
  data: HomeMovies[];
  total: number;
  currentPage: number;
  totalPages: number;
}