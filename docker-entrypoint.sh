#!/usr/bin/env sh
set -eu

TARGET="/usr/share/nginx/html/config.json"

# If a config is bind-mounted, don't touch it
if [ -f "$TARGET" ]; then
  echo "config.json already present (likely mounted) -> skipping generation"
  exec nginx -g 'daemon off;'
fi

# If filesystem is read-only, also skip
if ! touch "$TARGET" 2>/dev/null; then
  echo "Cannot write $TARGET (read-only) -> skipping generation"
  exec nginx -g 'daemon off;'
fi

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

