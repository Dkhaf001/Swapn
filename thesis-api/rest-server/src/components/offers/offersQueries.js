import db from '../../config/database';
import { fetchOffersHelper } from "./offersSQLHelpers";

export const offersQueryHelper = async (req, res) => {
  try {
    const queryString = fetchOffersHelper(payload)
    console.log('offersQueryHelper - successfully retrieved data', data)
  } catch (err) {
    console.log(err)
  }
};

