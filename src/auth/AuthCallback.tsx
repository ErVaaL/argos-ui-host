import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userManager } from "./auth";

export function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    userManager
      .signinRedirectCallback()
      .then(() => {
        navigate("/query", { replace: true });
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
      });
  }, [navigate]);

  if (error) {
    return (
      <div className="p-4 text-sm text-red-700">
        Sign-in failed: {error}
      </div>
    );
  }

  return (
    <div className="p-4 text-sm text-slate-700">Completing sign-in…</div>
  );
}
