import {
  fetchAllFollowingQuery,
  addFollowingQuery,
  removeFollowingQuery
} from './followingsQueries';

export const fetchAllFollowingController = async (req, res) => {
  let payload = req.params;
  try {
    const data = await fetchAllFollowingQuery(payload);
    return res.status(200).send(data.rows);
  } catch (err) {
    console.log(err);
  }
};

export const addFollowingController = async (req, res) => {
  let payload = req.body;
  try {
    const data = await addFollowingQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const removeFollowingController = async (req, res) => {
  let payload = req.params;
  try {
    const data = await removeFollowingQuery(payload);
    return res.status(200).send(data.rows);
  } catch (err) {
    console.log(err);
  }
};
