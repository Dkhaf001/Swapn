import db from '../../config/database';
import { fetchAllOffersHelper } from './offersSQLHelpers';

export const fetchAllOffersQuery = async (req, res) => {
  try {
    const queryString = fetchAllOffersHelper(payload);
    const data = await db.queryAsync(queryString);
    console.log('fetchAllOffersQuery - successfully retrieved data', data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const removeOffersQuery = async (req, res) => {
  try {
    const queryString = removeOffersHelper(payload);
    const data = await db.queryAsync(queryString);
    console.log('removeOffersQuery - successfully retrieved data', data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
