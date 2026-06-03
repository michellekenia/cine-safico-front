import apiClient from "./client";
import { GenreSections, HomeMovies,  MovieListResponse,} from "../interfaces/home.interface";

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
): Promise<MovieListResponse> {
  const response = await apiClient.get<MovieListResponse>(
    `/movies/lists/${slug}`,
  );

  return response.data;
}
