import {
  addWatchesQuery,
  removeWatchesQuery,
  fetchAllWatchesQuery
} from './watchersQueries';

export const addWatchesController = async (req, res) => {
  let payload = req.params;
  try {
    const data = await addWatchesQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const removeWatchesController = async (req, res) => {
  let payload = req.params;
  try {
    const data = await removeWatchesQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const fetchAllWatchesController = async (req, res) => {
  let payload = req.params;
  try {
    const data = await fetchAllWatchesQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};
