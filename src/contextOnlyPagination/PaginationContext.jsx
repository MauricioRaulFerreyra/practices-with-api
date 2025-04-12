// PaginationContext.jsx
import { createContext, useContext, useState } from "react";

const PaginationContext = createContext();

export function PaginationProvider({ children }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        handlePageChange,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
}

export function usePagination() {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error(
      "usePagination debe usarse dentro de un PaginationProvider",
    );
  }
  return context;
}
