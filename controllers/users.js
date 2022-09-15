const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `${Object.values(err.errors).map((e) => e.message).join(', ')}` });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

// const getUsers = (req, res) => {
//   try {
//     const users = User.find({});
//     res.status(200).send(users);
//   } catch (e) {
//     if (e.kind === 'ObjectId') {
//       return res.status(400).send({ message: 'Переданы некорректные данные' });
//     }
//     res.status(500).send({message: 'Ошибка по умолчанию' });
//   }
// };

// const getUserById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findById(id);
//     if (!user) {
//       return res
//         .status(404)
//         .send({ message: 'Пользователь не найден' });
//     }
//     res.status(200).send(user);
//   } catch (e) {
//     res.status(500).send({ message: 'Ошибка по умолчанию' });
//   }
// };

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
