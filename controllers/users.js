const User = require('../models/user');
const { NOT_FOUND, BAD_REQUEST, INTERNAL_SEVER_ERROR } = require('../utils/errors');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: `${Object.values(err.errors).map((e) => e.message).join(', ')}` });
      } else {
        res.status(INTERNAL_SEVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(INTERNAL_SEVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Пользователь не найден' });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(INTERNAL_SEVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

const updateUserProfile = (req, res) => {
  User.findByIdAndUpdate(req.user._id, {
    $set: { name: req.body.name, about: req.body.about },
  }, { runValidators: true, new: true })
    .then(() => {
      res.status(200).send({ name: req.body.name, about: req.body.about });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(INTERNAL_SEVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

const updateUserAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, {
    $set: { avatar: req.body.avatar },
  }, { runValidators: true, new: true })
    .then(() => {
      res.status(200).send({ avatar: req.body.avatar });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(INTERNAL_SEVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
};
