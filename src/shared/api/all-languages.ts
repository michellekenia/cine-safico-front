import { AllLanguagesResponse } from '../interfaces/all-languages.interface'
import apiClient from '../api/client'

export const getAllLanguages = async (): Promise<AllLanguagesResponse> => {
  const response = await apiClient.get('movies/metadata/languages')
  return response.data
}
