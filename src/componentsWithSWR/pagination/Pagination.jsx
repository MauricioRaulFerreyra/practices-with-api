import style from "./Pagination.module.css";
import { useCountries } from "../../contextWithSWR/countries-hook";

export const Pagination = () => {
  const {
    filteredCount,
    currentPage,
    countriesPerPage,
    handlePageChange,
    isLoading,
  } = useCountries();

  const allPages = Math.ceil(filteredCount / countriesPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= allPages; i++) {
    pageNumbers.push(i);
  }

  if (isLoading || filteredCount === 0) return null;

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
