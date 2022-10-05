const NotFoundError = require('../middlewares/errors/NotFoundError');
const BadRequestError = require('../middlewares/errors/BadRequestError');
const InternalServerError = require('../middlewares/errors/InternalServerError');
const ConflictingRequestError = require('../middlewares/errors/ConflictingRequestError');

const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: 'Произошла ошибка' });
  next();
};

module.exports = errorHandler;
