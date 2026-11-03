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
