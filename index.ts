import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Model } from 'objection';
import { checkSchema } from 'express-validator';
const { knex } = require('./db/db');
const { signUpUser } = require('./routes/signup');
const { loginUser } = require('./routes/login');

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

Model.knex(knex);
app.use(express.json());
app.get('/', async (req: Request, res: Response) => {
  console.log(req.url);
  res.send('Express + TypeScript Server');
});

app.put(
  '/signup',
  checkSchema({
    password: {
      isString: true,
      isLength: {
        errorMessage: 'Password should be at least 6 chars long',
        // Multiple options would be expressed as an array
        options: { min: 6 },
      },
    },
    name: {
      isString: true,
      isLength: { 
        errorMessage: 'Name can not be longer than 80 characters',
        options: { max: 80 },
      }
    },
    email: {
      isEmail: {
        bail: true,
      },
    },
  }),
  signUpUser
);
app.post(
  '/login',
  checkSchema({
    password: {
      isString: true,
      isLength: {
        errorMessage: 'Password should be at least 6 chars long',
        options: { min: 6 },
      },
    },
    email: {
      isEmail: {
        bail: true,
      },
    },
  }),
  loginUser
);

// var { graphqlHTTP } = require('express-graphql');
// var { buildSchema } = require('graphql');

// var schema = buildSchema(`
//   type Query {
//     email: String,
//     name: String,
//     password: String
//   }
// `);

// const loggingMiddleware = (req: Request, res: Response, next: any) => {
//   console.log('ip:', req.ip);
//   next();
// }

// var root = {
//   ip: function (args, request) {
//     return request.ip;
//   }
// };

// app.use(loggingMiddleware);
// app.use('/graphql-signup', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// }));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
