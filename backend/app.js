require('dotenv').config();

const { PORT = 3001 } = process.env;
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');

const { errors } = require('celebrate');
const errorHandler = require('./middlewares/error');

const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { CastError } = require('./Errors/CastError');

// подключили базу данных
mongoose.connect('mongodb://0.0.0.0:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

// логгер запросов
app.use(requestLogger);

app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// основные роуты
app.use( router );

app.use('*', (req, res, next) => {
  next(new CastError('Страницы по данному адресу не существует'));
});

// логгер ошибок
app.use(errorLogger);

// отлов ошибок
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});


