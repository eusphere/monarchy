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

JWTs use RS256. When `ENV` contains `prod`, deployments must supply private
and public RSA keys as base64-encoded DER through
`AUTH_PRIVKEY` and `AUTH_PUBKEY`; the application
crashes if either is missing. All other environments, including an unset
`ENV` during local development, generate one in-memory 2048-bit key pair on
first use, so local tokens are intentionally invalidated on restart. Generate
deployment keys and encrypt them with SOPS, for example:

```sh
tmpdir=$(mktemp -d)
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 \
  -out "$tmpdir/private.pem"
openssl pkey -in "$tmpdir/private.pem" -pubout -out "$tmpdir/public.pem"
printf 'AUTH_PRIVKEY=%s\nAUTH_PUBKEY=%s\n' \
  "$(openssl pkcs8 -topk8 -nocrypt -in "$tmpdir/private.pem" -outform DER | base64 | tr -d '\n')" \
  "$(openssl pkey -pubin -in "$tmpdir/public.pem" -pubout -outform DER | base64 | tr -d '\n')" \
  > "$tmpdir/jwt.env"
sops --encrypt --input-type dotenv --output-type dotenv \
  "$tmpdir/jwt.env" > infra/secrets/jwt.env.sops
```

Every JWT includes an issuer, audience, issued-at timestamp, and expiration.
The lifetime is one year and the cookie lifetime is kept in sync with that
constant.
