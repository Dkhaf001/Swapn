import db from '../../config/database';
import { fetchAllOffersHelper } from './offersSQLHelpers';

export const fetchAllOffersQuery = async (req, res) => {
  try {
    const queryString = fetchAllOffersHelper(payload);
    console.log('fetchAllOffersQuery - successfully retrieved data', data);
  } catch (err) {
    console.log(err);
  }
};

export const removeOffersQuery = async (req, res) => {
  try {
    const queryString = removeOffersHelper(payload);
    console.log('removeOffersQuery - successfully retrieved data', data);
  } catch (err) {
    console.log(err);
  }
};
