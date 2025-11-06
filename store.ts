import { create } from "zustand";
import type { Genre, Platform } from "./hooks/useGames";

interface GameStore {
  selectedGenre?: Genre | null;
  selectedPlatform?: Platform | null;
  sortOrder?: string | null;
  searchText?: string | null;
  isModalVisible: boolean;

  setSelectedGenre: (genre?: Genre) => void;
  setSelectedPlatform: (platform?: Platform) => void;
  setSortOrder: (sortOrder?: string) => void;
  setSearchText: (searchText?: string) => void;
  setIsModalVisible: (isModalVisible: boolean) => void;
}

const useGameStore = create<GameStore>((set) => ({
  selectedGenre: null,
  selectedPlatform: null,
  searchText: null,
  sortOrder: null,
  isModalVisible: false,
  setIsModalVisible: (isModalVisible) =>
    set((state) => ({ isModalVisible: !state.isModalVisible })),
  setSelectedGenre: (genre) =>
    set((state) => {
      // Avoid updating if same genre selected
      if (genre?.id !== undefined && state.selectedGenre?.id === genre?.id) {
        return state;
      }
      if (genre === undefined && state.selectedGenre === undefined) {
        return state;
      }
      return { selectedGenre: genre };
    }),
  setSelectedPlatform: (platform) =>
    set((state) => {
      // Avoid updating if same platform selected
      if (
        platform?.id !== undefined &&
        state.selectedPlatform?.id === platform?.id
      ) {
        return state;
      }
      if (platform === undefined && state.selectedPlatform === undefined) {
        return state;
      }
      return { selectedPlatform: platform };
    }),
  setSearchText: (searchText) =>
    set((state) => (state.searchText === searchText ? state : { searchText })),
  setSortOrder: (sortOrder) =>
    set((state) => (state.sortOrder === sortOrder ? state : { sortOrder })),
}));

export default useGameStore;
