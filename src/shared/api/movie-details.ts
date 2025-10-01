import apiClient from "./client";
import { MovieDetail } from "../interfaces/movies-details.interface";

// Cache simples para armazenar respostas por 10 minutos
const movieCache: Record<string, {data: MovieDetail, timestamp: number}> = {};
const CACHE_TTL = 10 * 60 * 1000; // 10 minutos em milissegundos

/**
 * Busca os detalhes completos de um filme pelo slug
 * @param slug - 
 * @returns
 */
export async function getMovieBySlug(slug: string): Promise<MovieDetail> {
    
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
        throw new Error('Identificador do filme inválido ou vazio');
    }
    
    // Verificar cache primeiro para evitar requisições desnecessárias
    const cacheKey = `slug_${slug}`;
    const now = Date.now();
    const cachedMovie = movieCache[cacheKey];
    
    if (cachedMovie && (now - cachedMovie.timestamp) < CACHE_TTL) {
        console.log(`Usando dados em cache para filme ${slug}`);
        return cachedMovie.data;
    }
    
    let retries = 3; 
    let delay = 1000; 
    let lastError = null;
    
    // Tentativas com backoff exponencial
    while (retries >= 0) {
        try {
            console.log(`Tentativa de buscar filme ${slug} (tentativas restantes: ${retries})`);
            
            const response = await apiClient.get<MovieDetail>(`/movies/${slug}`);
            
            if (!response.data || !response.data.title) {
                throw new Error('A API retornou dados incompletos');
            }
            
            movieCache[cacheKey] = {
                data: response.data,
                timestamp: now
            };
            
            console.log(`Filme ${slug} carregado com sucesso`);
            return response.data;
        } catch (error: any) {
            lastError = error;
            console.error(`Erro ao buscar detalhes do filme ${slug} (tentativas restantes: ${retries}):`, 
                error.response?.data || error.message);
            
            if (error.response && error.response.status === 404) {
                throw new Error(`Filme "${slug}" não encontrado.`);
            }
            
            if (error.response && error.response.status >= 400 && error.response.status < 500) {
                throw new Error(`Erro ao carregar filme: ${error.response?.data?.message || error.message}`);
            }
            
            if (retries > 0) {
                console.log(`Aguardando ${delay}ms antes de tentar novamente...`);
                await new Promise(r => setTimeout(r, delay));
                retries--;
                delay *= 2;
                continue;
            }
            
            break;
        }
    }
    
    const errorMsg = lastError?.message || 'Erro desconhecido';
    throw new Error(`Não foi possível carregar os detalhes do filme após várias tentativas. ${errorMsg}`);
}

/**
 * Busca os detalhes completos de um filme pelo ID
 * @param id - O ID único do filme
 * @returns Os detalhes completos do filme
 */
export async function getMovieById(id: string): Promise<MovieDetail> {
    if (!id || typeof id !== 'string' || id.trim() === '') {
        throw new Error('ID do filme inválido ou vazio');
    }
    
    const cacheKey = `id_${id}`;
    const now = Date.now();
    const cachedMovie = movieCache[cacheKey];
    
    if (cachedMovie && (now - cachedMovie.timestamp) < CACHE_TTL) {
        console.log(`Usando dados em cache para filme ID ${id}`);
        return cachedMovie.data;
    }
    
    let retries = 3;
    let delay = 1000; 
    let lastError = null;
    
    while (retries >= 0) {
        try {
            console.log(`Tentativa de buscar filme ID ${id} (tentativas restantes: ${retries})`);
            const response = await apiClient.get<MovieDetail>(`/movies/id/${id}`);
            
            if (!response.data || !response.data.title) {
                throw new Error('A API retornou dados incompletos');
            }
            
            movieCache[cacheKey] = {
                data: response.data,
                timestamp: now
            };
            
            console.log(`Filme ID ${id} carregado com sucesso`);
            return response.data;
        } catch (error: any) {
            lastError = error;
            console.error(`Erro ao buscar detalhes do filme com ID ${id} (tentativas restantes: ${retries}):`, 
                error.response?.data || error.message);
            
            if (error.response && error.response.status === 404) {
                throw new Error(`Filme com ID "${id}" não encontrado.`);
            }
            
            if (error.response && error.response.status >= 400 && error.response.status < 500) {
                throw new Error(`Erro ao carregar filme: ${error.response?.data?.message || error.message}`);
            }
            
            if (retries > 0) {
                console.log(`Aguardando ${delay}ms antes de tentar novamente...`);
                await new Promise(r => setTimeout(r, delay));
                retries--;
                delay *= 2; 
                continue;
            }
            
            break;
        }
    }
    
    const errorMsg = lastError?.message || 'Erro desconhecido';
    throw new Error(`Não foi possível carregar os detalhes do filme após várias tentativas. ${errorMsg}`);
}