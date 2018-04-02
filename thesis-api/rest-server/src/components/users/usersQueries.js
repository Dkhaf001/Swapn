import db from '../../config/database/index';

import { fetchUserHelper, updateUserHelper, updateProfilePicHelper } from './usersSQLHelpers';

export const fetchUserQuery = async (payload) => {
  try {
    const queryString = fetchUserHelper(payload);
    const data = await db.queryAsync(queryString);
    console.log('fetchUserQuery - success fetching user');
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const updateUserQuery = async (payload) => {
  try {
    const queryString = updateUserHelper(payload);
    const data = await db.queryAsync(queryString);
    console.log('updateUserQuery - success updating user');
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const updateProfilePicQuery = async (payload) => {
  try {
    const queryString = updateProfilePicHelper(payload);
    const data = await db.queryAsync(queryString);
    console.log('updateUserQuery - success updating user');
    return data;
  } catch (err) {
    console.log(err);
  }
};
