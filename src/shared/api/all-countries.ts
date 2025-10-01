import apiClient from "./client";
import { CountriesResponse } from "../interfaces/all-countrys.interface";


export async function getAllCountries(): Promise<CountriesResponse> {
    const response = await apiClient.get<CountriesResponse>('movies/metadata/countries');
    return response.data;    
}