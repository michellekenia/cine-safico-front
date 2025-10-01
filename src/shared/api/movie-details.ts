import apiClient from "./client";
import { MovieDetail } from "../interfaces/movies-details.interface";

/**
 * Busca os detalhes completos de um filme pelo slug
 * @param slug - O identificador único do filme na URL
 * @returns Os detalhes completos do filme
 */
export async function getMovieBySlug(slug: string): Promise<MovieDetail> {
    try {
        const response = await apiClient.get<MovieDetail>(`/movies/${slug}`);
        return response.data;
    } catch (error: any) {
        console.error(`Erro ao buscar detalhes do filme ${slug}:`, error.response?.data || error.message);
        throw new Error(`Não foi possível carregar os detalhes do filme. ${error.response?.data?.message || ''}`);
    }
}

/**
 * Busca os detalhes completos de um filme pelo ID
 * @param id - O ID único do filme
 * @returns Os detalhes completos do filme
 */
export async function getMovieById(id: string): Promise<MovieDetail> {
    try {
        const response = await apiClient.get<MovieDetail>(`/movies/id/${id}`);
        return response.data;
    } catch (error: any) {
        console.error(`Erro ao buscar detalhes do filme com ID ${id}:`, error.response?.data || error.message);
        throw new Error(`Não foi possível carregar os detalhes do filme. ${error.response?.data?.message || ''}`);
    }
}