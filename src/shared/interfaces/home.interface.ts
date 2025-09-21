export interface HomeMovies {
  slug: string;
  title: string;
  releaseDate: string;
  rating: string;
  posterImage: string;
}

export type GenreSections = Record<string, HomeMovies[]>;