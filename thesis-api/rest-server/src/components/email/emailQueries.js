import { getUserEmailHelper } from './emailSQLhepler';
import db from '../../config/database';

export const getUserEmail = async (username) => {
  try {
    const queryString = getUserEmailHelper(username);
    const data = await db.queryAsync(queryString);
    return data.rows[0];
  } catch (err) {
    console.log('err getUserEmail', err);
  }
};
