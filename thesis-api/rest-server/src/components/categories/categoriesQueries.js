import db from '../../config/database';
import { fetchAllCategorysHelper } from "./categoriesSQLHelpers";


export const fetchAllCategorysQuery = async (payload) => {
  try {
    const queryString = await fetchAllCategorysHelper(payload)
    const data = await db.queryAsync(queryString);
    console.log('categorysQueryHelper - successfully retrieved data', data)
    return data;
  } catch (err) {
    console.log(err)
  }
};
