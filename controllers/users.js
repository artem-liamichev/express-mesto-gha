const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    User.create({ name, about, avatar });
    res.status(200).send(req.body);
  } catch (e) {
    if (e.kind === 'ObjectId') {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    }
    res.status(500).send({message: 'Ошибка по умолчанию' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (e) {
    if (e.kind === 'ObjectId') {
      return res.status(400).send({ message: 'Переданы некорректные данные' });
    }
    res.status(500).send({message: 'Ошибка по умолчанию' });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .send({ message: 'Пользователь не найден' });
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send({ message: 'Ошибка по умолчанию' });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      $set: { name: req.body.name, about: req.body.about },
    });
    if (!user) {
      return res
        .status(404)
        .send({ message: 'Пользователь не найден' });
    }
    res.status(200).send({ message: 'updated' });
  } catch (e) {
    res.status(500).send({ message: 'Ошибка по умолчанию' });
  }
};

const updateUserAvatar = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, { $set: { avatar: req.body.avatar } });
    if (!user) {
      return res
        .status(404)
        .send({ message: 'Пользователь не найден' });
    }
    res.status(200).send({ message: 'updated' });
  } catch (e) {
    res.status(500).send({ message: 'Ошибка по умолчанию' });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
};
