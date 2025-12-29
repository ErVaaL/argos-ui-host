import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RemoteErrorBoundary } from "./RemoteErrorBoundary";

const RemoteQueryApp = React.lazy(() => import("remoteQuery/App"));
const RemoteReportApp = React.lazy(() => import("remoteReport/App"));

export default function App() {
  const apiBase = "http://localhost:80/api";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={null} />
        <Route
          path="/query"
          element={
            <div className="p-4">
              <RemoteErrorBoundary label="Query">
                <Suspense fallback={<div>Loading Query…</div>}>
                  <RemoteQueryApp apiBase={apiBase} />
                </Suspense>
              </RemoteErrorBoundary>
            </div>
          }
        />
        <Route
          path="/report"
          element={
            <div className="p-4">
              <RemoteErrorBoundary label="Report">
                <Suspense fallback={<div>Loading Report…</div>}>
                  <RemoteReportApp apiBase={apiBase} />
                </Suspense>
              </RemoteErrorBoundary>
            </div>
          }
        />
        <Route
          path="*"
          element={null}
        />
      </Routes>
    </BrowserRouter>
  );
}
