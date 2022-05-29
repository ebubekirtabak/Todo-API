import { Request, Response, NextFunction } from 'express';
const { decodeUserToken } = require('../utils/jwt');

module.exports = {
  verifyToken: (request: Request, response: Response, next: NextFunction) => {
    const { headers, body } = request;
    let token = headers['x-access-token'] || headers.authorization || body.token;
    if (!token) {
      return response.status(401).json({ message: 'No token provided', statusCode: 401 });
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length)
      if (!token || token === '') return response.status(401).json({ message: 'No token provided', statusCode: 401 });
    }

    const tokenContext = decodeUserToken(token);
    if (!tokenContext) response.status(403).json({ message: 'invalid signature', statusCode: 403 })
    if (tokenContext) response.locals.tokenContext = tokenContext;
    response.locals.token = token;
    return next();
  }
};
