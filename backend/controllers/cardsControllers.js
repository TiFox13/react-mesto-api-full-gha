const CardSchema = require('../models/card');
const { NotFoundError } = require('../Errors/NotFoundError');
const { CastError } = require('../Errors/CastError');
const { Forbidden } = require('../Errors/Forbidden');

// ПОЛУЧЕНИЕ КАРТОЧЕК
function getCards(req, res, next) {
  return CardSchema.find({})
  .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
}

// СОЗДАНИЕ КАРТОЧКИ
async function createCard(req, res, next) {
  try {
 const card = await CardSchema.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id, // ID пользователя. доступный благодаря мидлвэру в app.js
  })
  await card.populate('owner')
   await res.status(201).send(card)
} catch(err)  {
      if (err.name === 'ValidationError') {
        next(new CastError('Переданы некорректные данные при создании карточки'));
      } else {
        next();
      }
    };
}

// УДАЛЕНИЕ КАРТОЧКИ
function deleteCard(req, res, next) {
  CardSchema.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка с указанным _id не найдена'));
        return;
      }
      if (card.owner.valueOf() !== req.user._id) {
        next(new Forbidden('Нельзя удалять чужие карточки'));
        return;
      }
      CardSchema.findByIdAndRemove(req.params.cardId)
        .then(() => res.send({ message: 'Карточка успешно удалена' }))
        .catch();
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Переданы некорректные данные _id пользователя'));
      } else {
        next();
      }
    });
}

// ПОСТАВИТЬ ЛАЙК
function putLike(req, res, next) {
  CardSchema.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
  .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Переданы некорректные данные для постановки лайка'));
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Передан несуществующий _id карточки'));
      } else {
        next();
      }
    });
}

// УДАЛИТЬ ЛАЙК
function deleteLike(req, res, next) {
  CardSchema.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
  .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Переданы некорректные данные для снятия лайка'));
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Передан несуществующий _id карточки'));
      } else {
        next();
      }
    });
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
};
