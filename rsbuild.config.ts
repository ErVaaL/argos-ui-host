// @ts-nocheck
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import * as mf from "@module-federation/rsbuild-plugin";

const moduleFederation =
  (mf as any).moduleFederationPlugin ??
  (mf as any).pluginModuleFederation ??
  (mf as any).default;

export default defineConfig({
  plugins: [
    pluginReact(),
    moduleFederation({
      name: "host",
      remotes: {
        remoteQuery: "remoteQuery@http://127.0.0.1:5174/remoteEntry.js",
        remoteReport: "remoteReport@http://127.0.0.1:5175/remoteEntry.js",
      },
    }),
  ],
  source: {
    entry: {
      index: "./src/main.tsx",
    },
  },
  html: {
    template: "./index.html",
  },
  server: { host: "127.0.0.1", port: 5173 },
});
