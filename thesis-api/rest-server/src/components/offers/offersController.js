import {
  fetchAllOffersQuery,
  removeOffersQuery,
  addOffersQuery
} from './offersQueries';

export const fetchAllOffersController = async (req, res) => {
  let payload = req.params;
  try {
    const data = await fetchAllOffersQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};
export const addOffersController = async (req, res) => {
  let payload = req.params;
  try {
    const data = await addOffersQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const removeOffersController = async (req, res) => {
  let payload = req.params;
  try {
    const data = await removeOffersQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};
