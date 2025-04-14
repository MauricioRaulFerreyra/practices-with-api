import style from "./NoMatch.module.css";
import { useNavigate } from "react-router-dom";

export const NoMatch = () => {
  const navigate = useNavigate();

  const handleButtonPress = () => {
    navigate("/");
  };

  return (
    <section className={style.nomatch}>
      <h1 style={{ fontSize: "6rem" }}>404</h1>
      <h3>Page not found</h3>
      <button type="button" className={style.btn} onClick={handleButtonPress}>
        Back Button
      </button>
    </section>
  );
};
