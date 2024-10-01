import { create } from "zustand";

const initialState = {
  page: 1,
  limit: 10,
  setPage: (page: number) => {},
  setLimit: (limit: number) => {},
};

type FilterState = {
  page: number;
  limit: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
};

export const useFilters = create<FilterState>((set, get) => ({
  ...initialState,
  setPage: (page: number) => set({ page }),
  setLimit: (limit: number) => set({ limit }),
}));
