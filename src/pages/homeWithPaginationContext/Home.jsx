import style from "./Home.module.css";
import { PaginationProvider } from "../../contextOnlyPagination/PaginationContext";
import { CountriesList } from "../../componentsWithStanstack";
import { Pagination } from "../../componentsWithStanstack";

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
