import apiClient from "./client";
import { MovieDetail } from "../interfaces/movies-details.interface";

/**
 * Busca os detalhes completos de um filme pelo slug
 * @param slug - 
 * @returns
 */
export async function getMovieBySlug(slug: string): Promise<MovieDetail> {
    
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
        throw new Error('Identificador do filme inválido ou vazio');
    }
    
    try {
        console.log(`Buscando filme ${slug}`);
        
        const response = await apiClient.get<MovieDetail>(`/movies/${slug}`);
        
        if (!response.data || !response.data.title) {
            throw new Error('A API retornou dados incompletos');
        }
        
        console.log(`Filme ${slug} carregado com sucesso`);
        return response.data;
    } catch (error: any) {
        console.error(`Erro ao buscar detalhes do filme ${slug}:`, 
            error.response?.data || error.message);
        
        if (error.response && error.response.status === 404) {
            throw new Error(`Filme "${slug}" não encontrado.`);
        }
        
        if (error.response && error.response.status >= 400 && error.response.status < 500) {
            throw new Error(`Erro ao carregar filme: ${error.response?.data?.message || error.message}`);
        }
        
        throw new Error(`Não foi possível carregar os detalhes do filme. ${error.message || 'Erro desconhecido'}`);
    }
}