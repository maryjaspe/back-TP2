const jwt = require('jsonwebtoken');
const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;

const errorCode = {
  JWT_EXPIRED: 403,
  JWT_INVALID: 401
}

const checkJWT = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(errorCode.JWT_INVALID).json({
      data: null,
      error: {
        statusCode: errorCode.JWT_INVALID,
        message: 'Token requerido',
        errorCode: 'TOKEN_REQUIRED'
      }
    });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY_JWT);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(errorCode.JWT_EXPIRED).json({
      data: null,
      error: {
        statusCode: errorCode.JWT_EXPIRED,
        message: 'Token expirado',
        errorCode: 'EXPIRED_TOKEN'
      }
    });
  }
};

module.exports = checkJWT;