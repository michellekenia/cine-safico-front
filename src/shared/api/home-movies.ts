import apiClient from "./client";
import { HomeMovies } from "../interfaces/home.interface";

export async function getHighLightsMovies(): Promise<HomeMovies[]> {
    const response = await apiClient.get<HomeMovies[]>('/movies/highlights');
    return response.data;
}

export async function getGenresMovies(genre: string = 'comedy'): Promise<HomeMovies[]> {
    const formattedGenre = genre.startsWith('/') ? genre.substring(1) : genre;
    const response = await apiClient.get<HomeMovies[]>(`/movies/by-genre/${formattedGenre}`);
    return response.data;    
}