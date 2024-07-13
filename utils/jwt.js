const jwt = require('jsonwebtoken');
const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;

const createToken = (user, res) => {
  const usuarioParaToken = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(usuarioParaToken, SECRET_KEY_JWT, { expiresIn: '1h' });
  res.cookie('pupysSS', token, { httpOnly: false, secure: false, maxAge: 3600000, path: '/',sameSite:'None' });
};

module.exports = createToken;