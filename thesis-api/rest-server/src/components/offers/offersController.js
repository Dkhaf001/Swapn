import {
  fetchAllOffersQuery,
  removeOffersQuery,
  addOffersQuery,
  getSingleOfferQuery,
  fetchPostOffersQuery,
} from './offersQueries';

export const fetchAllOffersController = async (req, res) => {
  const payload = req.params;
  try {
    const data = await fetchAllOffersQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};
export const addOffersController = async (req, res) => {
  const payload = req.body;
  console.log('this is the payload', payload);
  try {
    const data = await addOffersQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const removeOffersController = async (req, res) => {
  const payload = req.params;
  console.log('req.body', payload);
  try {
    const data = await removeOffersQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const getSingleOffer = async (req, res) => {
  try {
    const data = await getSingleOfferQuery(req.params);
    res.status(200).send(data);
  } catch (err) {
    console.log('err getting single offer', err);
  }
};

export const fetchPostOffers = async (req, res) => {
  const payload = req.params;
  try {
    const data = await fetchPostOffersQuery(payload);
    if (data.rows.length) {
      delete data.rows[0].password;
    }
    res.status(200).send(data);
  } catch (err) {
    console.log('err getting single post  offer', err);
  }
};
