export type RuntimeConfig = {
  apiBaseUrl: string;
  remoteQueryUrl: string;
  remoteReportUrl: string;
  assetPrefix?: string;
};

let cached: RuntimeConfig | null = null;

export async function loadRuntimeConfig(): Promise<RuntimeConfig> {
  if (cached) return cached;

  const res = await fetch(`/config.json?ts=${Date.now()}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to load runtime config: ${res.status}`);
  cached = (await res.json()) as RuntimeConfig;
  return cached;
}
