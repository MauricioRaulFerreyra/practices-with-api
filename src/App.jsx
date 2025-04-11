import { Route, Routes } from "react-router-dom";
import style from "./App.module.css";
import { NoMatch } from "./components/404/NoMatch";
import { Home } from "./pages/home/Home";
import { CountriesProvider } from "./context/CountriesContext";

function App() {
  return (
    <CountriesProvider>
      <section className={style.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </section>
    </CountriesProvider>
  );
}

export default App;
