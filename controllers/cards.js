const Card = require('../models/card');

// const getCards = async (req, res) => {
//   const cards = await Card.find({});
//   res.status(200).send(cards);
// };

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => {
      res.status(500).send({ message: 'Ошибка по умолчанию' })
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `${Object.values(err.errors).map((e) => e.message).join(', ')}` });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

// const createCard = (req, res) => {
//   const { name, link } = req.body;
//   Card.create({ name, link, owner: req.user._id });
//   res.status(200).send({ message: 'created' });
// };

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
      } else {
        res.status(200).send({ message: 'deleted' });
      }
    })
    .catch(() => { res.status(500).send({ message: 'Ошибка по умолчанию' }); });
};

// const deleteCard = async (req, res) => {
//   await Card.findByIdAndRemove(req.params.cardId);
//   res.status(200).send({ message: 'deleted' });
// };

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $addToSet: { likes: req.user._id, new: true },
  })
    .populate('likes')
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Передан несуществующий _id карточки.' });
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию' });
      }
    });
};


// const likeCard = async (req, res) => {
//   await Card.findByIdAndUpdate(req.params.cardId, {
//     $addToSet: { likes: req.user._id, new: true },
//   });
//   res.status(200).send({ message: 'liked' });
// };
const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, {
    $pull: { likes: req.user._id, new: true },
  })
    .populate('likes')
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Передан несуществующий _id карточки.' });
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

// const dislikeCard = async (req, res) => {
//   await Card.findByIdAndUpdate(req.params.cardId, {
//     $pull: { likes: req.user._id, new: true },
//   });
//   res.status(200).send({ message: 'disliked' });
// };

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
