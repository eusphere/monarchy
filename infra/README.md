# Monarchy infrastructure

Initial low-cost deployment: one public `t3.micro` EC2 instance, Docker
Compose, local Redis, and the existing Aurora PostgreSQL database.

The module also defines three private subnets and an RDS subnet group across
three Availability Zones. The existing Aurora cluster should be migrated to
the resulting `monarchy-private` subnet group in a separate controlled change;
the cluster is intentionally not recreated by this initial module.

The security group permits only TCP 80 and 443 inbound. Deployment access is
through AWS Systems Manager; no SSH ingress is opened.

The web client is hosted separately at `web.monarchy1.com` on a private S3
bucket behind its own CloudFront distribution. A CloudFront Function maps
extensionless client routes to `index.html`; missing assets still return an
error. The master workflow builds `clients/web`, uploads the static files, and
invalidates the distribution after tests pass. The existing root-domain
distribution remains owned by `eusphere/eusphere/infra`.

The API Compose service sets `ENV=prod`, `CLIENT_WEB_URL`, and
`DISCORD_REDIRECT_URL` explicitly. Local development keeps localhost defaults.
The production Discord application must register
`https://api.monarchy1.com/oauth2/discord/exchange` as an OAuth redirect URI.

## Deployment lifecycle

New instances run `bootstrap.sh` through Terraform user data to install Docker,
Compose, SOPS, and the AWS CLI. First boot does not start the application without
its configuration. Changes to user data do not rerun setup on existing instances.
For an existing instance missing these prerequisites, run the same script once
from the repository root:

```bash
PAYLOAD="$(base64 < infra/bootstrap.sh | tr -d '\n')"
AWS_DEFAULT_REGION=us-east-1 ./infra/ec2-run.sh \
  "printf %s '$PAYLOAD' | base64 -d > /tmp/monarchy-bootstrap.sh" \
  "bash /tmp/monarchy-bootstrap.sh"
```

On pushes to master, tests gate the reusable `publish.yml` workflow with three
parallel jobs: Schema, Secrets, and Docker. Restart waits for all three to
succeed, synchronizes the runtime
Compose/Caddy/update files, and then pulls the image and restarts the stack.
Schema installs its own migration runner; no separate Prepare job is needed.
Schema uses `dorny/paths-filter` to run migrations only when `database/**`
changes. Otherwise its AWS and migration steps are skipped and the job succeeds,
so it does not block Restart. This compares source changes, not database state;
initializing a new database or retrying a failed migration requires an explicit
migration run (or rerunning the original failed workflow).

After the instance is managed by SSM, deploy the current image with:

```bash
aws ssm send-command \
  --region us-east-1 \
  --document-name AWS-RunShellScript \
  --targets Key=instanceIds,Values="$(terraform output -raw instance_id)" \
  --parameters commands='["/usr/local/bin/monarchy-update"]'
```

The API container expects runtime configuration in `/etc/monarchy/app.env`.
The EC2 instance can decrypt `/opt/monarchy/secrets/production.env.sops` with
the dedicated KMS key and writes the plaintext file with mode `0600` before
starting the Compose stack. Commit only the SOPS-encrypted file; never commit
the decrypted `.env` file or pass plaintext values to Terraform.

The encrypted file is intentionally not included yet because the application
credentials will be added in a follow-up. The KMS key ARN is available as the
`secrets_kms_key_arn` Terraform output. Use SOPS with the `alias/monarchy-secrets`
KMS key to create the file, then place it at
`/opt/monarchy/secrets/production.env.sops` through the deployment process.

## DNS

`api.monarchy1.com` currently has a legacy CNAME to Render. This module
allocates an Elastic IP, replaces that record with an A record, and uses Caddy
to terminate HTTPS and proxy HTTP/WebSocket traffic to the API container.
Apply this change only when the instance is ready to receive production DNS.
