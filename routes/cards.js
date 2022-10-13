const express = require('express');

const cardRoutes = express.Router();

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const { validateCardId, validateCardBody } = require('../validators');

cardRoutes.get('/', getCards);
cardRoutes.post('/', validateCardBody, createCard);
cardRoutes.delete('/:cardId', validateCardId, deleteCard);
cardRoutes.put('/:cardId/likes', validateCardId, likeCard);
cardRoutes.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = {
  cardRoutes,
};
