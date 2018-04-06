import db from '../../config/database';
import { signUpHelper, loginHelper } from './authSQLHelpers';
import { verifyUserWithJWT } from '../../middleware/auth/jwt';

export const userQuery = async body => {
  try {
    const queryString = await loginHelper();
    const data = await db.queryAsync(queryString, [body.username]);
    return data;
  } catch (err) {
    console.log('userQuery - error= ', err);
  }
};

export const signupQuery = async body => {
  try {
    const queryString = await signUpHelper();
    const data = await db.queryAsync(queryString, [
      body.email,
      body.username,
      body.password
    ]);
    return data;
  } catch (err) {
    console.log('signupQuery - error= ', err);
    return err;
  }
};

export const authQuery = async body => {
  try {
    const verified = await verifyUserWithJWT(body.token);
    return verified;
  } catch (err) {
    console.log('err auth query', err);
  }
};

// import db from '../../config/database';
// import { signUpHelper, loginHelper } from './authSQLHelpers';
// import { verifyUserWithJWT } from '../../middleware/auth/jwt';

// export const userQuery = async body => {
//   try {
//     const queryString = await loginHelper(body);
//     const data = await db.queryAsync(queryString);
//     return data;
//   } catch (err) {
//     console.log('userQuery - error= ', err);
//   }
// };

// export const signupQuery = async body => {
//   try {
//     const queryString = await signUpHelper(body);
//     const data = await db.queryAsync(queryString);
//     return data;
//   } catch (err) {
//     console.log('signupQuery - error= ', err);
//     return err;
//   }
// };

// export const authQuery = async body => {
//   try {
//     const verified = await verifyUserWithJWT(body.token);
//     return verified;
//   } catch (err) {
//     console.log('err auth query', err);
//   }
// };
