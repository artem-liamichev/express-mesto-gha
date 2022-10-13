const express = require('express');

const userRoutes = express.Router();

const {
  getUsers, getUserInfo, getUserById, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

const { validateUserId, validateUpdateUserProfileBody, validateUpdateUserAvatarBody } = require('../validators');

userRoutes.get('/', getUsers);
userRoutes.get('/me', getUserInfo);
userRoutes.get('/:id', validateUserId, getUserById);
userRoutes.patch('/me', validateUpdateUserProfileBody, updateUserProfile);
userRoutes.patch('/me/avatar', validateUpdateUserAvatarBody, updateUserAvatar);

module.exports = {
  userRoutes,
};
