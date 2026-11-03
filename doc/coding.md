# Coding conventions

## Scala

Wrap nullable values returned by Java APIs in `Option` immediately. Use the
resulting `Option` rather than comparing directly with `null`.
Keep imports at the top of the file instead of using fully qualified class
names inside method bodies.

Keep security allowlists explicit and centralized. Add environment-backed
configuration only when deployment-specific values are actually required.

## Terraform

Balance the infrastructure tree by responsibility. Keep the root module
shallow, and split resource groups into focused files such as `network.tf`,
`secrets.tf`, and `oidc.tf` when a file starts mixing unrelated concerns. File
organization is structural only: preserve Terraform resource addresses when
moving blocks so state does not churn.
