// src/shared/api/client.ts
import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.API_URL || 'http://localhost:9090';
export const client = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});
