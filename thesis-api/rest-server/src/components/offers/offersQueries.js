import db from '../../config/database';
import {
  fetchAllOffersHelper,
  addOffersHelper,
  removeOffersHelper
} from './offersSQLHelpers';

export const fetchAllOffersQuery = async payload => {
  try {
    const queryString = fetchAllOffersHelper(payload);
    const data = await db.queryAsync(queryString);
    console.log('fetchAllOffersQuery - successfully retrieved data');
    return data;
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
