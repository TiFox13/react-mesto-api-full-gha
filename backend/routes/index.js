const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const { createUser, login } = require('../controllers/usersControllers');
const usersRouter = require('./users');
const cardsRouter = require('./cards');

// ВХОД
router.post('/signin', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

// РЕГИСТРАЦИЯ
router.post(
  '/signup',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string()
        .pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/),
    }),
  }),
  createUser,
);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

module.exports = router;