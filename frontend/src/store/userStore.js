import {create} from 'zustand';
import { persist } from "zustand/middleware";

export const useUserStore = create(
  // persist(
    (set) => ({
  isAuthenticated: false,
  user: null,
  loginState: (userData) => set({ isAuthenticated: true, user: userData }),
  logoutState: () => set({ isAuthenticated: false, user: null }),
}
// ),{name:"user-store"}
));
