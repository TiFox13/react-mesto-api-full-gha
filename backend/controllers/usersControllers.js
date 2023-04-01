const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserSchema = require('../models/user');
const { ValidationError } = require('../Errors/ValidationError');
const { CastError } = require('../Errors/CastError');
const { InternalServerError } = require('../Errors/InternalServerError');
const { Conflict } = require('../Errors/Conflict');

// ВХОД
function login(req, res, next) {
  const { email, password } = req.body;
  // ищем пользователя
  return UserSchema.findUserByCredentials({ email, password })
    // все сошлось, теперь выдаем пользователю токен
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
}

// ПОЛУЧЕНИЕ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ
function getUsers(req, res, next) {
  return UserSchema.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => next(new InternalServerError()));
}

// ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЯ ПО ID
function getUserById(req, res, next) {
  UserSchema.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new ValidationError('Пользователь с указанным _id не найден'));
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Переданы некорректные данные _id пользователя'));
      } else {
        next(new InternalServerError());
      }
    });
}

// ПОЛУЧЕНИЕ ИНФЫ О ПОЛЬЗОВАТЕЛЕ
function getUser(req, res, next) {
  const id = req.user._id;
  UserSchema.findById(id)
    .then((user) => {
      // проверяем, есть ли пользователь с таким id
      if (!user) {
        next(new ValidationError('Пользователь  не найден'));
        return;
      }
      // возвращаем пользователя, если он есть
      res.send(user);
    })
    .catch(() => next(new InternalServerError()));
}

// СОЗДАНИЕ НОВОГО ПОЛЬЗОВАТЕЛЯ
function createUser(req, res, next) {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => UserSchema.create({
      email, password: hash, name, about, avatar,
    }))
    .then((user) => res.send({
      _id: user._id,
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,

    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('Пользователь с такими данными уже существует'));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new CastError('Переданы некорректные данные для создания пользователя'));
      } else {
        next(err);
      }
    });
}

// ИЗМЕНЕНИЕ ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ
function patchUserInfo(req, res, next) {
  const { name, about } = req.body;
  UserSchema.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
       return next(new ValidationError('Пользователь с указанным _id не найден'));
      }
      return res.send(user)
    })
    // .then((user) => res.send(req.body))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CastError('Переданы некорректные данные при обновлении профиля'));
      } else {
        next(new InternalServerError());
      }
    });
}

// ИЗМЕНЕНИЕ АВАТАРА
function pathAvatar(req, res, next) {
  const { avatar } = req.body;
  UserSchema.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new ValidationError('Пользователь с указанным _id не найден'));
      }
      return res.send(user)
    })
    // .then((user) => res.send(req.body))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CastError('Переданы некорректные данные при обновлении профиля'));
      } else {
        next(new InternalServerError());
      }
    });
}

module.exports = {
  getUser,
  getUsers,
  createUser,
  patchUserInfo,
  pathAvatar,
  login,
  getUserById,
};
