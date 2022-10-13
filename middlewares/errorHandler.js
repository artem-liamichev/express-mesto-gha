const { isCelebrateError } = require('celebrate');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message = 'Неизвестная ошибка сервера' } = err;
  if (isCelebrateError(err)) {
    res.status(statusCode).json(err);
  } else {
    res.status(statusCode).json({ message: statusCode === 500 ? 'Неизвестная ошибка сервера' : message });
  }
  next();
};

module.exports = errorHandler;
