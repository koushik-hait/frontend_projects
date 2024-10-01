import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { expressApi } from "../axios-conf";
import { getCurrentUser } from "@/apis/user";
import { IUser } from "@/types";

type AuthState = {
  user: IUser | null;
  isAuthenticated: boolean;
  userProfile: any | null;
  login: (user: IUser) => void;
  logout: () => void;
  getUserProfile: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      userProfile: null,
      login: (user: IUser) => {
        set({ user, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      getUserProfile: async () => {
        const response = await getCurrentUser();
        if (response?.status === 200) {
          set({ userProfile: response.data.data[0], isAuthenticated: true });
          console.log(response.data.data[0]);
        } else if (response?.status === 404) {
          console.log("No user found");
        } else {
          console.log("Something went wrong");
        }
      },
    }),
    {
      name: "auth-storage", // name of item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default the 'localStorage' is used
    }
  )
);
