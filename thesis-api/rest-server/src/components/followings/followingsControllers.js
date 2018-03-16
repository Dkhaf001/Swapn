import {
  addFollowingHelper,
  fetchAllFollowingHelper,
  removeFollowingHelper
} from './followingsSQLHelpers'
import db from '../../config/database/index'
export const fetchAllFollowing = async (req, res) => {
  try {
    const queryString = fetchAllFollowingHelper(req.query);
    const data = await db.queryAsync(queryString);
    console.log('success fetching all followings', data)
    res.status(200).send(data)
  } catch (err) {
    console.log('err fetching user followers', err)
  }
};

export const addFollowing = async (req, res) => {
  try {
    const queryString = addFollowingHelper(req.body);
    console.log('this is the queryString', queryString)
    const data = db.queryAsync(queryString);
    console.log('success add followings', data)
    res.status(200).send(data)
  } catch (err) {
    console.log('err adding followers', err);
  }
};

export const removeFollowing = async (req, res) => {
  try {

  } catch(err) {
    consol.log('err removing followers', err)
  }
}
