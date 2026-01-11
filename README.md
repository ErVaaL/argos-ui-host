# Argos UI Host

Host shell for Argos microfrontends. Built with Rsbuild and Module Federation,
serving the remote query and report UIs.


## Overview

The host app wires authentication and routes, then loads the
Remote Query and Remote Report microfrontends via Module Federation.

## Authentication

Authentication is handled via OIDC (Keycloak-compatible) using
`oidc-client-ts`. Configuration is loaded at runtime from
`public/config.json` (mounted as `/config.json` in Docker).

Expected config keys:
- `authority` (issuer URL)
- `client_id`
- `redirect_uri`
- `silent_redirect_uri`
- `post_logout_redirect_uri`
- `scope`

Protected routes require a valid session; unauthenticated users are
redirected to the identity provider.

## Requirements

- Node.js 22+
- npm or Yarn

## Install

### npm

```bash
npm install
```

### Yarn

```bash
yarn install --frozen-lockfile
```

## Development

### npm

```bash
npm run dev
```

### Yarn

```bash
yarn dev
```

Default dev server: http://127.0.0.1:5173

## Build

### npm

```bash
npm run build
```

### Yarn

```bash
yarn build
```

## Preview

### npm

```bash
npm run preview
```

### Yarn

```bash
yarn preview
```

## Remotes

Module Federation remotes are configured in `rsbuild.config.ts` and default to
`http://query.argos.localhost/remoteEntry.js` and
`http://report.argos.localhost/remoteEntry.js`.

Override with environment variables:
- `REMOTE_QUERY_URL`
- `REMOTE_REPORT_URL`
- `ASSET_PREFIX`

## Docker

```bash
docker build -t argos-ui-host .
```
