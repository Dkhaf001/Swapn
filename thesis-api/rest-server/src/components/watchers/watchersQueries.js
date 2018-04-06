import db from '../../config/database';
import {
  addWatchesHelper,
  removeWatchesHelper,
  fetchAllWatchesHelper,
  fetchSingleWatchesHelper
} from './watchersSQLHelpers';

export const addWatchesQuery = async payload => {
  try {
    const queryString = addWatchesHelper();
    const data = await db.queryAsync(queryString, [
      payload.user_id,
      payload.post_id
    ]);
    console.log('addWatchesQuery - successfully added data');
    return data.rows;
  } catch (err) {
    console.log(err);
  }
};

export const removeWatchesQuery = async payload => {
  try {
    const queryString = removeWatchesHelper();
    const data = await db.queryAsync(queryString, [
      payload.user_id,
      payload.post_id
    ]);
    console.log('removeWatchesQuery - successfully deleted data');
    return data.rows;
  } catch (err) {
    console.log(err);
  }
};

export const fetchAllWatchesQuery = async payload => {
  try {
    const queryString = fetchAllWatchesHelper();
    const data = await db.queryAsync(queryString, [payload.user_id]);
    console.log('fetchAllWatchesQuery - successfully retrieved all data');
    return data.rows;
  } catch (err) {
    console.log(err);
  }
};

export const fetchSingleWatchesQuery = async payload => {
  try {
    const queryString = fetchSingleWatchesHelper();
    const data = await db.queryAsync(queryString, [
      payload.user_id,
      payload.post_id
    ]);
    console.log('fetchSingleWatchesQuery - successfully retrieved all data');
    return data;
  } catch (err) {
    console.log(err);
  }
};

// import db from '../../config/database';
// import {
//   addWatchesHelper,
//   removeWatchesHelper,
//   fetchAllWatchesHelper,
//   fetchSingleWatchesHelper
// } from './watchersSQLHelpers';

// export const addWatchesQuery = async payload => {
//   try {
//     const queryString = addWatchesHelper(payload);
//     const data = await db.queryAsync(queryString);
//     console.log('addWatchesQuery - successfully added data');
//     return data.rows;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const removeWatchesQuery = async payload => {
//   try {
//     const queryString = removeWatchesHelper(payload);
//     const data = await db.queryAsync(queryString);
//     console.log('removeWatchesQuery - successfully deleted data');
//     return data.rows;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const fetchAllWatchesQuery = async payload => {
//   try {
//     const queryString = fetchAllWatchesHelper(payload);
//     const data = await db.queryAsync(queryString);
//     console.log('fetchAllWatchesQuery - successfully retrieved all data');
//     return data.rows;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const fetchSingleWatchesQuery = async payload => {
//   try {
//     const queryString = fetchSingleWatchesHelper(payload);
//     const data = await db.queryAsync(queryString);
//     console.log('fetchSingleWatchesQuery - successfully retrieved all data');
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };
