import styles from "./CountriesList.module.css";
import { useCountries } from "../../services/tanStack";
import { Loader } from "../../components/loader/Loader";

export const CountriesList = () => {
  const { data, error, isError, isLoading } = useCountries();

  if (isLoading) return <Loader />;
  if (isError) return <p>Error: {error.message}</p>;
  if (!data || data.length === 0) return <p>NOT FOUND COUNTRIES</p>;

  return <section className={styles.container}>{}</section>;
};
