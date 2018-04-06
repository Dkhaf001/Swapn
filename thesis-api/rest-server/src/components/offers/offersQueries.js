import db from '../../config/database';
import {
  fetchAllOffersHelper,
  addOffersHelper,
  removeOffersHelper,
  getSingleOfferHelper,
  fetchPostOffersHelper
} from './offersSQLHelpers';

export const fetchAllOffersQuery = async payload => {
  try {
    const queryString = fetchAllOffersHelper();
    const data = await db.queryAsync(queryString, [payload.username]);
    console.log('fetchAllOffersQuery - successfully retrieved data');
    return data.rows;
  } catch (err) {
    console.log(err);
  }
};

export const addOffersQuery = async payload => {
  try {
    const queryString = addOffersHelper();
    const data = await db.queryAsync(queryString, [
      payload.post_id,
      payload.buyer_username,
      payload.room_id
    ]);
    console.log('addOffersQuery - successfully retrieved data');
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const removeOffersQuery = async payload => {
  try {
    const queryString = removeOffersHelper();
    const data = await db.queryAsync(queryString, [
      payload.buyer_username,
      payload.post_id
    ]);
    console.log('removeOffersQuery - successfully retrieved data');
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getSingleOfferQuery = async payload => {
  try {
    const queryString = getSingleOfferHelper();
    const data = await db.queryAsync(queryString, [
      payload.buyer_username,
      payload.post_id
    ]);
    return data;
  } catch (err) {
    console.log('err getting single offer Query', err);
  }
};

export const fetchPostOffersQuery = async payload => {
  try {
    const queryString = fetchPostOffersHelper();
    const data = await db.queryAsync(queryString, [payload.post_id]);
    return data;
  } catch (err) {
    console.log('err fetching post offer query', err);
  }
};
