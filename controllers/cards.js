const Card = require('../models/card');
const { NOT_FOUND, BAD_REQUEST, INTERNAL_SEVER_ERROR } = require('../utils/errors');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => {
      res.status(INTERNAL_SEVER_ERROR).send({ message: 'Произошла ошибка' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: `${Object.values(err.errors).map((e) => e.message).join(', ')}` });
      } else if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: `${Object.values(err.errors).map((e) => e.message).join(', ')}` });
      } else {
        res.status(INTERNAL_SEVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Карточка с указанным id не найдена.' });
      } else {
        res.status(200).send({ message: 'deleted' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Удаление лайка с некорректным id' });
      } else {
        res.status(INTERNAL_SEVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $addToSet: { likes: req.user._id, new: true },
  })
    .populate('likes')
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Передан несуществующий id карточки.' });
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Добавление лайка с некорректным id карточки' });
      } else {
        res.status(INTERNAL_SEVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $pull: { likes: req.user._id, new: true },
  })
    .populate('likes')
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Передан несуществующий id карточки' });
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Удаление лайка с некорректным id' });
      } else {
        res.status(INTERNAL_SEVER_ERROR).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
