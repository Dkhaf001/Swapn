import db from '../../config/database';
import {
  addWatchesHelper,
  removeWatchesHelper,
  fetchAllWatchesHelper
} from './watchersSQLHelpers';

export const addWatchesQuery = async payload => {
  try {
    const queryString = addWatchesHelper(payload);
    const data = await db.queryAsync(queryString);
    console.log('addWatchesQuery - successfully added data');
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const removeWatchesQuery = async payload => {
  try {
    const queryString = removeWatchesHelper(payload);
    const data = await db.queryAsync(queryString);
    console.log('removeWatchesQuery - successfully deleted data');
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchAllWatchesQuery = async payload => {
  try {
    const queryString = fetchAllWatchesHelper(payload);
    const data = await db.queryAsync(queryString);
    console.log('fetchAllWatchesQuery - successfully retrieved all data');
    return data.rows;
  } catch (err) {
    console.log(err);
  }
};
