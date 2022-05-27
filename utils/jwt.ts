const jwt = require("jsonwebtoken");

module.exports = {
  generateUserToken: (
    user: any,
    expiresIn: string = '30d',
    secretKey: string = process.env.JWT_SECRET_KEY as string
  ): string => {
    const { id, email } = user;
    const token = jwt.sign(
      { user_id: id, email },
      secretKey,
      {
        expiresIn,
      }
    );
    return token;
  },
  decodeUserToken: (
    token: string,
    secretKey: string  = process.env.JWT_SECRET_KEY as string
  ): any => {
    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded;
    } catch (err) {
      return null;
    }
  },
};
