// var { graphql, buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// // The rootValue provides a resolver function for each API endpoint
// var rootValue = {
//   hello: () => {
//     return 'Hello world!';
//   },
// };

// // Run the GraphQL query '{ hello }' and print out the response
// graphql({
//   schema,
//   source: '{ hello }',
//   rootValue
// }).then((response) => {
//   console.log(response);
// });



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

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
