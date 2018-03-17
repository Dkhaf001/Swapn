import db from '../../config/database';
import {
  addWatchesHelper,
  removeWatchesHelper,
  fetchAllWatchesHelper
} from './watchersSQLHelpers';

export const addWatchesQuery = async (req, res) => {
  try {
    const queryString = addWatchesHelper(payload);
    const data = await db.queryAsync(queryString);
    console.log('addWatchesQuery - successfully retrieved data', data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const removeWatchesController = async (req, res) => {
  try {
    const queryString = removeWatchesHelper(payload);
    const data = await db.queryAsync(queryString);
    console.log('removeWatchesController - successfully retrieved data', data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchAllWatchesController = async (req, res) => {
  try {
    const queryString = fetchAllWatchesHelper(payload);
    const data = await db.queryAsync(queryString);
    console.log(
      'fetchAllWatchesController - successfully retrieved data',
      data
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};
