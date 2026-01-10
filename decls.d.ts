declare global {
  interface Window {
    __ARGOS_CONFIG__?: {
      apiBaseUrl: string;
      remoteQueryUrl: string;
      remoteReportUrl: string;
      assetPrefix?: string;
    };
  }
}
export {};

declare module "remoteQuery/App" {
  import type { ComponentType } from "react";
  const C: ComponentType<{ apiBase?: string; accessToken?: string | null }>;
  export default C;
}

declare module "remoteReport/App" {
  import type { ComponentType } from "react";
  const C: ComponentType<{ apiBase?: string; accessToken?: string | null }>;
  export default C;
}
