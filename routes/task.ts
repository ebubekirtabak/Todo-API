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
  fetchTaskById: async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { params } = request; 
    const { id } = params;
    const { userId } = response.locals;
    try {
      knex('tasks')
        .where({ 
          ...(id && { id }),
          userId 
        })
        .then((rows: any[]) => {
          console.log(rows);
          response.status(200).json({ statusCode: 200, task: rows });
        })
    } catch(err) {
      console.log(err);
      response.status(200).json({ statusCode: 400 });
    }
  },
  updateTaskById: async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { body } = request; 
    const { title, id } = body;
    const { userId } = response.locals;
    try {
      const result = await knex('tasks')
      .where({ 
        ...(id && { id }),
        userId 
      })
      .update({ 
        text: title 
      }, ['id', 'text']);
      if (result && result.length > 0) {
        response.status(200).json({ statusCode: 200, id });
      } else {
        response.status(200).json({ statusCode: 400, message: 'Record could not be updated.' });
      }
    } catch (err: any ) {
      console.log(err);
      response.status(200).json({ statusCode: 400, message: err.message });
    }
  },
  deleteTaskById: async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { params } = request; 
    const { id } = params;
    const { userId } = response.locals;

    try { 
      const result = await knex('tasks')
      .del() 
      .where({ 
        ...(id && { id }),
        userId 
      });
      if (result) {
        response.status(200).json({ statusCode: 200, id });
      } else {
        response.status(200).json({ statusCode: 400, message: 'Record could not be deleted.' });
      }
    } catch (err) {
      console.log(err);
      response.status(200).json({ statusCode: 400 });
    }
  },
};
