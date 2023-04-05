const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getUser,
  getUsers,
  patchUserInfo,
  pathAvatar,
  getUserById,
} = require('../controllers/usersControllers');
const { idValidator } = require('../utils/validator');


router.get('/', auth, getUsers);

router.get('/me', auth, getUser);

router.get(
  '/:userId',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      userId: idValidator,
    }),
  }),
  auth,
  getUserById,
);

router.patch(
  '/me',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  auth,
  patchUserInfo,
);

router.patch(
  '/me/avatar',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      avatar: Joi.string()
        .pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/)
        .required(),
    }),
  }),
  auth,
  pathAvatar,
);

module.exports = router;
