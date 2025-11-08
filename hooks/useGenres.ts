import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { Genre } from "./useGames";

const apiClient = new APIClient<Genre>("/genres");

const useGenres = () =>
  useQuery({
    queryKey: ["genres"],
    queryFn: apiClient.getAll,
    staleTime: 86400000,
    networkMode: "offlineFirst",
  });

export default useGenres;
