const express = require('express');

const userRoutes = express.Router();

const {
  getUsers, getUserInfo, getUserById, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

const { validateUserId } = require('../validators');

userRoutes.get('/', getUsers);
userRoutes.get('/me', getUserInfo);
userRoutes.get('/:id', validateUserId, getUserById);
userRoutes.patch('/me', updateUserProfile);
userRoutes.patch('/me/avatar', updateUserAvatar);

module.exports = {
  userRoutes,
};
