import axios from 'axios';
import { Country } from './types.js';

const BASE_URL = 'https://www.apicountries.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const getCountries = async (): Promise<Country[]> => {
  try {
    const response = await apiClient.get<Country[]>('/countries');
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch countries: ${error.message}`);
  }
};

export const getCountryByName = async (name: string): Promise<Country[] | null> => {
  try {
    const response = await apiClient.get<Country[]>(`/name/${name}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch country by name: ${error.message}`);
  }
};

export const getCountryByCapital = async (capital: string): Promise<Country[] | null> => {
  try {
    const response = await apiClient.get<Country[]>(`/capital/${capital}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch country by capital: ${error.message}`);
  }
};

export const getCountriesByRegion = async (region: string): Promise<Country[]> => {
  try {
    const response = await apiClient.get<Country[]>(`/region/${region}`);
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch countries by region: ${error.message}`);
  }
};

export const getCountriesBySubregion = async (subregion: string): Promise<Country[]> => {
  try {
    const response = await apiClient.get<Country[]>(`/subregion/${subregion}`);
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch countries by subregion: ${error.message}`);
  }
};

export const getCountriesByLanguage = async (language: string): Promise<Country[]> => {
  try {
    const response = await apiClient.get<Country[]>(`/lang/${language}`);
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch countries by language: ${error.message}`);
  }
};

export const getCountriesByCallingCode = async (code: string): Promise<Country[]> => {
  try {
    const response = await apiClient.get<Country[]>(`/callingcode/${code}`);
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch countries by calling code: ${error.message}`);
  }
};

export const getCountryByAlphaCode = async (code: string): Promise<Country | null> => {
  try {
    const response = await apiClient.get<Country>(`/alpha/${code}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch country by alpha code: ${error.message}`);
  }
};
