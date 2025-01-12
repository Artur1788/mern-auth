import { toast } from 'react-toastify';
import { create } from 'zustand';

import { api } from '../../axios';
import {
  LoginCredentials,
  SignupCredentials,
  UserData,
  AuthStore,
} from './types';
import axios, { AxiosError, isAxiosError } from 'axios';

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
  signup: async (credentials: SignupCredentials) => {
    set({ isLoading: true, error: null });

    try {
      await api.post<UserData>('register', credentials);
      toast.success('Account created successfully');
    } catch (error) {
      if (isAxiosError(error)) {
        set({ error: error?.response?.data?.message });
        throw error.response?.data?.message;
      }
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });

    try {
      const data = (await api.post<UserData>('login', credentials)).data;
      set({ user: data, isAuthenticated: true });
      localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
      toast.success('Welcome');
    } catch (error) {
      if (error instanceof AxiosError) {
        set({ error: error.response?.data?.message });
        toast.error(error.response?.data?.message);
      }
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async (): Promise<void> => {
    set({ isLoading: true, error: null });

    try {
      await api.post('logout');
      localStorage.removeItem('accessToken');
      set({ isAuthenticated: false, user: null });
    } catch (error) {
      if (error instanceof AxiosError) {
        set({ error: error.response?.data?.message });
        toast.error(error.response?.data?.message);
      }
    } finally {
      set({ isLoading: false });
    }
  },

  checkAuth: async (): Promise<void> => {
    set({ isLoading: true, error: null });
    console.log(get());

    try {
      const data = (
        await axios.get(`${import.meta.env.VITE_BASE_URL}refresh`, {
          withCredentials: true,
        })
      ).data;
      localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
      set({ user: data, isAuthenticated: true });
    } catch (error) {
      if (isAxiosError(error)) {
        localStorage.removeItem('accessToken');
        set({
          isAuthenticated: false,
          user: null,
          error: error.response?.data?.message,
        });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));
