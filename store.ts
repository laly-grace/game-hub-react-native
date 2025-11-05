import { create } from "zustand";
import type { Genre, Platform } from "./hooks/useGames";

interface GameStore {
  selectedGenre?: Genre | null;
  selectedPlatform?: Platform | null;
  sortOrder?: string | null;
  searchText?: string | null;

  setSelectedGenre: (genre?: Genre) => void;
  setSelectedPlatform: (platform?: Platform) => void;
  setSortOrder: (sortOrder?: string) => void;
  setSearchText: (searchText?: string) => void;
}

const useGameStore = create<GameStore>((set) => ({
  selectedGenre: null,
  selectedPlatform: null,
  searchText: null,
  sortOrder: null,
  setSelectedGenre: (genre) =>
    set(() => ({
      selectedGenre: genre,
    })),
  setSelectedPlatform: (platform) =>
    set({
      selectedPlatform: platform,
    }),
  setSearchText: (searchText) => set({ searchText: searchText }),
  setSortOrder: (sortOrder) =>
    set({
      sortOrder: sortOrder,
    }),
}));

export default useGameStore;
