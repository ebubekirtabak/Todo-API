const { signUpUser } = require('./signup');
const { loginUser } = require('./login');
const { refreshToken } = require('./refreshToken');
const { createTask, fetchTaskById } = require('./task');

module.exports = {
  signUpUser,
  loginUser,
  refreshToken,
  createTask,
  fetchTaskById
};
