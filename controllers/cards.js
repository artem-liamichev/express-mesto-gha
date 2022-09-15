const Card = require('../models/card');

const getCards = async (req, res) => {
  const cards = await Card.find({});
  res.status(200).send(cards);
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id });
  res.status(200).send({ message: 'created' });
};

const deleteCard = async (req, res) => {
  await Card.findByIdAndRemove(req.params.cardId);
  res.status(200).send({ message: 'deleted' });
};

const likeCard = async (req, res) => {
  await Card.findByIdAndUpdate(req.params.cardId, {
    $addToSet: { likes: req.user._id, new: true },
  });
  res.status(200).send({ message: 'liked' });
};

const dislikeCard = async (req, res) => {
  await Card.findByIdAndUpdate(req.params.cardId, {
    $pull: { likes: req.user._id, new: true },
  });
  res.status(200).send({ message: 'disliked' });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
