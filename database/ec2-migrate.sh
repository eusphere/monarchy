#!/usr/bin/env bash
set -euo pipefail

# Compose dotenv files are data, not shell scripts. Let Docker parse them.
umask 077
migration_env=$(mktemp)
trap 'rm -f "$migration_env"' EXIT
sops --decrypt --input-type dotenv --output-type dotenv \
  /opt/monarchy/migration.env.sops > "$migration_env"
docker run --rm --network host \
  --env-file "$migration_env" \
  -v /opt/monarchy/migrations:/flyway/sql:ro \
  -v /opt/monarchy/flyway.conf:/flyway/conf/flyway.conf:ro \
  --entrypoint /bin/sh flyway/flyway:10.20-alpine -ec '
    export FLYWAY_URL="${FLYWAY_DATABASE_URL:-${JDBC_DATABASE_URL:?Database URL required}}"
    exec /flyway/flyway -configFiles=/flyway/conf/flyway.conf migrate
  '
