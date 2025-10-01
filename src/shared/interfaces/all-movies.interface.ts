/**
 * Interface para representar um filme na listagem de filmes
 */
export interface MovieListItem {
  id: string;           
  slug: string;         
  title: string;        
  releaseDate: string;  
  posterImage: string; 
}

/**
 * Interface para a resposta paginada da API de filmes
 */
export interface PaginatedMoviesResponse {
  data: MovieListItem[]; 
  total: number;         
  currentPage: number;  
  totalPages: number;     
}

/**
 * Interface para parâmetros de consulta na API de filmes
 */
export interface MoviesQueryParams {
  page?: number;          
  pageSize?: number;      
  search?: string;    
  genre?: string;
  country?: string;
  language?: string;        
  sortBy?: 'title' | 'releaseDate' | 'rating'; 
  sortOrder?: 'asc' | 'desc';                  
}