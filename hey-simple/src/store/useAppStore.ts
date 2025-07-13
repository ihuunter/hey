import { create } from 'zustand'
import type { User } from '../lib/supabase'

interface AppState {
  // User state
  currentUser: User | null
  isAuthenticated: boolean
  
  // UI state
  isDarkMode: boolean
  isLoading: boolean
  isSidebarOpen: boolean
  
  // Actions
  setCurrentUser: (user: User | null) => void
  setAuthenticated: (isAuth: boolean) => void
  toggleDarkMode: () => void
  setLoading: (loading: boolean) => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  currentUser: null,
  isAuthenticated: false,
  isDarkMode: false,
  isLoading: false,
  isSidebarOpen: false,
  
  // Actions
  setCurrentUser: (user) => set({ currentUser: user }),
  setAuthenticated: (isAuth) => set({ isAuthenticated: isAuth }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setLoading: (loading) => set({ isLoading: loading }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
}))