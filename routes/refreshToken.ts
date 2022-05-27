import { Request, Response } from 'express';
const { generateUserToken, decodeUserToken } = require('../utils/jwt');
import { validationResult } from 'express-validator';

module.exports = {
  refreshToken: async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    try {
      const { body } = request;
      const { refreshToken } = body;
      const refreshTokenContext = decodeUserToken(refreshToken, process.env.JWT_REFRESH_SECRET_KEY);
      const content = {
        token: generateUserToken(refreshTokenContext, '30d', process.env.JWT_SECRET_KEY),
        refreshToken: generateUserToken(refreshTokenContext, '60d', process.env.JWT_REFRESH_SECRET_KEY)
      };
      response.status(200).json({ status: 'success', message: 'ok.', user: content });
    } catch(error: any) {
      console.log(error);
      response.status(400).json({ status: 'failed', message: 'refreshToken is wrong' });
    }

  },
};

