const jwt = require('jsonwebtoken');
const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;
const IS_JWT_SECURE = process.env.IS_JWT_SECURE === 'true';

const createToken = (user, res) => {
  const usuarioParaToken = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(usuarioParaToken, SECRET_KEY_JWT, { expiresIn: '1h' });
  res.cookie('pupysSS', token, { httpOnly: false, secure: IS_JWT_SECURE, maxAge: 3600000, path: '/',sameSite:'None' });
};

module.exports = createToken;