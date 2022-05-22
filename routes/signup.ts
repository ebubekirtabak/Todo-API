import { Request, Response } from 'express';
const { knex } = require('../db/db');
const { encodePassword } = require('../utils/crypto');
import { validationResult } from 'express-validator';

module.exports = {
  signUpUser: async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { body } = request;
    const { email, password } = body;
    try {
      await knex('users')
      .insert({ email, password: encodePassword(password) });
      response.status(200).json({ status: 'success', message: 'user created.' });
    } catch (error: any) {
      response.status(400).send({ status: 'error', message: error.detail });
      console.log(
        error.detail
      );
    }
  },
};
