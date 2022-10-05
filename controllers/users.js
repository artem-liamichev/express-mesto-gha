const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../middlewares/errors/NotFoundError');
const BadRequestError = require('../middlewares/errors/BadRequestError');
const InternalServerError = require('../middlewares/errors/InternalServerError');
const ConflictingRequestError = require('../middlewares/errors/ConflictingRequestError');
const UnauthorizedRequestError = require('../middlewares/errors/UnauthorizedRequestError');

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hashedPassword) => User.create({
      email,
      password: hashedPassword,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.code === 11000) {
        throw new ConflictingRequestError('Неправильный пароль или e-mail');
      } else if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные');
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(() => { throw new NotFoundError('Пользователь не найден'); })
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((isUserValid) => {
          if (isUserValid) {
            const token = jwt.sign(
              {
                _id: user._id,
              },
              'SECRET',
              { expiresIn: '7d' },
            );
            res.send({ token });
          } else {
            throw new UnauthorizedRequestError('Проблема с аутентификацией или авторизацией');
          }
        });
    })
    .catch((err) => {
      next(err);
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      next(err);
    });
};

// const getUserInfo = (req, res, next) => {
//   console.log(req.user);
//   User.find({})
//     .then((user) => res.send(user))
//     .catch((err) => {
//       next(err);
//     });
// };

const getUserInfo = (req, res, next) => {
  // const { id } = req.user._id;
  // console.log('id:', id);
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const getUserById = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const updateUserProfile = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, {
    $set: { name: req.body.name, about: req.body.about },
  }, { runValidators: true, new: true })
    .then(() => {
      res.status(200).send({ name: req.body.name, about: req.body.about });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные');
      } else {
        next(err);
      }
    });
};

const updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, {
    $set: { avatar: req.body.avatar },
  }, { runValidators: true, new: true })
    .then(() => {
      res.send({ avatar: req.body.avatar });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные');
      } else {
        throw new InternalServerError('Произошла ошибка');
      }
    });
};

module.exports = {
  login,
  createUser,
  getUsers,
  getUserInfo,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
};
