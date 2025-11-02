import apiClient from "./client";
import { YearResponse } from '../interfaces/all-years.interface';


export async function getAllYears(): Promise<YearResponse> {
    const response = await apiClient.get<YearResponse>('movies/metadata/years');
    return response.data;    
}
