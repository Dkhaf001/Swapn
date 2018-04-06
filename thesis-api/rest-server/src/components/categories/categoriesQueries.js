import db from '../../config/database';
import { fetchAllCategorysHelper } from './categoriesSQLHelpers';

export const fetchAllCategorysQuery = async payload => {
  try {
    const queryString = await fetchAllCategorysHelper();
    const data = await db.queryAsync(queryString, [payload.category_id]);
    console.log('categorysQueryHelper - successfully retrieved data');
    return data;
  } catch (err) {
    console.log(err);
  }
};
