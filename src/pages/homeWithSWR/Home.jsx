import style from "./Home.module.css";
import { CountriesList, Pagination } from "../../componentsWithSWR";
import { PaginationProvider } from "../../contextOnlyPagination/PaginationContext";

export const Home = () => {
  return (
    <PaginationProvider>
      <section className={style.container}>
        <Pagination />
        <CountriesList />
      </section>
    </PaginationProvider>
  );
};
