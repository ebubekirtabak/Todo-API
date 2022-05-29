import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

module.exports = {
  createTask: (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json({ statusCode: 200 });
  }
};
