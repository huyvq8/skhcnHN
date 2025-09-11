import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthState, LoginRequest, RegisterRequest } from '@/types';
import apiClient from '@/lib/api';

interface AuthStore extends AuthState {
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, userType: string, profile: any) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        try {
          const response = await apiClient.login({ email, password });
          
          if (response.success && response.data) {
            const { user, token } = response.data;
            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            set({ isLoading: false });
            throw new Error(response.error || 'Đăng nhập thất bại');
          }
        } catch (error: any) {
          console.error('Login error:', error);
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (email: string, password: string, userType: string, profile: any) => {
        set({ isLoading: true });
        
        try {
          const userData = {
            email,
            password,
            user_type: userType,
            profile
          };
          
          const response = await apiClient.register(userData);
          
          if (response.success) {
            set({ isLoading: false });
          } else {
            set({ isLoading: false });
            throw new Error(response.error || 'Đăng ký thất bại');
          }
        } catch (error: any) {
          console.error('Registration error:', error);
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        apiClient.logout();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      refreshUser: async () => {
        const { token } = get();
        if (!token) return;

        try {
          const response = await apiClient.getCurrentUser();
          
          if (response.success && response.data) {
            set({ user: response.data.user });
          }
        } catch (error) {
          console.error('Refresh user error:', error);
          // If refresh fails, logout user
          get().logout();
        }
      },

      updateUser: (userData: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...userData } });
        }
      },

      clearError: () => {
        set({ isLoading: false });
      },
    }),
    {
      name: 'hanotex-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Selectors
export const useAuth = () => useAuthStore((state) => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
  isLoading: state.isLoading,
}));

export const useAuthActions = () => useAuthStore((state) => ({
  login: state.login,
  register: state.register,
  logout: state.logout,
  refreshUser: state.refreshUser,
  updateUser: state.updateUser,
  clearError: state.clearError,
}));

export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useIsLoading = () => useAuthStore((state) => state.isLoading);

