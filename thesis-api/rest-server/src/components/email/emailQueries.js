import { getUserEmailHelper } from './emailSQLhelper';
import db from '../../config/database';

export const getUserEmail = async username => {
  try {
    const queryString = getUserEmailHelper();
    const data = await db.queryAsync(queryString, [username]);
    return data.rows[0];
  } catch (err) {
    console.log('err getUserEmail', err);
  }
};
