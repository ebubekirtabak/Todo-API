import { Request, Response } from 'express';
const { knex } = require('../db/db');
import { validationResult } from 'express-validator';

module.exports = {
  createTask: async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { body } = request; 
    const { title } = body;
    const { userId } = response.locals;
    try {
      const result = await knex('tasks')
        .insert({ text: title, userId })
        .returning('id');
      response.status(200).json({ statusCode: 200, created: result[0] });
    } catch(err) {
      response.status(200).json({ statusCode: 400 });
    }
  },
};
