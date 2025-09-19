import apiClient from "./client";
import { HomeMovies } from "../interfaces/home.interface";

export async function getHighLightsMovies(): Promise<HomeMovies[]> {
    const response = await apiClient.get<HomeMovies[]>('/movies/highlights');
    return response.data;
}