import { Knex } from "knex";

export const knex = require('knex')({
  client: 'postgres',
  connection: async () => {
    return {
      host : process.env.PGHOST,
      port : process.env.PGPORT,
      user : process.env.PGUSER,
      password : process.env.PGPASSWORD,
      database : process.env.PGDATABASE,
    };
  }
}) as Knex;
