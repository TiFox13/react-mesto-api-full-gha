const allowedCors = [
  'https://ti.fox.mesto.nomoredomains.work',
  'http://ti.fox.mesto.nomoredomains.work',
  'http://localhost:3001',
  'https://localhost:3001',
];

 const cors =  (req, res, next) => {

  console.log("мидлвер для cors работает");

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const { origin } = req.headers; // Сохраняем источник запроса в переменную origin

  console.log(origin);

const { method } = req;
const requestHeaders = req.headers['access-control-request-headers'];
if (allowedCors.includes("http://localhost:3001")) {
  // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', "http://localhost:3001");
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }

  next();
};

module.exports = cors;