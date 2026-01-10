// @ts-nocheck
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import * as mf from "@module-federation/rsbuild-plugin";

const moduleFederation =
  (mf as any).moduleFederationPlugin ??
  (mf as any).pluginModuleFederation ??
  (mf as any).default;

const BASE = process.env.ASSET_PREFIX ?? "auto";

const REMOTE_QUERY =
  process.env.REMOTE_QUERY_URL ?? "http://127.0.0.1:5174/remoteEntry.js";

const REMOTE_REPORT =
  process.env.REMOTE_REPORT_URL ?? "http://127.0.0.1:5175/remoteEntry.js";

export default defineConfig({
  output: {
    assetPrefix: BASE,
  },
  plugins: [
    pluginReact(),
    moduleFederation({
      name: "host",
      remotes: {
        remoteQuery: `promise new Promise((resolve, reject) => {
         const cfg = window.__ARGOS_CONFIG__;
         const url = cfg?.remoteQueryUrl;
         if (!url) return reject(new Error("remoteQueryUrl missing in config.json"));

         const s = document.createElement("script");
         s.src = url;
         s.type = "text/javascript";
         s.async = true;
         s.crossOrigin = "anonymous";
         s.onload = () => resolve("remoteQuery@" + url);
         s.onerror = () => reject(new Error("Failed to load " + url));
         document.head.appendChild(s);
       })`,
        remoteReport: `promise new Promise((resolve, reject) => {
         const cfg = window.__ARGOS_CONFIG__;
         const url = cfg?.remoteReportUrl;
         if (!url) return reject(new Error("remoteReportUrl missing in config.json"));

         const s = document.createElement("script");
         s.src = url;
         s.type = "text/javascript";
         s.async = true;
         s.crossOrigin = "anonymous";
         s.onload = () => resolve("remoteReport@" + url);
         s.onerror = () => reject(new Error("Failed to load " + url));
         document.head.appendChild(s);
       })`,
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        "react-dom": { singleton: true, requiredVersion: false },
      },
    }),
  ],
  source: {
    entry: {
      index: "./src/index.ts",
    },
  },
  html: {
    template: "./index.html",
  },
  server: {
    host: "127.0.0.1",
    port: 5173,
    historyApiFallback: true,
    proxy: {
      "/api/v1": {
        target: "http://localhost:80",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
