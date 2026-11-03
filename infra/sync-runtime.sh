#!/usr/bin/env bash
set -euo pipefail
umask 077
install -d -m 700 /etc/monarchy /opt/monarchy/secrets
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
