# Monarchy Web Client

This will be the web client we use for distribution to the public. In contrast
to the `web-devel` client, this client is built with production in mind.


## Development

This repository uses `yarn` to manage dependencies and development workflows.
Currently, it does not share code with the `web-devel` client.

```bash
cd clients/web
yarn
yarn dev
```

This will start the development server on `http://localhost:5173`.

## Troubleshooting

### Incorrect node version

This project requires node `v22.14.0`. If you are using `nvm`, you can install
the correct version with:

```bash
nvm install 22.14.0
nvm use 22.14.0
```
