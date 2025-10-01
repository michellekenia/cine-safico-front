import { MovieListItem } from './all-movies.interface';

/**
 * Interface para representar um gênero, país ou idioma
 */
export interface TaxonomyItem {
  id: string;
  nome: string;
  nomePt: string | null;
  slug: string;
}

/**
 * Interface para um filme completo com todos os detalhes
 * Usado na página de detalhes do filme
 */
// Interface para serviços de streaming
export interface StreamingService {
  id: string;
  service: string;
  link?: string;
  scrapedMovieId?: string;
}

export interface MovieDetail extends MovieListItem {
  director: string;
  synopsisEn: string | null;
  synopsisPt: string | null;
  duration: string;
  rating: string;
  scrapedAt: string;
  streamingServices: (string | StreamingService)[]; // Pode ser string ou objeto StreamingService
  genres: TaxonomyItem[];
  country: TaxonomyItem[];
  language: TaxonomyItem[];
}
