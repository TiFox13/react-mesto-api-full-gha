const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
} = require('../controllers/cardsControllers');
const { idValidator } = require('../utils/validator');
const {LINK_SCHEME} = require('../utils/constants');

router.get('/', auth, getCards);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required()
        .pattern(LINK_SCHEME),
    }),
  }),
  auth,
  createCard,
);

router.delete(
  '/:cardId',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cardId: idValidator,
    }),
  }),
  auth,
  deleteCard,
);

router.put(
  '/:cardId/likes',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cardId: idValidator,
    }),
  }),
  auth,
  putLike,
);

router.delete(
  '/:cardId/likes',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cardId: idValidator,
    }),
  }),
  auth,
  deleteLike,
);

module.exports = router;
