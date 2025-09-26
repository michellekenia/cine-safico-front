import { MovieListItem } from './all-movies.interface';

/**
 * Interface para um filme completo com todos os detalhes
 * Usado na página de detalhes do filme
 */
export interface MovieDetail extends MovieListItem {
  rating: number;            
  synopsis: string;           
  director: string;           
  cast: string[];           
  genre: string[];             
  duration: string;           
  streamingPlatforms: string[];
}
