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
