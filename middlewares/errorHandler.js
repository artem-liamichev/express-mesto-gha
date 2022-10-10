const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: 'Произошла ошибка' });
  next();
};

module.exports = errorHandler;
