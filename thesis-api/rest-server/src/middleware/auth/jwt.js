import { sign, verify } from 'jsonwebtoken';

export const generateToken = (id, username) => {
  const token = {};

  token.accessToken = sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 120,
      username,
      id
    },
    process.env.TOKEN_SECRET
  );

  return token;
};

export const verifyUserWithJWT = token => {
  try {
    verify(token, process.env.TOKEN_SECRET);
    console.log('token verified');
    return true;
  } catch (e) {
    console.log('token not verified');
    return false;
  }
};

// export const verifyUserWithJWT = (req, res, next) => {
//   try {
//     verify(req.headers.authorization.slice(7), process.env.TOKEN_SECRET);
//     console.log('token verified');
//     next();
//   } catch (e) {
//     console.log('token not verified');
//     next(e);
//   }
// };
