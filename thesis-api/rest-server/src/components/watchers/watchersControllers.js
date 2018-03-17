import {
  addWatchesQuery,
  removeWatchesQuery,
  fetchAllWatchesQuery
} from './watchersQueries';

export const addWatchesController = async (req, res) => {
  let payload = req.params;
  try {
    const data = await addWatchesController(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const removeWatchesController = async (req, res) => {
  let payload = req.params;
  try {
    const data = await removeWatchesController(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const fetchAllWatchesController = async (req, res) => {
  let payload = req.params;
  try {
    const data = await fetchAllWatchesController(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};
