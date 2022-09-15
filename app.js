const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

const { userRoutes } = require('./routes/users');
const { cardRoutes } = require('./routes/cards');

// подключаемся к серверу mongo
// mongoose.connect('mongodb://localhost:27017/mydb2', {
//   useNewUrlParser: true,
// });

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use((req, res, next) => {
  req.user = {
    _id: '632146647593a77da30778a3',
  };

  next();
});

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.all('/', (req, res, next) => {
  res.status(404).send({ message: 'Неправильный путь' });
  next();
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');

  await app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`);
  });
}

main();
