import styles from "./CountriesList.module.css";
import { CountryDetails, Loader } from "../";
import { useCountries } from "../../contextWithTanstack/countries-hook";

export const CountriesList = () => {
  const { countries, error, isLoading } = useCountries();

  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;
  if (!countries || countries.length === 0) return <p>NOT FOUND COUNTRIES</p>;

  return (
    <>
      <section className={styles.container}>
        {countries?.map((country) => (
          <div key={country.cca2} className={styles.country}>
            <CountryDetails
              id={country.cca2}
              name={country.name.common}
              image={country.flags.png}
              region={country.region || "Región desconocida"}
              population={country.population || 0}
              alt={country.flags.alt || `Bandera de ${country.name.common}`}
            />
          </div>
        ))}
      </section>
    </>
  );
};
