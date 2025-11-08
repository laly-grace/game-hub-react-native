import { useInfiniteQuery } from "@tanstack/react-query";
import APIClient from "@/services/api-client";
import useGameStore from "@/store";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}
export interface Game {
  id: number;
  name: string;
  slug: string;
  background_image: string;
  released: Date;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  genres: Genre[];
}
export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

interface FetchGamesResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}

const apiClient = new APIClient<Game>("/games");

const useGames = () => {
  const { selectedGenre, selectedPlatform, searchText, sortOrder } =
    useGameStore();

  return useInfiniteQuery<FetchGamesResponse<Game>>({
    queryKey: [
      "games",
      selectedGenre?.id ?? null,
      selectedPlatform?.id ?? null,
      searchText ?? "",
      sortOrder ?? "",
    ],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          genres: selectedGenre?.id,
          platforms: selectedPlatform?.id,
          search: searchText,
          ordering: sortOrder,
          page: pageParam,
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    staleTime: 60 * 60 * 1000,
    networkMode: "offlineFirst",
  });
};

export default useGames;
