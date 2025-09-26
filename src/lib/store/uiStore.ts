import { create } from "zustand";

interface UIState {
  isLoading: boolean;
  error: string | null;
  setLoading: (status:boolean) => void;
  setError: (errorMessage: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isLoading: false,
  error: null,
  setLoading: (status) => set({isLoading: status}),
  setError: (errorMessage) => set({error: errorMessage}),
}));

