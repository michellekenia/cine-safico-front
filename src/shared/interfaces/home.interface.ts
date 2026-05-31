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