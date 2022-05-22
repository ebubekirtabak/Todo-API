const jwt = require("jsonwebtoken");

module.exports = {
  generateUserToken: (user: any, expiresIn: string = '30d'): string => {
    const { id, email } = user;
    const token = jwt.sign(
      { user_id: id, email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn,
      }
    );
    return token;
  },
  decodeUserToken: (token: string): any => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      return decoded;
    } catch (err) {
      return null;
    }
  }
};
