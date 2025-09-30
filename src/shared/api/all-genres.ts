import apiClient from "./client";
import { GenresResponse } from '../interfaces/all-genres.interface';


export async function getAllGenres(): Promise<GenresResponse> {
    const response = await apiClient.get<GenresResponse>('movies/metadata/genres');
    return response.data;    
}