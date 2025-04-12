import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import App from "./App";
import AppWithStanstack from "./AppWithStanstack";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* <App /> */}
      <AppWithStanstack />
    </BrowserRouter>
  </StrictMode>,
);
