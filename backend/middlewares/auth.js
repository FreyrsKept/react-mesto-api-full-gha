const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/config');

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/UnauthorizedError');

// eslint-disable-next-line consistent-return
module.exports = (req, _, next) => {
  const { authorization } = req.headers;
  const bearer = 'Bearer ';
  if (!authorization || !authorization.startsWith(bearer)) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  const token = authorization.replace(bearer, '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY);
  } catch (e) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};
