import db from '../../config/database';
import {
  signUpHelper,
  loginHelper
} from './authSQLHelpers';


export const userQuery = async (body) => {
  try {
    const queryString = loginHelper(body);
    const data = await db.queryAsync(queryString);
    // db.release();
    console.log('userQuery - successfully retrieved data ', JSON.stringify(data));
    return data;
  } catch (err) {
    console.log('signUpQuery - error= ', err);
  }
};

export const signupQuery = async (body) => {
  try {
    const queryString = signUpHelper(body);
    const data = await db.queryAsync(queryString);
    return data;
  } catch(err) {
    console.log('signupQuery - error= ', err)
  }
}

