const express = require('express');

const userRoutes = express.Router();

const {
  createUser, getUsers, getUserById, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

userRoutes.post('/', createUser);
userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUserById);
userRoutes.patch('/me', updateUserProfile);
userRoutes.patch('/me/avatar', updateUserAvatar);

module.exports = {
  userRoutes,
};
