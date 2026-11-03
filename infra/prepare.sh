#!/usr/bin/env bash
set -euo pipefail
umask 077
install -d -m 700 /etc/monarchy /opt/monarchy/secrets
install -d /usr/local/lib/docker/cli-plugins
download() {
  curl --fail --silent --show-error --location "$1" --output "$2.tmp"
  chmod 755 "$2.tmp"
  mv "$2.tmp" "$2"
}
if ! docker compose version >/dev/null 2>&1; then
  download https://github.com/docker/compose/releases/download/v2.32.4/docker-compose-linux-x86_64 /usr/local/lib/docker/cli-plugins/docker-compose
fi
if ! command -v sops >/dev/null; then
  download https://github.com/getsops/sops/releases/download/v3.9.4/sops-v3.9.4.linux.amd64 /usr/local/bin/sops
fi
systemctl enable --now docker
# Install the same Compose/Caddy/update definitions used by new EC2 instances.
python3 - <<'PY'
from pathlib import Path
source = Path('/opt/monarchy/user-data.sh.tftpl').read_text()
for path, marker in [('/opt/monarchy/docker-compose.yml', 'COMPOSE'),
                     ('/opt/monarchy/Caddyfile', 'CADDY'),
                     ('/usr/local/bin/monarchy-update', 'UPDATE')]:
    body = source.split("<<'" + marker + "'\n", 1)[1].split('\n' + marker, 1)[0]
    body = body.replace('${aws_region}', 'us-east-1').replace('${image}', '930597685973.dkr.ecr.us-east-1.amazonaws.com/monarchy-api:latest')
    Path(path).write_text(body + '\n')
    Path(path).chmod(0o700 if marker == 'UPDATE' else 0o600)
PY
