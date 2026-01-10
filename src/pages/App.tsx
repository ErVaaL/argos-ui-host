import React, { Suspense } from "react";
import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import { RemoteErrorBoundary } from "../components/RemoteErrorBoundary";
import { AuthCallback } from "../auth/AuthCallback";
import { LoginRedirect } from "../auth/LoginRedirect";
import { LogoutCallback } from "../auth/LogoutCallback";
import { SilentRenew } from "../auth/SilentRenew";
import { useAuth } from "../auth/AuthContext";

const RemoteQueryApp = React.lazy(() =>
  import("remoteQuery/App").then((m: any) => ({
    default: m?.default?.default ?? m?.default ?? m?.App ?? m,
  })),
);

const RemoteReportApp = React.lazy(() =>
  import("remoteReport/App").then((m: any) => ({
    default: m?.default?.default ?? m?.default ?? m?.App ?? m,
  })),
);

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { accessToken, loading, login } = useAuth();

  if (loading) {
    return <div className="p-4 text-sm text-slate-700">Checking session…</div>;
  }

  if (!accessToken) {
    return (
      <div className="p-4 space-y-3">
        <p className="text-sm text-slate-700">You need to sign in first.</p>
        <button
          className="h-10 rounded-md bg-slate-900 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          onClick={login}
        >
          Sign in
        </button>
      </div>
    );
  }

  return <>{children}</>;
}

export default function App() {
  const apiBase = window.__ARGOS_CONFIG__?.apiBaseUrl ?? "http://localhost:80/api";
  const { accessToken, user, logout } = useAuth();

  return (
    <BrowserRouter>
      <header className="flex items-center justify-between border-b bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">Argos</span>
          <nav className="flex items-center gap-2 text-sm">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "rounded-lg bg-gray-600 px-3 py-1 text-slate-200"
                  : "text-slate-700 hover:text-slate-900"
              }
              to="/query"
            >
              Query
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "rounded-lg bg-gray-600 px-3 py-1 text-slate-200"
                  : "text-slate-700 hover:text-slate-900"
              }
              to="/report"
            >
              Report
            </NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-600">
          {user ? (
            <span>{user.profile?.preferred_username ?? "Signed in"}</span>
          ) : null}
          {user ? (
            <button
              className="rounded-md border border-slate-300 px-3 py-1.5 text-slate-700 hover:bg-slate-50"
              onClick={logout}
            >
              Sign out
            </button>
          ) : (
            <Link
              className="rounded-md bg-slate-900 px-3 py-1.5 text-white hover:bg-slate-800"
              to="/login"
            >
              Sign in
            </Link>
          )}
        </div>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <div className="p-4 text-sm text-slate-700">
              Choose a section to continue.
            </div>
          }
        />
        <Route path="/login" element={<LoginRedirect />} />
        <Route path="/callback" element={<AuthCallback />} />
        <Route path="/logout-callback" element={<LogoutCallback />} />
        <Route path="/silent-renew" element={<SilentRenew />} />
        <Route
          path="/query"
          element={
            <RequireAuth>
              <div className="p-4">
                <RemoteErrorBoundary label="Query">
                  <Suspense fallback={<div>Loading Query…</div>}>
                    <RemoteQueryApp
                      apiBase={apiBase}
                      accessToken={accessToken}
                    />
                  </Suspense>
                </RemoteErrorBoundary>
              </div>
            </RequireAuth>
          }
        />
        <Route
          path="/report"
          element={
            <RequireAuth>
              <div className="p-4">
                <RemoteErrorBoundary label="Report">
                  <Suspense fallback={<div>Loading Report…</div>}>
                    <RemoteReportApp
                      apiBase={apiBase}
                      accessToken={accessToken}
                    />
                  </Suspense>
                </RemoteErrorBoundary>
              </div>
            </RequireAuth>
          }
        />
        <Route path="*" element={null} />
      </Routes>
    </BrowserRouter>
  );
}
