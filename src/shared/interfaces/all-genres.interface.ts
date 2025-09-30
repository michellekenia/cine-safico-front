/**
 * Interface para representar um gênero de filme individual
 */
export interface GenreItem {
  slug: string;     // Identificador único do gênero em formato URL-friendly
  nome: string;     // Nome do gênero em inglês
  nomePt: string;   // Nome do gênero em português
  count: number;    // Quantidade de filmes neste gênero
}

/**
 * Interface para representar a resposta completa da API de gêneros
 */
export interface GenresResponse {
  items: GenreItem[]; // Lista de gêneros disponíveis
  total: number;      // Número total de gêneros
}
