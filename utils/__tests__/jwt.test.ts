const { generateUserToken, decodeUserToken } = require('../jwt');


test('generate and decode Token', () => {
  const token = generateUserToken({ id: 12, email: 'ebubekir.dr7@gmail.com' }, '30d');
  const decodedToken = decodeUserToken(token);
  expect(decodedToken.user_id).toBe(12);
  expect(decodedToken.email).toBe('ebubekir.dr7@gmail.com');
});

test('expired token', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMiwiZW1haWwiOiJlYnViZWtpci5kcjdAZ21haWwuY29tIiwiaWF0IjoxNjUzMjM0OTU2LCJleHAiOjE2NTMyMzUwMTZ9.wmWyUQBv6tyGepCMEn7F1_384uLTNvYsVBF1Ax6OIG4';
  const decodedToken = decodeUserToken(token);
  expect(decodedToken).toBeNull();
});
