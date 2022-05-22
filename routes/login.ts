import { Request, Response } from 'express';
const { knex } = require('../db/db');
const { encodePassword } = require('../utils/crypto');
const { generateUserToken } = require('../utils/jwt');
import { validationResult } from 'express-validator';

module.exports = {
  loginUser: async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { body } = request;
    const { email, password } = body;
    try {
      const userResponse = 
        await knex('users').where({ email, password: encodePassword(password) });
      if (userResponse.length > 0) {
        const currentUser = userResponse[0];
        delete currentUser.password;
        currentUser.token = generateUserToken(currentUser);
        response.status(200).json({ status: 'success', message: 'ok.', user: currentUser });
      } else {
        response.status(200).send({ status: 'error', message: 'email or password is wrong.' });
      }
    } catch (error: any) {
      console.log(error);
      response.status(400).send({ status: 'error', message: error.detail });
    }
  },
};
