#!/usr/bin/env bash
set -euo pipefail

# Compose dotenv files are data, not shell scripts. Let Docker parse them.
umask 077
migration_env=$(mktemp)
migration_log=$(mktemp)
trap 'rm -f "$migration_env" "$migration_log"' EXIT
sops --decrypt --input-type dotenv --output-type dotenv \
  /opt/monarchy/secrets/production.env.sops > "$migration_env"
if docker run --rm --network host \
  --env-file "$migration_env" \
  -v /opt/monarchy/migrations:/flyway/sql:ro \
  -v /opt/monarchy/flyway.conf:/flyway/conf/flyway.conf:ro \
  --entrypoint /bin/sh flyway/flyway:10.20-alpine -ec '
    export FLYWAY_URL="${FLYWAY_DATABASE_URL:-${JDBC_DATABASE_URL:?Database URL required}}"
    exec /flyway/flyway -configFiles=/flyway/conf/flyway.conf migrate
  ' > "$migration_log" 2>&1; then
  echo "Flyway migration completed successfully."
  grep -E '^Successfully applied|^Schema "[^"]+" is up to date' "$migration_log" || true
else
  # Flyway connection errors can echo JDBC URLs containing passwords.
  echo "Flyway migration failed; raw output withheld to protect credentials." >&2
  exit 1
fi
