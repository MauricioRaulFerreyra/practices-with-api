import useSWR from "swr";
import { fetchCountries } from "../services/countriesFetch";
import { usePagination } from "../contextOnlyPagination/PaginationContext";

// Definimos el fetcher para SWR
const fetcher = async () => {
  const data = await fetchCountries();

  return data
    .filter(
      (country) =>
        country?.cca2 &&
        country.name?.common &&
        country.flags?.png &&
        country.region &&
        country.population,
    )
    .map((country) => ({
      ...country,
      flags: {
        ...country.flags,
        alt: country.flags?.alt || `Bandera de ${country.name.common}`,
      },
    }));
};

export function useCountries() {
  const { currentPage, handlePageChange } = usePagination();
  const countriesPerPage = 10;

  const {
    data: allCountries = [],
    error,
    isLoading,
  } = useSWR("countries", fetcher);

  // Cálculos de paginación
  const indexFirst = (currentPage - 1) * countriesPerPage;
  const indexLast = indexFirst + countriesPerPage;
  const countries = allCountries.slice(indexFirst, indexLast);
  const filteredCount = allCountries.length;

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
