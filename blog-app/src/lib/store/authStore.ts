import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
  _id: string;
  username: string;
  email: string;
  isEmailVerified: boolean;
  loginType: string;
  role: string;
  avatar: {
    url: string;
    localPath: string;
  };
  createdAt: string;
  updatedAt: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (user: User) => {
        set({ user, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage", // name of item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default the 'localStorage' is used
    }
  )
);
