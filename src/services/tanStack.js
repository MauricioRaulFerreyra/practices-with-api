import { useQuery } from "@tanstack/react-query";
import { axiosCountries } from "./countriesAxios";

export const useCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: axiosCountries,
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
  });
};
