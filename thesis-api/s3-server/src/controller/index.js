import {
  listBucketQuery,
  listBucketObjectsQuery,
  createBucketQuery,
  removeBucketQuery,
  fetchBucketAlbumQuery,
  removeBucketAlbumQuery,
  addBucketObjectQuery,
  removeBucketObjectsQuery,
} from '../model';

export const fetchAlbumController = async (req, res) => {
  const payload = req.params;
  try {
    const data = await fetchBucketAlbumQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const removeAlbumController = async (req, res) => {
  const payload = req.params;
  try {
    const data = await removeBucketAlbumQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const addPhotoController = async (req, res) => {
  console.log('file:!!!!!!!!!!!', req.files.file);
  // req.files.file.name = filename
  const payload = { file: req.files.file, album: req.params.post_id };
  try {
    const data = await addBucketObjectQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

export const removePhotoController = async (req, res) => {
  const payload = req.params;
  try {
    const data = await removeBucketObjectsQuery(payload);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};
