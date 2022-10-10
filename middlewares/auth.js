const jwt = require('jsonwebtoken');
const UnauthorizedRequestError = require('./errors/UnauthorizedRequestError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedRequestError('Проблема с аутентификацией или авторизацией'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (err) {
    next(new UnauthorizedRequestError('Проблема с аутентификацией или авторизацией'));
  }

  req.user = payload;

  next();
};
