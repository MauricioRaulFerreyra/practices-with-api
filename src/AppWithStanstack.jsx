import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import styles from "./App.module.css";
// import { Home } from "./pages/homeWithTanstack/Home";
import { Route, Routes } from "react-router-dom";
import { NoMatch } from "./componentsWithStanstack/404/NoMatch";
import { Home } from "./pages/homeWithPaginationContext/Home";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // No recargar datos al enfocar la ventana
      retry: 1, // Reintentar una vez en caso de error
    },
  },
});

const AppWithStanstack = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <section className={styles.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </section>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default AppWithStanstack;
