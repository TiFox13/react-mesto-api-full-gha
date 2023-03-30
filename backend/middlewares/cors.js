const allowedCors = [
  'https://ti.fox.mesto.nomoredomains.work',
  'http://ti.fox.mesto.nomoredomains.work',
  'localhost:3001'
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
module.exports = (req, res, next) => {
const { origin } = req.headers; // Сохраняем источник запроса в переменную originconst { method } = req;
const requestHeaders = req.headers['access-control-request-headers'];
if (allowedCors.includes(origin)) {
  // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }

  next();
};