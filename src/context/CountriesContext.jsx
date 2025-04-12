import { useState, useEffect, createContext, useContext } from "react";
import { fetchCountries } from "../services/countriesFetch";

const CountriesContext = createContext();

export const CountriesProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allCountries, setAllCountries] = useState([]);

  const [pagination, setPagination] = useState({
    indexFirst: 0,
    indexLast: 10,
    currentPage: 1,
    countriesPerPage: 10,
  });

  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        const data = await fetchCountries();
        const validCountries = data.filter(
          (country) =>
            (country?.cca2 &&
              country.name?.common &&
              country.flags.png &&
              country.region &&
              country.population &&
              country.flags.alt) ||
            `Bandera de ${country.name.common}`,
        );

        setAllCountries(validCountries);
        const slicedCountries = validCountries.slice(
          pagination.indexFirst,
          pagination.indexLast,
        );
        setCountries(slicedCountries);
      } catch (err) {
        console.error("Error en loadCountries:", err);
        setError(err.message || "Error desconocido al cargar países");
      } finally {
        setLoading(false);
      }
    };
    loadCountries();
  }, [pagination.indexFirst, pagination.indexLast]);

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

  return (
    <CountriesContext.Provider
      value={{
        countries,
        allCountries,
        error,
        loading,
        pagination,
        handlePageChange,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
};

export const useCountriesContext = () => {
  const context = useContext(CountriesContext);
  if (!context) {
    throw new Error(
      "useCountriesContext debe ser usado dentro de un CountriesProvider",
    );
  }
  return context;
};
