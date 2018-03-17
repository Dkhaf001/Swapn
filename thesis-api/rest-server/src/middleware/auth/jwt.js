import {
  sign,
  verify,
} from 'jsonwebtoken'


export const generateToken = (id, email) => {

  const token = {};

  token.accessToken = sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    email,
    id,
  }, process.env.TOKEN_SECRET);

  return token;
};

export const verifyUserWithJWT = (req, res, next) => {
  try {
    verify(req.headers.authorization.slice(7), process.env.TOKEN_SECRET);
    console.log('token verified');
    next();
  } catch (e) {
    console.log('token not verified');
    next(e);
  }
};