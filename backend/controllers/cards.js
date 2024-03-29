const mongoose = require('mongoose');
const Card = require('../models/card');
const NotFound = require('../errors/notFound');
const BadRequest = require('../errors/BadRequest');
const NotOwner = require('../errors/notOwner');
const { OK_STATUS, OK_CREATED_STATUS } = require('../config/config');

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.status(OK_STATUS).send({ data: cards });
    })
    .catch(next);
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const newCard = new Card({ name, link, owner: req.user._id });
    const cardPopulate = await Card.populate(newCard, ['owner', 'likes']);
    await cardPopulate.save();
    res.status(OK_CREATED_STATUS).send({ data: cardPopulate });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      const message = Object.values(e.errors)
        .map((error) => error.message)
        .join('; ');
      next(new BadRequest(message));
    } else {
      next(e);
    }
  }
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const ownerId = req.user._id;
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFound('Карточка не найдена');
    })
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card.owner.equals(ownerId)) {
        throw new NotOwner('Невозможно удалить чужую карточку');
      } else {
        Card.deleteOne(card)
          .then(() => {
            res.status(OK_STATUS).send({ data: card });
          })
          .catch(next);
      }
    })
    .catch((e) => {
      if (e instanceof mongoose.Error.CastError) {
        next(new BadRequest('Переданы некорректные данные о карточке'));
      } else {
        next(e);
      }
    });
};

const updateCardLike = (req, res, next, newData) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    newData,
    { new: true },
  )
    .orFail(() => {
      throw new NotFound('Карточка не найдена');
    })
    .populate(['owner', 'likes'])
    .then((card) => {
      res.status(OK_STATUS).send({ data: card });
    })
    .catch((e) => {
      if (e instanceof mongoose.Error.CastError) {
        next(new BadRequest('Переданы некорректные данные о карточке'));
      } else {
        next(e);
      }
    });
};

const setLike = (req, res, next) => {
  const newLike = { $addToSet: { likes: req.user._id } };
  return updateCardLike(req, res, next, newLike);
};

const removeLike = (req, res, next) => {
  const likeToRemove = { $pull: { likes: req.user._id } };
  return updateCardLike(req, res, next, likeToRemove);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  setLike,
  removeLike,
};
