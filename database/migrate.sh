#!/usr/bin/env bash
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
: "${JDBC_DATABASE_URL:?Set JDBC_DATABASE_URL before running migrations}"

docker run --rm \
  --network host \
  -e "FLYWAY_URL=${JDBC_DATABASE_URL}" \
  -v "$ROOT/database/migrations:/flyway/sql:ro" \
  -v "$ROOT/database/flyway.conf:/flyway/conf/flyway.conf:ro" \
  flyway/flyway:10.20-alpine \
  -configFiles=/flyway/conf/flyway.conf migrate
