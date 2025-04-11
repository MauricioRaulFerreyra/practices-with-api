import style from "./CountriesList.module.css";
import { Loader } from "../index";
import { CountryDetails } from "../index";
import { useCountriesContext } from "../../context/CountriesContext";

export const CountriesList = () => {
  const { countries, error, loading } = useCountriesContext();

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  if (!countries || countries.length === 0)
    return <p>No SE ENCONTRARON PAÍSES</p>;

  return (
    <section className={style.container}>
      {countries.map((country) => (
        <div key={country.cca2} className={style.country}>
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
  );
};
