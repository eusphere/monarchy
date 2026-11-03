---
name: add-update-secret
description: Add or update a Monarchy runtime secret using the repository's SOPS and AWS KMS workflow. Use when a privileged operator needs to create or rotate an application secret.
disable-model-invocation: true
---

# Add or update a secret

Use this workflow for values consumed by the production Docker Compose stack.
Never ask the operator to paste a secret into chat, a commit message, Terraform
variables, or an unencrypted file in the repository.

## Operator workflow

Run the helper from the repository root in a trusted terminal with AWS
credentials that can use the `alias/monarchy-secrets` KMS key:

```bash
./skills/add-update-secret/scripts/edit-secret.sh
```

The helper opens the encrypted dotenv file in the operator's local editor.
The operator enters the value there, saves, and exits. The helper decrypts only
into a mode-0600 temporary file, re-encrypts it with SOPS/KMS, and removes the
temporary plaintext file on exit. The encrypted file is:

```text
infra/secrets/production.env.sops
```

Review the diff to confirm that only encrypted values changed, then commit and
push the encrypted file. Do not display, cat, or paste its decrypted contents.

## Deployment

Copy the encrypted file to the instance using the approved deployment channel,
then run:

```bash
aws ssm send-command \
  --region us-east-1 \
  --document-name AWS-RunShellScript \
  --targets Key=instanceIds,Values="$(terraform -chdir=infra output -raw instance_id)" \
  --parameters commands='["/usr/local/bin/monarchy-update"]'
```

The instance role decrypts with KMS and writes `/etc/monarchy/app.env` with
mode `0600` before restarting Compose. The plaintext file must never be added
to Git or included in Terraform state.

## Safety checks

- Confirm the AWS account and region before editing.
- Ensure SOPS is installed and the operator is authenticated to AWS.
- Keep the editor and terminal private while the value is visible.
- Never put secret values in shell arguments, command history, logs, or chat.
- Rotate the value at the upstream provider before removing an exposed value.
