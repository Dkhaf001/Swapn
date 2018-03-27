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
    const queryString = fetchAllOffersHelper(payload);
    const data = await db.queryAsync(queryString);
    console.log('fetchAllOffersQuery - successfully retrieved data');
    return data.rows;
  } catch (err) {
    console.log(err);
  }
};

export const addOffersQuery = async payload => {
  try {
    const queryString = addOffersHelper(payload);
    const data = await db.queryAsync(queryString);
    console.log('addOffersQuery - successfully retrieved data');
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const removeOffersQuery = async payload => {
  try {
    const queryString = removeOffersHelper(payload);
    const data = await db.queryAsync(queryString);
    console.log('removeOffersQuery - successfully retrieved data');
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getSingleOfferQuery = async payload => {
  try {
    const queryString = getSingleOfferHelper(payload);
    const data = await db.queryAsync(queryString);
    console.log('getSingleOfferQuery!!!!!!', data)
    return data;
  }catch(err) {
    console.log('err getting single offer Query', err)
  }
}

export const fetchPostOffersQuery = async payload => {
  try {
    const queryString = fetchPostOffersHelper(payload)
    const data = await db.queryAsync(queryString);
    return data
  }catch(err) {
    console.log('err fetching post offer query', err)
  }
}