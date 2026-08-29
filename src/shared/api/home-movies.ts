import apiClient from "./client";
import { GenreSections, HomeMovies, MovieListResponse, AllMovieListsResponse } from "../interfaces/home.interface";

export async function getHighLightsMovies(): Promise<HomeMovies[]> {
    const response = await apiClient.get<HomeMovies[]>('/movies/highlights');
    return response.data;
}

export async function getGenresMovies(): Promise<GenreSections> {
    const response = await apiClient.get<GenreSections>('/movies/by-genre');
    return response.data;    
}

export async function getMovieList(
  slug: string,
  pageSize?: number,
): Promise<MovieListResponse> {
  const response = await apiClient.get<MovieListResponse>(
    `/movies/lists/${slug}`,
    { params: pageSize !== undefined ? { pageSize } : undefined },
  );

  return response.data;
}

export async function getAllMovieLists(
  featured?: boolean,
): Promise<AllMovieListsResponse> {
  const response = await apiClient.get<AllMovieListsResponse>(
    '/movies/lists-all',
    { params: featured !== undefined ? { featured } : undefined },
  );

  return response.data;
}
