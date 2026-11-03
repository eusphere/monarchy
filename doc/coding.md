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

## Authentication

Monarchy's internal JWT is separate from Discord's OAuth access token. Discord
is used only during login: the server exchanges the authorization code,
fetches the Discord profile, and then issues a Monarchy JWT. API requests use
that internal JWT and never forward the Discord access token.

JWTs use RS256. The private and public RSA keys are supplied as base64-encoded
DER through `MONARCHY_JWT_PRIVATE_KEY` and `MONARCHY_JWT_PUBLIC_KEY`. Outside
`ENV=local`, both values are required so a deployment cannot silently start
with an ephemeral signing key. Local development generates an in-memory key
pair, so local tokens are intentionally invalidated on restart.

Every JWT includes an issuer, audience, issued-at timestamp, and expiration.
The lifetime defaults to 30 days and can be changed with
`MONARCHY_JWT_TTL_SECONDS`; the cookie lifetime is kept in sync with that
value.
