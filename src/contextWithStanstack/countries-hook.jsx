import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "../services/countriesFetch";

// Hook principal para obtener todos los países
export const useAllCountries = () => {
  return useQuery({
    queryKey: ["allCountries"],
    queryFn: async () => {
      const data = await fetchCountries();
      // Filtramos países válidos
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
    staleTime: 5 * 60 * 1000, // 5 minutos de caché fresca
  });
};

// Hook para países paginados
export const usePaginatedCountries = (
  initialPage = 1,
  countriesPerPage = 10,
) => {
  // Estado local para la paginación
  const [pagination, setPagination] = useState({
    currentPage: initialPage,
    countriesPerPage,
    indexFirst: (initialPage - 1) * countriesPerPage,
    indexLast: initialPage * countriesPerPage,
  });

  // Usamos el hook de todos los países
  const allCountriesQuery = useAllCountries();

  // Función para cambiar de página
  const handlePageChange = (page) => {
    const indexFirst = (page - 1) * pagination.countriesPerPage;
    const indexLast = indexFirst + pagination.countriesPerPage;
    setPagination({
      ...pagination,
      currentPage: page,
      indexFirst,
      indexLast,
    });
  };

  // Computamos los países paginados
  const paginatedCountries = allCountriesQuery.data
    ? allCountriesQuery.data.slice(pagination.indexFirst, pagination.indexLast)
    : [];

  return {
    // Datos paginados
    countries: paginatedCountries,
    // Datos de todos los países
    allCountries: allCountriesQuery.data || [],
    // Estados de carga y error
    isLoading: allCountriesQuery.isLoading,
    error: allCountriesQuery.error,
    // Paginación
    pagination,
    handlePageChange,
  };
};
