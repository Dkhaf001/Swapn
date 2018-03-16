import {
  addFollowingHelper,
  fetchAllFollowingHelper,
  removeFollowingHelper
} from './followingsSQLHelpers'
import db from '../../config/database/index'
export const fetchAllFollowing = async (req, res) => {
  try {
    const queryString = fetchAllFollowingHelper(req.params);
    const data = await db.queryAsync(queryString);
    console.log('success fetching all followings', data)
    res.status(200).send(data.rows)
  } catch (err) {
    console.log('err fetching user followers', err)
  }
};

export const addFollowing = async (req, res) => {
  try {
    const queryString = addFollowingHelper(req.body);
    const data = await db.queryAsync(queryString);
    console.log('success add followings', data)
    res.status(200).send(data)
  } catch (err) {
    console.log('err adding followers', err);
  }
};

export const removeFollowing = async (req, res) => {
  try {
    const queryString = removeFollowingHelper(req.params);
    const data = await db.queryAsync(queryString);
    console.log('success removing followings', data)
    res.status(200).send(data.rows)
  } catch(err) {
    console.log('err removing followers', err)
  }
}
