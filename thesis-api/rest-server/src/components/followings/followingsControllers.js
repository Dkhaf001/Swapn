import {
  fetchAllFollowingQuery,
  addFollowingQuery,
  removeFollowingQuery,
  fetchFollowingQuery
} from './followingsQueries';

export const fetchAllFollowingController = async (req, res) => {
  const payload = req.params;
  try {
    const data = await fetchAllFollowingQuery(payload);
    return res.status(200).send(data.rows);
  } catch (err) {
    console.log(err);
  }
};

export const fetchFollowingController = async (req, res) => {
  const payload = req.params;
  try {
    const data = await fetchFollowingQuery(payload);
    return res.status(200).send(data.rows);
  } catch (err) {
    console.log(err);
  }
};

export const addFollowingController = async (req, res) => {
  const payload = req.params;
  console.log('THIS IS THE PAYLOADDDD!!!', payload);
  try {
    const data = await addFollowingQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const removeFollowingController = async (req, res) => {
  const payload = req.params;
  try {
    const data = await removeFollowingQuery(payload);
    return res.status(200).send(data.rows);
  } catch (err) {
    console.log(err);
  }
};
