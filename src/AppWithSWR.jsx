import styles from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import { NoMatch } from "./componentsWithSWR/404/NoMatch";
import { Home } from "./pages/homeWithSWR/Home";
import { SWRConfig } from "swr";

const AppWithSWR = () => {
  return (
    <SWRConfig
      value={{
        // Configuración global de SWR
        revalidateOnFocus: true, // Revalidar cuando la ventana recupera el foco
        revalidateOnReconnect: true, // Revalidar cuando se restablece la conexión
        refreshInterval: 0, // No revalidar automáticamente por tiempo (0 = desactivado)
        shouldRetryOnError: true, // Reintentar en caso de error
        errorRetryCount: 3, // Número máximo de reintentos
        // Función global de manejo de errores (opcional)
        onError: (error, key) => {
          console.error(`Error en SWR para la clave "${key}":`, error);
        },
        // Fetcher global (opcional, también puedes definirlo en cada hook)
        // fetcher: (...args) => fetch(...args).then(res => res.json())
      }}
    >
      <section className={styles.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </section>
    </SWRConfig>
  );
};

export default AppWithSWR;
