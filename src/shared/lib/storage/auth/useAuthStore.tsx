import { create } from 'zustand';

interface UserInfo {
  email?: string;
  provider?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: UserInfo | null;

  login: (user: UserInfo) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,

  // Đăng nhập đơn giản
  login: (user) => {
    set({
      isLoggedIn: true,
      user,
    });
  },

  // Đăng xuất
  logout: () => {
    set({
      isLoggedIn: false,
      user: null,
    });
  },
}));

// useAuthStore.getState().login({
//   email: 'abc@gmail.com',
//   provider: 'local'
// });

//useAuthStore.getState().logout();
