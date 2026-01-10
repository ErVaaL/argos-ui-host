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
        remoteQuery: "remoteQuery@http://query.argos.localhost/remoteEntry.js",
        remoteReport:
          "remoteReport@http://report.argos.localhost/remoteEntry.js",
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
