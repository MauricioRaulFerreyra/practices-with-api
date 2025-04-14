import style from "./CountryDetails.module.css";
import { useNavigate } from "react-router-dom";

export const CountryDetails = ({
  id,
  image,
  name,
  region,
  population,
  alt,
}) => {
  const navigate = useNavigate();

  function handleDetail(id) {
    navigate(`/details/${id}`);
  }

  return (
    <section className={style.card}>
      <h4 className={style.title}>{name}</h4>
      <aside className={style.container}>
        <img
          className={style.imagen}
          onKeyUp={() => handleDetail(id)}
          src={image}
          alt={alt}
        />
      </aside>
      <h6 className={style.subtitle}>region: {region}</h6>
      <div className={style.containersubtitle}>
        <h6 className={style.subtitle}>cant: {population}</h6>
      </div>
    </section>
  );
};
