#!/usr/bin/env bash
set -euo pipefail

if [[ $# -eq 0 ]]; then
  echo "usage: $0 COMMAND [COMMAND ...]" >&2
  exit 2
fi

instance_id="$(aws ec2 describe-instances \
  --filters Name=tag:Name,Values=monarchy-api Name=instance-state-name,Values=running \
  --query 'Reservations[0].Instances[0].InstanceId' --output text)"

if [[ "$instance_id" == "None" || -z "$instance_id" ]]; then
  echo "No running monarchy-api instance found." >&2
  exit 1
fi

commands_json="$(jq -cn --args '$ARGS.positional | {commands: (["set -eu"] + .)}' -- "$@")"
command_id="$(aws ssm send-command \
  --instance-ids "$instance_id" \
  --document-name AWS-RunShellScript \
  --parameters "$commands_json" \
  --comment "Monarchy deployment from ${GITHUB_SHA:-local}" \
  --query 'Command.CommandId' --output text)"

aws ssm wait command-executed --command-id "$command_id" --instance-id "$instance_id" || true
status="$(aws ssm get-command-invocation --command-id "$command_id" \
  --instance-id "$instance_id" --query 'Status' --output text)"

if [[ "$status" != "Success" ]]; then
  aws ssm get-command-invocation --command-id "$command_id" --instance-id "$instance_id" \
    --query '{Status:Status,Output:StandardOutputContent,Error:StandardErrorContent}' \
    --output json >&2
  exit 1
fi
