import axios from 'axios';

const BASE_URL = 'https://www.apicountries.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const getCountries = async () => {
  try {
    const response = await apiClient.get('/countries');
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch countries: ${error.message}`);
  }
};

export const getCountryByName = async (name) => {
  try {
    const response = await apiClient.get(`/name/${name}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch country by name: ${error.message}`);
  }
};

export const getCountryByCapital = async (capital) => {
  try {
    const response = await apiClient.get(`/capital/${capital}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch country by capital: ${error.message}`);
  }
};

export const getCountriesByRegion = async (region) => {
  try {
    const response = await apiClient.get(`/region/${region}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch countries by region: ${error.message}`);
  }
};

export const getCountriesBySubregion = async (subregion) => {
  try {
    const response = await apiClient.get(`/subregion/${subregion}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch countries by subregion: ${error.message}`);
  }
};

export const getCountriesByLanguage = async (language) => {
  try {
    const response = await apiClient.get(`/lang/${language}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch countries by language: ${error.message}`);
  }
};

export const getCountriesByCallingCode = async (code) => {
  try {
    const response = await apiClient.get(`/callingcode/${code}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch countries by calling code: ${error.message}`);
  }
};

export const getCountryByAlphaCode = async (code) => {
  try {
    const response = await apiClient.get(`/alpha/${code}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw new Error(`Failed to fetch country by alpha code: ${error.message}`);
  }
};
