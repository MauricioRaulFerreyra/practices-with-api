// countries-hook.js
import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "../services/countriesFetch";
// import { usePaginationStore } from "../zustand/paginationStore";
import { usePagination } from "../contextOnlyPagination/PaginationContext";

export function useCountries() {
  const { currentPage, handlePageChange } = usePagination();
  // const { currentPage, setCurrentPage } = usePaginationStore(); usando ZUSTAND
  const countriesPerPage = 10;

  const {
    data: allCountries = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const data = await fetchCountries();
      return data.filter(
        (country) =>
          (country?.cca2 &&
            country.name?.common &&
            country.flags.png &&
            country.region &&
            country.population &&
            country.flags.alt) ||
          `Bandera de ${country.name.common}`,
      );
    },
  });

  // Cálculos de paginación
  const indexFirst = (currentPage - 1) * countriesPerPage;
  const indexLast = indexFirst + countriesPerPage;
  const countries = allCountries.slice(indexFirst, indexLast);
  const filteredCount = allCountries.length;

  // Usando ZUSTAND
  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  return {
    countries,
    allCountries,
    error,
    isLoading,
    countriesPerPage,
    filteredCount,
    currentPage,
    handlePageChange,
  };
}
