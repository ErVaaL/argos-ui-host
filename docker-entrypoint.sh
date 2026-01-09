#!/bin/sh
set -eu

ROOT="/usr/share/nginx/html"
CFG="$ROOT/config.json"

: "${API_BASE_URL:=/api}"
: "${REMOTE_QUERY_URL:=http://localhost:8081/remoteEntry.js}"
: "${REMOTE_REPORT_URL:=http://localhost:8082/remoteEntry.js}"
: "${ASSET_PREFIX:=/}"

cat > "$CFG" <<EOF
{
  "apiBaseUrl": "${API_BASE_URL}",
  "remoteQueryUrl": "${REMOTE_QUERY_URL}",
  "remoteReportUrl": "${REMOTE_REPORT_URL}",
  "assetPrefix": "${ASSET_PREFIX}"
}
EOF

# start nginx
exec nginx -g 'daemon off;'

