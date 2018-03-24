import db from '../../config/database';
import {
  signUpHelper,
  loginHelper
} from './authSQLHelpers';
import {verifyUserWithJWT} from '../../middleware/auth/jwt'
 
export const userQuery = async (body) => {
  try {
    const queryString = await loginHelper(body);
    const data = await db.queryAsync(queryString);
    // db.release();
    // console.log('userQuery - successfully retrieved data ', JSON.stringify(data));
    return data;
  } catch (err) {
    console.log('userQuery - error= ', err);
  }
};

export const signupQuery = async (body) => {
  try {
    const queryString = await signUpHelper(body);
    const data = await db.queryAsync(queryString);
    return data;
  } catch(err) {
    console.log('signupQuery - error= ', err)
    return err
  }
}

export const authQuery = async (body) => {
  try {
    console.log('i am right here')
    const verified = await verifyUserWithJWT(body.token)
    return verified
  }catch(err) {
    console.log('err auth query', err)
  }
}

