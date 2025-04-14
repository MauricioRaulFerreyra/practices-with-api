import { gql, useQuery } from "@apollo/client";
import { usePagination } from "../contextOnlyPagination/PaginationContext";
import { useEffect, useState } from "react";

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      capital
      continent {
        name
      }
      languages {
        name
      }
      emoji
    }
  }
`;

export function useCountries() {
  const { currentPage, handlePageChange } = usePagination();
  const countriesPerPage = 10;

  const { data, loading: gqlLoading, error } = useQuery(GET_COUNTRIES);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndCombineData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const restCountries = await response.json();
        const allGraphQLCountries = data?.countries || [];

        const merged = allGraphQLCountries.map((gqlCountry) => {
          const match = restCountries.find(
            (restCountry) => restCountry.cca2 === gqlCountry.code,
          );

          return {
            cca2: gqlCountry.code,
            name: { common: gqlCountry.name },
            flags: {
              png: match?.flags?.png || "", // bandera real
              alt: match?.flags?.alt || `Bandera de ${gqlCountry.name}`,
              emoji: gqlCountry.emoji,
            },
            region: gqlCountry.continent.name,
            population: match?.population || 0,
          };
        });

        setCountries(merged);
      } catch (err) {
        console.error("Error fetching REST countries:", err);
      } finally {
        setLoading(false);
      }
    };

    if (data && !gqlLoading) {
      fetchAndCombineData();
    }
  }, [data, gqlLoading]);

  // Paginación
  const indexFirst = (currentPage - 1) * countriesPerPage;
  const indexLast = indexFirst + countriesPerPage;
  const paginatedCountries = countries.slice(indexFirst, indexLast);

  return {
    countries: paginatedCountries,
    allCountries: countries,
    error,
    isLoading: gqlLoading || loading,
    currentPage,
    countriesPerPage,
    filteredCount: countries.length,
    handlePageChange,
  };
}
