# Database migrations

Schema changes are immutable, ordered Flyway migrations in `migrations/`.
Existing environments are baselined at version 1; new databases apply
`V1__baseline.sql` and then all later migrations.

Run local migrations with:

```bash
JDBC_DATABASE_URL='jdbc:postgresql://...' ./database/migrate.sh
```

Use a migration-capable database user for `FLYWAY_DATABASE_URL` in production.
The application URL is used as a temporary fallback until that dedicated
credential is provisioned. Never edit a migration after it has been applied;
add a new migration instead.

On EC2, `ec2-migrate.sh` reads the same SOPS-encrypted production file as the
application. The Schema job uploads the encrypted file from its own checkout,
then runs Flyway on every master deployment in parallel with image and secret
publication. Flyway applies only pending migrations.
