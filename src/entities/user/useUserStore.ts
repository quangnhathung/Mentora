import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type User = {
  id?: number;
  name?: string;
  email?: string;
  avatar?: string;
  dob?: string;
  streak: number;
  coins: number;
};

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;

  login: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      login: (user) =>
        set({
          user,
          isLoggedIn: true,
        }),

      logout: () =>
        set({
          user: null,
          isLoggedIn: false,
        }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

//dùng: const user = useUserStore((state) => state.user);
