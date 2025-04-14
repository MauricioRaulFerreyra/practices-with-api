import style from "./Home.module.css";
import { PaginationProvider } from "../../contextOnlyPagination/PaginationContext";
import { CountriesList, Pagination } from "../../componentsWithApollo";

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
