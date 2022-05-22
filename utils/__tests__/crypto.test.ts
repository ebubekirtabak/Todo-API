const { encodePassword } = require('../crypto');


test('encodePassword', () => {
  const encryptedPassword = encodePassword('testPassword');
  expect(encryptedPassword)
    .toBe('dbd268bda2bb562f1f0058f91de815dfcf79826e5f70d2b715e1b6434a8c82715cfae5d6cfb7c2f9fec3f217f9ec48dd25b08bbc7212fff0a90882b0def42ecc');
});
