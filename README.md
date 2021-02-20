# todomvc-orbit-server

A simple server for [TodoMVC](https://github.com/tastejs/todomvc) demo apps.

## Usage

``` bash
yarn install
yarn start
```

This starts a server running on `http://localhost:3000`.

The server use a simple in-memory `sqlite` database and exposes both
`JSON:API` and a `GraphQL` endpoints.

The `GraphQL` schema is available at `http://localhost:3000/graphql`.

The schema is maintained in `schema.json`.

View all available endpoints by running:

``` bash
yarn routes
```

## License

MIT License (see LICENSE for details).
