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

export const fetchAlbumController = (req, res) => {
  const payload = req.params;
  fetchBucketAlbumQuery(payload, (data) => {
    res.status(200).send(data);
  });
};

export const removeAlbumController = (req, res) => {
  const payload = req.params;
  const data = removeBucketAlbumQuery(payload, (data) => {
    res.status(200).send(data);
  });
};

export const addPhotoController = (req, res) => {
  // console.log('file:!!!!!!!!!!!', req.files.file);
  // req.files.file.name = filename
  const payload = { file: req.files.file, album: req.params.post_id };
  const data = addBucketObjectQuery(payload, (data) => {
    res.status(200).send(data);
  });
};

export const removePhotoController = (req, res) => {
  const payload = req.params;
  const data = removeBucketObjectsQuery(payload, (data) => {
    res.status(200).send(data);
  });
};

export const addProfileController = (req, res) => {
  const payload = { file: req.files.file, album: `user${req.params.user_id}` };
  const data = addBucketObjectQuery(payload, (data) => {
    res.status(200).send(data);
  });
};

export const removeProfileController = (req, res) => {
  const payload = req.params;
  const data = removeBucketAlbumQuery(payload, (data) => {
    res.status(200).send(data);
  });
};
