import { useEffect } from "react";
import { useAuth } from "./AuthContext";

export function LoginRedirect() {
  const { login } = useAuth();

  useEffect(() => {
    login();
  }, [login]);

  return <div className="p-4 text-sm text-slate-700">Redirecting…</div>;
}
