const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { userRoutes } = require('./routes/users');
const { cardRoutes } = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { validateUserBody, validateAuthentication } = require('./validators');
// app.use((req, res, next) => {
//   req.user = {
//     _id: '632146647593a77da30778a3',
//   };
//   next();
// });

app.post('/signin', validateAuthentication, login);

app.post('/signup', validateUserBody, createUser);

app.use('/users', auth, userRoutes);

app.use('/cards', auth, cardRoutes);

app.all('*', (req, res, next) => {
  res.status(404).send({ message: 'Неправильный путь' });
  next();
});

app.use(errorHandler);
app.use(errors());
async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');

  await app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}
main();
