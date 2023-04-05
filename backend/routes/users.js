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
const {LINK_SCHEME} = require('../utils/constants');

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
        .pattern(LINK_SCHEME)
        .required(),
    }),
  }),
  auth,
  pathAvatar,
);

module.exports = router;
