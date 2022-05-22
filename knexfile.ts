import type { Knex } from "knex";
require('dotenv').config()

const { PGDATABASE, PGUSER, PGPASSWORD, PGHOST, PGPORT = 5342 } = process.env;

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      database: PGDATABASE,
      user: PGUSER,
      password: PGPASSWORD,
      host: PGHOST,
      port: PGPORT as number,
    },
    migrations: {
        directory: __dirname + '/db/migrations',
    },
    pool: {
      min: 2,
      max: 10
    }
  },
  staging: {
    client: "postgresql",
    connection: {
      database: PGDATABASE,
      user: PGUSER,
      password: PGPASSWORD,
      host: PGHOST,
      port: PGPORT as number,
    },
    migrations: {
        directory: __dirname + '/db/migrations',
    },
    pool: {
      min: 2,
      max: 10
    }
  },
  production: {
    client: "postgresql",
    connection: {
      database: PGDATABASE,
      user: PGUSER,
      password: PGPASSWORD,
      host: PGHOST,
      port: PGPORT as number,
    },
    migrations: {
        directory: __dirname + '/db/migrations',
    },
    pool: {
      min: 2,
      max: 10
    }
  }
};

module.exports = config;
