import apiClient from "./client";
import { StreamingPlatformsResponse } from '../interfaces/all-streaming.interface';


export async function getAllStreamingPlatforms(): Promise<StreamingPlatformsResponse> {
    const response = await apiClient.get<StreamingPlatformsResponse>('movies/metadata/platforms');
    return response.data;    
}