#!/usr/bin/env bash
set -euo pipefail

if ! command -v sops >/dev/null 2>&1; then
  echo "sops is required but was not found on PATH." >&2
  echo "Install it with: brew install sops" >&2
  exit 1
fi

repo_root="$(git rev-parse --show-toplevel)"
secret_file="$repo_root/infra/secrets/production.env.sops"
tmp_file="$(mktemp)"

cleanup() { rm -f -- "$tmp_file"; }
trap cleanup EXIT INT TERM
chmod 600 "$tmp_file"

if [[ -f "$secret_file" ]]; then
  sops --decrypt --input-type dotenv --output-type dotenv "$secret_file" > "$tmp_file"
else
  printf '# Monarchy production environment\n' > "$tmp_file"
fi

"${EDITOR:-vi}" "$tmp_file"

if [[ ! -s "$tmp_file" ]]; then
  echo "Refusing to write an empty secret file." >&2
  exit 1
fi

mkdir -p "$(dirname "$secret_file")"
sops --encrypt --input-type dotenv --output-type dotenv \
  --filename-override "$secret_file" "$tmp_file" > "$secret_file"
chmod 600 "$secret_file"
echo "Updated encrypted secret file: $secret_file"
