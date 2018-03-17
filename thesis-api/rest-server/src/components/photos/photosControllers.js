import {
  fetchAllPhotosQuery,
  addPhotosQuery,
  removePhotosQuery
} from '../photos/photosQueries';

export const fetchAllPhotosController = async (req, res) => {
  let payload = req.params;
  try {
    const data = await fetchAllPhotosQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const addPhotosController = async (req, res) => {
  let payload = req.params;
  try {
    let url = 'http://www.url.com'; //await url from S3 img url link some function
    const data = await addPhotosQuery(payload, url);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const removePhotosController = async (req, res) => {
  let payload = req.params;
  try {
    const data = await removePhotosQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};
