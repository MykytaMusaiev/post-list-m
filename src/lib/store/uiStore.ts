import { create } from 'zustand'

export interface UIState {
  isLoading: boolean
  setLoading: (status: boolean) => void
  error: string | null
  setError: (errorMessage: string | null) => void
  successMessage: string | null
  setSuccess: (message: string | null) => void
}

export const useUIStore = create<UIState>((set) => ({
  isLoading: false,
  setLoading: (status) => set({ isLoading: status }),
  error: null,
  setError: (errorMessage) => set({ error: errorMessage }),
  successMessage: null,
  setSuccess: (message) => set({ successMessage: message }),
}))
