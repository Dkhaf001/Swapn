import db from '../../config/database';
import {
  fetchAllPhotosHelper,
  addPhotosHelper,
  removePhotosHelper
} from './photosSQLHelpers';

export const fetchAllPhotosQuery = async payload => {
  try {
    const queryString = fetchAllPhotosHelper(payload, url);
    const data = await db.queryAsync(queryString);
    console.log('fetchAllPhotosQuery - successfully retrieved data');
    return data;
  } catch (err) {
    console.log('fetchAllPhotosQuery - ERROR:', err);
  }
};

export const addPhotosQuery = async (payload, url) => {
  try {
    const queryString = addPhotosHelper(payload, url);
    const data = await db.queryAsync(queryString);
    console.log('addPhotosQuery - successfully retrieved data');
    return data;
  } catch (err) {
    console.log('addPhotosQuery - ERROR:', err);
  }
};

export const removePhotosQuery = async payload => {
  try {
    const queryString = removePhotosHelper(payload);
    const data = await db.queryAsync(queryString);
    console.log('removePhotosQuery - successfully retrieved data');
    return data;
  } catch (err) {
    console.log('removePhotosQuery - ERROR:', err);
  }
};
