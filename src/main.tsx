// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { QueryProvider } from "./lib/react-query/QueryProvider";
import { BrowserRouter } from "react-router";
import AuthProvider from "./context/AuthContext";

const root = document.getElementById("root")

createRoot(root!).render(
  // <StrictMode>
  <BrowserRouter>
    <QueryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryProvider>
  </BrowserRouter>
  // </StrictMode>
);