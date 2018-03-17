import db from '../../config/database/index';

import {
  fetchAllFollowingHelper,
  addFollowingHelper,
  removeFollowingHelper
} from './followingsSQLHelpers';

export const fetchAllFollowingQuery = async payload => {
  try {
    const queryString = fetchAllFollowingHelper(payload);
    const data = await db.queryAsync(queryString);
    console.log('fetchAllFollowingQuery - success fetching all followings');
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const addFollowingQuery = async payload => {
  try {
    const queryString = addFollowingHelper(payload);
    const data = await db.queryAsync(queryString);
    console.log('addFollowingQuery - success adding to followings');
    return data.rows;
  } catch (err) {
    console.log(err);
  }
};

export const removeFollowingQuery = async payload => {
  try {
    const queryString = removeFollowingHelper(payload);
    const data = await db.queryAsync(queryString);
    console.log('removeFollowingQuery - success adding to followings');
    return data;
  } catch (err) {
    console.log(err);
  }
};
