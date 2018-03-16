import db from '../../config/database';
import { fetchCategorysController } from "./categoriesControllers";


export const categorysQueryHelper = async (payload) => {
  try {
    const queryString = await fetchCategorysHelper(payload)
    const data = await db.queryAsync(queryString);
    console.log('categorysQueryHelper - successfully retrieved data', data)
    return data;
  } catch (err) {
    console.log(err)
  }
};
