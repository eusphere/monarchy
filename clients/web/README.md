# Monarchy Web Client

This will be the web client we use for distribution to the public. In contrast
to the `web-devel` client, this client is built with production in mind.


## Development

This repository uses `yarn` to manage dependencies and development workflows.
Currently, it does not share code with the `web-devel` client.

### Running the client

```bash
cd clients/web
yarn
yarn dev
```

This will start the development server on `http://localhost:5173`.

### Browser verification

Client changes that affect layout, interaction, animation, or the game board
must be checked in the running browser before they are considered complete.
Use the real local API when the behavior depends on game state. For a game
feature, exercise at least the relevant `SELECT`, action, and end/waiting
states, confirm both player-ownership cases, and inspect the result at desktop
and narrow widths. Capture a screenshot or other concrete observation when the
visual result is important. Report any state that could not be reached or
verified.

The minimum handoff should state:

- the route and states inspected;
- the viewport sizes checked;
- whether the browser result matched the intended behavior; and
- any checks that were unavailable because the API, dependencies, or browser
  could not be started.

For the complete local flow, run the server in one terminal and this client in
another:

```bash
# repository root
bazel run //server/src/web

# clients/web
yarn dev
```

The local server uses the `monarchy-staging` Discord application and redirects
back to `http://localhost:5173/profile` after login. The production API mode is
intended for API compatibility checks and does not use the local OAuth flow.

To run the local client against the production API instead, use:

```bash
yarn dev:production
```

This still serves the client locally at `http://localhost:5173`, but uses
`https://api.monarchy1.com` for API requests. You can override the API host
with `VITE_API_HOST` when needed.

### Running the server

```bash
cd ../.. # to the root of the project
bazel run //server/src/web
```

### Adding new client queries

As you build, you might incur new data dependencies. We use `relay` and
`relay-compiler` to generate the TypeScript bindings for our GraphQL queries.

To add a new query, first create a file `YourQuery.graphql.ts` in the project.
Ideally this is colocated with the component that uses this data. However, some
queries are shared–see `./src/network/queries`.

Once you have created your query, you can run the following command to generate
the TypeScript bindings:

```bash
yarn relay
```

This will create a new file `./src/autogen/YourQuery.graphql.ts`.

### Updating the GraphQL schema

Sometimes the current GraphQL schema does not have the data you need. You
can always update the schema on the server as needed. However, the new schema
must then be synced to the client for proper type checking and code generation.

With the server running locally, you can then run:

```bash
yarn relay:sync
```

This will update the `./src/autogen/schema.graphql` file with the latest schema.

## Troubleshooting

### Incorrect node version

This project requires node `v22.14.0`. If you are using `nvm`, you can install
the correct version with:

```bash
nvm install 22.14.0
nvm use 22.14.0
```
