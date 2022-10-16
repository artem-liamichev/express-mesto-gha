const jwt = require('jsonwebtoken');
const UnauthorizedRequestError = require('../errors/UnauthorizedRequestError');
// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedRequestError('Необходима авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (err) {
    next(new UnauthorizedRequestError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
