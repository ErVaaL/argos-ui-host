import React from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App";
import "./index.css";
import { AuthProvider } from "./auth/AuthContext";
import { loadRuntimeConfig } from "./runtimeConfig";

async function main() {
  const cfg = await loadRuntimeConfig();
  window.__ARGOS_CONFIG__ = cfg;

  const el = document.getElementById("root");
  if (!el) return;

  createRoot(el).render(
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>,
  );
}

main();
