import db from '../../config/database';
import {
  fetchAllPhotosHelper,
  addPhotosHelper,
  removePhotosHelper,
  removeAllPhotosHelper
} from './photosSQLHelpers';

export const fetchAllPhotosQuery = async payload => {
  try {
    const queryString = fetchAllPhotosHelper();
    const data = await db.queryAsync(queryString, [payload.post_id]);
    console.log('fetchAllPhotosQuery - successfully retrieved data');
    return data;
  } catch (err) {
    console.log('fetchAllPhotosQuery - ERROR:', err);
  }
};

export const addPhotosQuery = async (payload, url) => {
  try {
    const queryString = addPhotosHelper();
    const data = await db.queryAsync(queryString, [payload.post_id, url]);
    console.log('addPhotosQuery - successfully retrieved data');
    return data;
  } catch (err) {
    console.log('addPhotosQuery - ERROR:', err);
  }
};

export const removePhotosQuery = async payload => {
  try {
    const queryString = removePhotosHelper();
    const data = await db.queryAsync(queryString, [
      payload.post_id,
      payload.photo_id
    ]);
    console.log('removePhotosQuery - successfully retrieved data');
    return data;
  } catch (err) {
    console.log('removePhotosQuery - ERROR:', err);
  }
};

export const removeAllPhotosQuery = async payload => {
  try {
    const queryString = removeAllPhotosHelper();
    const data = await db.queryAsync(queryString, [payload.post_id]);
    console.log('removeAllPhotosQuery - successfully retrieved data');
    return data;
  } catch (err) {
    console.log('removePhotosQuery - ERROR:', err);
  }
};
