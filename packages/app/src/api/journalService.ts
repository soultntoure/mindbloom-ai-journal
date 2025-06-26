import axios from 'axios';
import { API_URL } from '../config';
import useUserStore from '../state/userStore';

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = useUserStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface JournalEntry {
  _id: string;
  content: string;
  mood: string;
  createdAt: string;
}

export const getJournalEntries = async (): Promise<JournalEntry[]> => {
  const response = await apiClient.get('/journal');
  return response.data;
};

export const createJournalEntry = async (content: string, mood: string): Promise<JournalEntry> => {
  const response = await apiClient.post('/journal', { content, mood });
  return response.data;
};

export const getAIPrompt = async (content: string): Promise<{ prompt: string }> => {
    const response = await apiClient.post('/journal/prompt', { content });
    return response.data;
}
