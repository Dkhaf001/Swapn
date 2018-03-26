import {
  listBucketQuery,
  listBucketObjectsQuery,
  createBucketQuery,
  removeBucketQuery,
  addBucketObjectQuery,
  removeBucketObjectsQuery,
} from '../model';

export const fetchAlbumController = async (req, res) => {
  const payload = req;
  try {
    const data = await fetchAlbumQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};
export const addAlbumController = async (req, res) => {
  const payload = req;
  try {
    const data = await addAlbumQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};
export const removeAlbumController = async (req, res) => {
  const payload = req;
  try {
    const data = await removeAlbumQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};
export const addPhotoController = async (req, res) => {
  console.log('file:!!!!!!!!!!!', req.files.file);
  const payload = req.files.file;
  const bucketname = 'barterbruh'; // set bucket name for this project 
  try {
    const data = await addFileQuery(bucketname, payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};
export const removePhotoController = async (req, res) => {
  const payload = req;
  try {
    const data = await removePhotoQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};
