import { useEffect, useState } from "react";
import { userManager } from "./auth";

export function SilentRenew() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    userManager
      .signinSilentCallback()
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
      });
  }, []);

  if (error) {
    return (
      <div className="p-4 text-sm text-red-700">
        Silent renew failed: {error}
      </div>
    );
  }

  return <div className="p-4 text-sm text-slate-700">Renewing…</div>;
}
