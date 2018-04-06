import db from '../../config/database/index';

import {
  fetchAllFollowingHelper,
  addFollowingHelper,
  removeFollowingHelper,
  fetchFollowingHelper
} from './followingsSQLHelpers';

export const fetchAllFollowingQuery = async payload => {
  try {
    const queryString = fetchAllFollowingHelper();
    const data = await db.queryAsync(queryString, [payload.user_id]);
    console.log('fetchAllFollowingQuery - success fetching all followings');
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchFollowingQuery = async payload => {
  try {
    const queryString = fetchFollowingHelper();
    const data = await db.queryAsync(queryString, [
      payload.user_id,
      payload.following_id
    ]);
    console.log('fetchFollowingQuery - success fetching all followings');
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const addFollowingQuery = async payload => {
  try {
    const queryString = addFollowingHelper();
    const data = await db.queryAsync(queryString, [
      payload.user_id,
      payload.following_id
    ]);
    console.log('addFollowingQuery - success adding to followings');
    return data.rows;
  } catch (err) {
    console.log(err);
  }
};

export const removeFollowingQuery = async payload => {
  try {
    const queryString = removeFollowingHelper();
    const data = await db.queryAsync(queryString, [
      payload.user_id,
      payload.following_id
    ]);
    console.log('removeFollowingQuery - success adding to followings');
    return data;
  } catch (err) {
    console.log(err);
  }
};

// import db from '../../config/database/index';

// import {
//   fetchAllFollowingHelper,
//   addFollowingHelper,
//   removeFollowingHelper,
//   fetchFollowingHelper
// } from './followingsSQLHelpers';

// export const fetchAllFollowingQuery = async payload => {
//   try {
//     const queryString = fetchAllFollowingHelper(payload);
//     const data = await db.queryAsync(queryString);
//     console.log('fetchAllFollowingQuery - success fetching all followings');
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const fetchFollowingQuery = async payload => {
//   try {
//     const queryString = fetchFollowingHelper(payload);
//     const data = await db.queryAsync(queryString);
//     console.log('fetchFollowingQuery - success fetching all followings');
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const addFollowingQuery = async payload => {
//   try {
//     const queryString = addFollowingHelper(payload);
//     const data = await db.queryAsync(queryString);
//     console.log('addFollowingQuery - success adding to followings');
//     return data.rows;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const removeFollowingQuery = async payload => {
//   try {
//     const queryString = removeFollowingHelper(payload);
//     const data = await db.queryAsync(queryString);
//     console.log('removeFollowingQuery - success adding to followings');
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };
