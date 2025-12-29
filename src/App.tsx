import React, { Suspense } from 'react';

const RemoteQueryApp = React.lazy(() => import('remoteQuery/App'));
const RemoteReportApp = React.lazy(() => import('remoteReport/App'));

export default function App() {
  return (
    <div style={{ padding: 16 }}>
      <h1>Host</h1>

      <Suspense fallback={<div>Loading Query…</div>}>
        <RemoteQueryApp />
      </Suspense>

      <hr style={{ margin: '16px 0' }} />

      <Suspense fallback={<div>Loading Report…</div>}>
        <RemoteReportApp />
      </Suspense>
    </div>
  );
}

