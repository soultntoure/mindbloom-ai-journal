import { create } from 'zustand';

interface UserState {
  token: string | null;
  user: { id: string; email: string } | null;
  setToken: (token: string | null) => void;
  setUser: (user: { id: string; email: string } | null) => void;
  logout: () => void;
}

const useUserStore = create<UserState>((set) => ({
  token: null,
  user: null,
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
  logout: () => set({ token: null, user: null }),
}));

export default useUserStore;
