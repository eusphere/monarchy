#!/usr/bin/env bash
# Shared by first-boot user data and one-time repair of existing instances.
set -euo pipefail
umask 077
dnf install -y docker python3
if ! command -v aws >/dev/null 2>&1; then
  dnf install -y awscli2
fi
systemctl enable --now docker
install -d -m 700 /etc/monarchy /opt/monarchy/secrets
install -d /opt/monarchy/migrations /usr/local/lib/docker/cli-plugins
download() {
  curl --fail --silent --show-error --location "$1" --output "$2.tmp"
  chmod 755 "$2.tmp"
  mv "$2.tmp" "$2"
}
if ! docker compose version >/dev/null 2>&1; then
  download https://github.com/docker/compose/releases/download/v2.32.4/docker-compose-linux-x86_64 /usr/local/lib/docker/cli-plugins/docker-compose
fi
if ! command -v sops >/dev/null 2>&1; then
  download https://github.com/getsops/sops/releases/download/v3.9.4/sops-v3.9.4.linux.amd64 /usr/local/bin/sops
fi
docker compose version
sops --version
aws --version
