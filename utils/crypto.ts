import { createHmac } from "crypto";

module.exports = {
  encodePassword: (password: string) => {
    const hash = createHmac('sha512', process.env.PASSWORD_SECRET_KET as string)
      .update(password)
      .digest('hex');
    return hash;
  },
};
