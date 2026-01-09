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
  const C: (props: { apiBase?: string; accessToken?: string | null }) => any;
  export default C;
}

declare module "remoteReport/App" {
  const C: (props: { apiBase?: string; accessToken?: string | null }) => any;
  export default C;
}
