import { Route, Routes } from "react-router-dom";
import style from "./App.module.css";
import { NoMatch } from "./components/404/NoMatch";
import { Home } from "./pages/homeWithApollo/Home";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com", // API GraphQL pública de países
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <section className={style.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </section>
    </ApolloProvider>
  );
}

export default App;
