import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Model } from 'objection';


dotenv.config();
const app: Express = express();
const port = process.env.PORT;
const knex = require('knex')({
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
});
Model.knex(knex);

app.get('/', (req: Request, res: Response) => {
  console.log(req.url);
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
