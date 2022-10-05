const express = require('express');

const userRoutes = express.Router();

const {
  getUsers, getUserInfo, getUserById, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

userRoutes.get('/', getUsers);
userRoutes.get('/me', getUserInfo);
userRoutes.get('/:id', getUserById);
userRoutes.patch('/me', updateUserProfile);
userRoutes.patch('/me/avatar', updateUserAvatar);

module.exports = {
  userRoutes,
};
