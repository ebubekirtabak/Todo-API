import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Model } from 'objection';
const { knex } = require('./db/db');

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

Model.knex(knex);

app.get('/', async (req: Request, res: Response) => {
  console.log(req.url);
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
