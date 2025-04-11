import style from "./Pagination.module.css";
import { useCountriesContext } from "../../context/CountriesContext";

export const Pagination = () => {
  const { allCountries, pagination, handlePageChange, loading } =
    useCountriesContext();

  const { currentPage, countriesPerPage } = pagination;

  const allPages = Math.ceil(allCountries.length / countriesPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= allPages; i++) {
    pageNumbers.push(i);
  }

  if (loading || allCountries === 0) return null;

  return (
    <section className={style.container}>
      <ul className={style.list}>
        {pageNumbers.map((p) => (
          <li key={p} className={style.li}>
            <button
              type="button"
              className={`${style.btn} ${currentPage === p ? style.active : ""}`}
              onClick={() => handlePageChange(p)}
            >
              {p}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
