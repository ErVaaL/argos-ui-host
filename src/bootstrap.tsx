import React from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App";
import "./index.css";
import { AuthProvider } from "./auth/AuthContext";

const el = document.getElementById("root");
if (el)
  createRoot(el).render(
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>,
  );
