# Monarchy infrastructure

Initial low-cost deployment: one public `t3.micro` EC2 instance, Docker
Compose, local Redis, and the existing Aurora PostgreSQL database.

The module also defines three private subnets and an RDS subnet group across
three Availability Zones. The existing Aurora cluster should be migrated to
the resulting `monarchy-private` subnet group in a separate controlled change;
the cluster is intentionally not recreated by this initial module.

The security group permits only TCP 80 and 443 inbound. Deployment access is
through AWS Systems Manager; no SSH ingress is opened.

After the instance is managed by SSM, deploy the current image with:

```bash
aws ssm send-command \
  --region us-east-1 \
  --document-name AWS-RunShellScript \
  --targets Key=instanceIds,Values="$(terraform output -raw instance_id)" \
  --parameters commands='["/usr/local/bin/monarchy-update"]'
```

The API container expects runtime configuration in `/etc/monarchy/app.env`.
That file is intentionally left empty by this initial module; a follow-up will
populate it from Secrets Manager. No application credentials are Terraform
inputs or user-data values.

## DNS

`api.monarchy1.com` currently has a legacy CNAME to Render. This module
allocates an Elastic IP, replaces that record with an A record, and uses Caddy
to terminate HTTPS and proxy HTTP/WebSocket traffic to the API container.
Apply this change only when the instance is ready to receive production DNS.
