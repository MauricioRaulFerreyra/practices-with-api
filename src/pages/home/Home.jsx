import style from "./Home.module.css";
import { CountriesList, Pagination } from "../../components";

export const Home = () => {
  return (
    <section className={style.container}>
      <Pagination />
      <CountriesList />
    </section>
  );
};
