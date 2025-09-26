import apiClient from "./client";
import { MoviesQueryParams, PaginatedMoviesResponse } from "../interfaces/all-movies.interface";

export async function getAllMovies(params?: MoviesQueryParams): Promise<PaginatedMoviesResponse> {
    const response = await apiClient.get<PaginatedMoviesResponse>('/movies', { params });
    return response.data;
}