import APIClient from "@/services/api-client";
import { Platform } from "./useGames";
import { useQuery } from "@tanstack/react-query";

const apiClient = new APIClient<Platform>("/platforms/lists/parents");

const usePlatforms = () =>
  useQuery({
    queryKey: ["platforms"],
    queryFn: apiClient.getAll,
    staleTime: 86400000,
    networkMode: "offlineFirst",
  });

export default usePlatforms;
